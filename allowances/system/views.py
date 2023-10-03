from django.shortcuts import render
from .models import *
from django.core.exceptions import ObjectDoesNotExist
from django.db.models import Q, Count, Sum, Max, Min
from django.db.models.functions import Coalesce
from django.http import JsonResponse, HttpResponseRedirect
from datetime import datetime, timedelta, time
from .decorators import is_user_login
from collections import Counter, defaultdict
from django.contrib.auth.hashers import make_password
from django.core.paginator import Paginator
# Create your views here.


@is_user_login
def AreaManagerView(request):
    user_token = request.session['user_token']
    user_obj = Token.objects.get(token=user_token).user
    time_sheet_list = PendingTimeSheet.objects.select_related('sheet').all()
    timeSheets = [
        {
            "id": tsh.sheet.id,
            "eng_name": tsh.sheet.eng_name,
            "tech_name": tsh.sheet.tech_name,
            "station_code": tsh.sheet.station_code,
            "ticket_id": tsh.sheet.ticket_id,
            "task_id": tsh.sheet.task_id,
            "visit_date": tsh.sheet.visit_date,
            "notes": tsh.sheet.notes,
            "record_date": tsh.sheet.record_date,
            "area_manager_status": tsh.status,
        }
        for tsh in time_sheet_list
    ]
    tasks_list = Task.objects.only('name', 'allowances')
    split_index = len(tasks_list) // 2
    first_part = tasks_list[:split_index]
    second_part = tasks_list[split_index:]
    context = {
        'user': user_obj,
        'timeSheets': timeSheets,
        'f_tasks': first_part,
        'l_tasks': second_part,
    }
    return render(request, 'AMDashboard.html', context)


def TasksTableApi(request):
    try:
        time_sheet_data = TimeSheet.objects.all()
        data = [
            {
                'id': tsd.id,
                'eng_name': tsd.eng_name.first_name + ' ' + tsd.eng_name.last_name,
                'tech_name': tsd.eng_name.first_name + ' ' + tsd.eng_name.last_name,
                'station_code': tsd.station_code.station_id,
                'ticket_id': tsd.ticket_id,
                'task_id': tsd.task_id.name,
                'visit_date': tsd.visit_date,
                'notes': tsd.notes,
                'record_date': tsd.record_date,
                'area_manager_status': tsd.area_manager_status,
            }
            for tsd in time_sheet_data
        ]
        return JsonResponse(data=data, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)


def StatusComboChartApi(request):
    try:
        status_list = ['Pending', area_manager_status[0][1], area_manager_status[1][1]]
        tasks_list = Task.objects.only('name')
        ApprovedSheets = ApprovedTimeSheet.objects.values('task__name').annotate(total=Count('task'))
        RejectedSheets = RejectedTimeSheet.objects.values('task__name').annotate(total=Count('task'))
        PendingSheets = PendingTimeSheet.objects.values('task__name').annotate(total=Count('task'))
        # print('xxxxx => ', tasks_list)
        result = [[tl.name,0,0,0] for tl in tasks_list]
        for res in result:
            for apsh in ApprovedSheets:
                if apsh['task__name'] == res[0]:
                    res[1] = apsh['total']
            for apsh in RejectedSheets:
                if apsh['task__name'] == res[0]:
                    res[2] = apsh['total']
            for apsh in PendingSheets:
                if apsh['task__name'] == res[0]:
                    res[3] = apsh['total']
        # print(result)
            # if res[0] in ApprovedSheets:
            #     print(res)
            #     res[1] = ApprovedSheets[res[0]]['total']
            # else:
            #     print(ApprovedSheets[res[0]]['total'])

        # print('yyyy =>', result)
        combo_data = {
            'status': status_list,
            'result': result
        }
        return JsonResponse(data=combo_data, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)


def StatusPieChartApi(request):
    try:
        ApprovedSheets = ApprovedTimeSheet.objects.count()
        RejectedSheets = RejectedTimeSheet.objects.count()
        PendingSheets = PendingTimeSheet.objects.count()
        # print(ApprovedSheets, RejectedSheets, PendingSheets)
        pie_chart_list = [
            ['Approved', ApprovedSheets],
            ['Rejected', RejectedSheets],
            ['Pending', PendingSheets]
        ]
        return JsonResponse(data=pie_chart_list, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)


# def PendingPieChartApi(request):
#     try:
#         time_sheet_data = TimeSheet.objects.filter(area_manager_status=None).select_related('task_id').values('task_id__name').annotate(total=Count('task_id'))
#         print(time_sheet_data)
#         pie_chart_list = [
#             [
#                 tsd['task_id__name'],
#                 tsd['total']
#             ]
#             for tsd in time_sheet_data
#         ]
#         return JsonResponse(data=pie_chart_list, safe=False)
#     except TimeSheet.DoesNotExist:
#         return JsonResponse(data=[['Error', 1]], safe=False)


# def TasksColumnChartApi(request):
#     try:
#         tasks_data = Task.objects.all()
#         column_chart_list = [
#             [
#                 tsd.name,
#                 tsd.allowances,
#                 tsd.man_power_type
#             ]
#             for tsd in tasks_data
#         ]
#         return JsonResponse(data=column_chart_list, safe=False)
#     except Task.DoesNotExist:
#         return JsonResponse(data=[['Error', 1]], safe=False)


def TasksPieChartApi(request):
    try:
        tasks_data = Task.objects.values('man_power_type').annotate(total=Count('man_power_type'))
        print(tasks_data)
        pie_chart_list = [
            [
                tsd['man_power_type'],
                tsd['total']
            ]
            for tsd in tasks_data
        ]
        return JsonResponse(data=pie_chart_list, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)


@is_user_login
def ManPowerView(request):
    user_token = request.session['user_token']
    user_obj = Token.objects.get(token=user_token).user
    if request.method == 'POST':
        first_name = request.POST.get('first_name', None)
        last_name = request.POST.get('last_name', None)
        national_id = request.POST.get('national_id', None)
        position = request.POST.get('position', None)
        email = request.POST.get('email', None)
        UserAccount.objects.create(
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=make_password('As123123'),
            national_id=national_id,
            position_id=position
        )
    user_types = UserType.objects.exclude(Q(type='Area Manager') | Q(type='Cost Control'))
    users_list = UserAccount.objects.exclude(Q(position__type='Area Manager') | Q(position__type='Cost Control'))\
        .select_related('position')\
        .only(
            'first_name',
            'last_name',
            'username',
            'national_id',
            'position__type',
            'email',
            'add_date'
        )
    context = {
        'user': user_obj,
        'types': user_types,
        'manPower': users_list,
    }
    return render(request,'AMManPower.html', context)


def ManPowerPositionPieChartApi(request):
    try:
        position_types = UserAccount.objects.exclude(position__type='Area Manager').values('position__type').annotate(total=Count('position__type'))
        pie_chart_list = [
            [
                tsd['position__type'],
                tsd['total']
            ]
            for tsd in position_types
        ]
        return JsonResponse(data=pie_chart_list, safe=False)
    except UserType.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)
    

@is_user_login
def TasksView(request):
    user_token = request.session['user_token']
    user_obj = Token.objects.get(token=user_token).user
    if request.method == 'POST':
        action_value = request.POST.get('action', None)
        if action_value == 'add':
            task_name = request.POST.get('task_name', None)
            task_allowances = request.POST.get('task_allowances', None)
            man_power_types = request.POST.get('man_power_types', None)
            task_check = Task.objects.filter(
                name=task_name,
                allowances=task_allowances,
                man_power_type=man_power_types
            ).exists()
            if task_check:
                return HttpResponseRedirect('/system/Tasks/?error=True')
            else:
                Task.objects.create(
                    name=task_name,
                    allowances=task_allowances,
                    man_power_type=man_power_types
                )
                return HttpResponseRedirect('/system/Tasks/')
        elif action_value == 'edit':
            task_id = request.POST.get('task_id', None)
            task_name = request.POST.get('task_name', None)
            task_allowances = request.POST.get('task_allowances', None)
            man_power_types = request.POST.get('man_power_types', None)
            task_details = Task.objects.get(id=task_id)
            task_details.name = task_name
            task_details.allowances = task_allowances
            task_details.man_power_type = man_power_types
            task_details.save()
            return HttpResponseRedirect('/system/Tasks/')
        elif action_value == 'delete':
            task_id = request.POST.get('task_id', None)
            Task.objects.filter(id=task_id).delete()
            return HttpResponseRedirect('/system/Tasks/')
        else:
            pass
        # task_name = request.POST.get('task_name', None)
        # task_allowances = request.POST.get('task_allowances', None)
        # man_power_types = request.POST.get('man_power_types', None)
        # task_check = Task.objects.filter(
        #     name=task_name,
        #     allowances=task_allowances,
        #     man_power_type=man_power_types
        # ).exists()
        # if task_check:
        #     return HttpResponseRedirect('/system/Tasks/?error=True')
        # else:
        #     Task.objects.create(
        #         name=task_name,
        #         allowances=task_allowances,
        #         man_power_type=man_power_types
        #     )
        #     return HttpResponseRedirect('/system/Tasks/')
    tasks_list = Task.objects.all()
    single = tasks_list.filter(man_power_type='single').count()
    multi = tasks_list.filter(man_power_type='multi').count()
    # test = tasks_list.values('man_power_type').annotate(total=Count('man_power_type'))
    # mpt = [t['total'] for t in test]
    # print(mpt)
    allowances_list = tasks_list.order_by('allowances')
    # allowances_list = tasks_list.aggregate(
    #     high=Max('allowances'),
    #     low=Min('allowances')
    # )
    context = {
        'user': user_obj,
        'manPowerTypes': man_power_choices,
        'tasks': tasks_list,
        'single': single,
        'multi': multi,
        # 'single': mpt[1],
        # 'multi': mpt[0],
        # 'highest': allowances_list['high'],
        # 'lowest': allowances_list['low'],
        'highest': allowances_list.last(),
        'lowest': allowances_list.first(),
    }
    return render(request,'AMTasks.html', context)


@is_user_login
def TimeSheetToDoView(request):
    user_token = request.session['user_token']
    user_obj = Token.objects.get(token=user_token).user
    # time_sheet_list = TimeSheet.objects.filter(area_manager_status=None).order_by('-id')
    time_sheet_list = PendingTimeSheet.objects\
        .select_related('sheet',
                        'sheet__eng_name',
                        'sheet__tech_name',
                        'sheet__station_code',
                        'sheet__task_id')\
        .only(
            'id',
            'sheet__eng_name__first_name',
            'sheet__eng_name__last_name',
            'sheet__tech_name__first_name',
            'sheet__tech_name__last_name',
            'sheet__station_code__station_id',
            'sheet__ticket_id',
            'sheet__task_id__name',
            'sheet__visit_date',
            'sheet__notes',
            'sheet__record_date',
        ).order_by('-sheet_id')
    timeSheets = [
        {
            "id": tsh.sheet.id,
            "eng_name": tsh.sheet.eng_name,
            "tech_name": tsh.sheet.tech_name,
            "station_code": tsh.sheet.station_code,
            "ticket_id": tsh.sheet.ticket_id,
            "task_id": tsh.sheet.task_id,
            "visit_date": tsh.sheet.visit_date,
            "notes": tsh.sheet.notes,
            "record_date": tsh.sheet.record_date,
        }
        for tsh in time_sheet_list
    ]
    context = {
        'user': user_obj,
        'timeSheets': timeSheets
    }
    return render(request,'AMTimeSheetToDo.html', context)


def TimeSheetApprovedApi(request, timeSheetId):
    try:
        time_sheet_obj = TimeSheet.objects.get(id=timeSheetId)
        if time_sheet_obj.task_id.id in [7, 14, 20]:
            if time_sheet_obj.task_id.id == 20:
                prvt_mnt = ApprovedTimeSheet.objects.filter(
                    station=time_sheet_obj.station_code,
                    task=time_sheet_obj.task_id,
                ).order_by('-timestamp')[:2]
                if len(prvt_mnt) >= 2:
                    print(prvt_mnt[0].timestamp.year, prvt_mnt[1].timestamp.year)
                    if prvt_mnt[0].timestamp.year != prvt_mnt[1].timestamp.year:
                        time_sheet_obj.area_manager_status = area_manager_status[0][0]
                        time_sheet_obj.save()
                        PendingTimeSheet.objects.get(sheet=time_sheet_obj).delete()
                        ApprovedTimeSheet.objects.create(
                            sheet=time_sheet_obj,
                            station=time_sheet_obj.station_code,
                            task=time_sheet_obj.task_id,
                            timestamp = datetime.now()
                        )
                    elif prvt_mnt[1].timestamp.year < datetime.now().year:
                        time_sheet_obj.area_manager_status = area_manager_status[0][0]
                        time_sheet_obj.save()
                        PendingTimeSheet.objects.get(sheet=time_sheet_obj).delete()
                        ApprovedTimeSheet.objects.create(
                            sheet=time_sheet_obj,
                            station=time_sheet_obj.station_code,
                            task=time_sheet_obj.task_id,
                            timestamp = datetime.now()
                        )
                    else:
                        print('rejected p m')
                        TimeSheet.objects.filter(
                            station_code=time_sheet_obj.station_code,
                            task_id=time_sheet_obj.task_id,
                            area_manager_status=None).update(area_manager_status=area_manager_status[1][0])
                        p_list = PendingTimeSheet.objects.filter(station=time_sheet_obj.station_code, task=time_sheet_obj.task_id)
                        rejected_list = [
                            RejectedTimeSheet(
                                sheet=pend.sheet,
                                station=pend.station,
                                task=pend.task,
                                timestamp=datetime.now()
                            )
                            for pend in p_list
                        ]
                        RejectedTimeSheet.objects.bulk_create(rejected_list)
                        p_list.delete()
                else:
                    time_sheet_obj.area_manager_status = area_manager_status[0][0]
                    time_sheet_obj.save()
                    PendingTimeSheet.objects.get(sheet=time_sheet_obj).delete()
                    ApprovedTimeSheet.objects.create(
                        sheet=time_sheet_obj,
                        station=time_sheet_obj.station_code,
                        task=time_sheet_obj.task_id,
                        timestamp = datetime.now()
                    )
            else:
                time_sheet_obj.area_manager_status = area_manager_status[0][0]
                time_sheet_obj.save()
                PendingTimeSheet.objects.get(sheet=time_sheet_obj).delete()
                ApprovedTimeSheet.objects.create(
                    sheet=time_sheet_obj,
                    station=time_sheet_obj.station_code,
                    task=time_sheet_obj.task_id,
                    timestamp = datetime.now()
                )    
        else:
            approved_time_sheets_flag = ApprovedTimeSheet.objects.filter(
                    station=time_sheet_obj.station_code,
                    task=time_sheet_obj.task_id,
                ).exists()
            if not approved_time_sheets_flag:
                time_sheet_obj.area_manager_status = area_manager_status[0][0]
                time_sheet_obj.save()
                ApprovedTimeSheet.objects.create(
                    sheet=time_sheet_obj,
                    station=time_sheet_obj.station_code,
                    task=time_sheet_obj.task_id,
                    timestamp = datetime.now()
                )
                PendingTimeSheet.objects.get(sheet=time_sheet_obj).delete()

            TimeSheet.objects.filter(
                station_code=time_sheet_obj.station_code,
                task_id=time_sheet_obj.task_id,
                area_manager_status=None).update(area_manager_status=area_manager_status[1][0])
            p_list = PendingTimeSheet.objects.filter(station=time_sheet_obj.station_code, task=time_sheet_obj.task_id)
            rejected_list = [
                RejectedTimeSheet(
                    sheet=pend.sheet,
                    station=pend.station,
                    task=pend.task,
                    timestamp=datetime.now()
                )
                for pend in p_list
            ]
            RejectedTimeSheet.objects.bulk_create(rejected_list)
            p_list.delete()

        time_sheet_list = TimeSheet.objects.select_related('eng_name', 'tech_name', 'station_code', 'task_id')\
            .filter(area_manager_status=None)\
            .only(
                'id',
                'eng_name__first_name',
                'eng_name__last_name',
                'tech_name__first_name',
                'tech_name__last_name',
                'station_code__station_id',
                'ticket_id',
                'task_id__name',
                'visit_date',
                'notes',
                'record_date',
            ).order_by('-id')
        data = [
            {
                'id': tsh.id,
                'eng_name': tsh.eng_name.first_name + ' ' + tsh.eng_name.last_name,
                'tech_name': tsh.tech_name.first_name + ' ' + tsh.tech_name.last_name if tsh.tech_name else None,
                'station_code': tsh.station_code.station_id,
                'ticket_id': tsh.ticket_id,
                'task_id': tsh.task_id.name,
                'visit_date': date_time_formatter(tsh.visit_date),
                'notes': tsh.notes,
                'record_date': date_time_formatter(tsh.record_date),
            }
            for tsh in time_sheet_list
        ]
        return JsonResponse(data=data, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)


def TimeSheetNotApprovedApi(request, timeSheetId):
    try:
        time_sheet_obj = TimeSheet.objects.get(id=timeSheetId)
        time_sheet_obj.area_manager_status = area_manager_status[1][0]
        time_sheet_obj.save()
        PendingTimeSheet.objects.get(sheet=time_sheet_obj).delete()
        RejectedTimeSheet.objects.create(
            sheet=time_sheet_obj,
            station=time_sheet_obj.station_code,
            task=time_sheet_obj.task_id,
            timestamp = datetime.now()
        )
        time_sheet_list = TimeSheet.objects.select_related('eng_name', 'tech_name', 'station_code', 'task_id')\
            .filter(area_manager_status=None)\
            .only(
                'id',
                'eng_name__first_name',
                'eng_name__last_name',
                'tech_name__first_name',
                'tech_name__last_name',
                'station_code__station_id',
                'ticket_id',
                'task_id__name',
                'visit_date',
                'notes',
                'record_date',
            ).order_by('-id')
        data = [
            {
                'id': tsh.id,
                'eng_name': tsh.eng_name.first_name + ' ' + tsh.eng_name.last_name,
                'tech_name': tsh.tech_name.first_name + ' ' + tsh.tech_name.last_name if tsh.tech_name else None,
                'station_code': tsh.station_code.station_id,
                'ticket_id': tsh.ticket_id,
                'task_id': tsh.task_id.name,
                'visit_date': date_time_formatter(tsh.visit_date),
                'notes': tsh.notes,
                'record_date': date_time_formatter(tsh.record_date),
            }
            for tsh in time_sheet_list
        ]
        return JsonResponse(data=data, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)


@is_user_login
def TimeSheetDoneView(request):
    user_token = request.session['user_token']
    user_obj = Token.objects.get(token=user_token).user
    time_sheet_list = TimeSheet.objects.select_related('eng_name',
            'tech_name',
            'station_code',
            'task_id')\
        .exclude(area_manager_status=None)\
        .only(
            'id',
            'eng_name__first_name',
            'eng_name__last_name',
            'tech_name__first_name',
            'tech_name__last_name',
            'station_code__station_id',
            'ticket_id',
            'task_id__name',
            'visit_date',
            'notes',
            'record_date',
            'area_manager_status'
        ).order_by('-id')
    context = {
        'user': user_obj,
        'timeSheets': time_sheet_list
    }
    return render(request,'AMTimeSheetDone.html', context)


def TimeSheetDoneApi(request):
    try:
        time_sheet_list = TimeSheet.objects.select_related('eng_name',
            'tech_name',
            'station_code',
            'task_id')\
        .exclude(area_manager_status=None)\
        .only(
            'id',
            'eng_name__first_name',
            'eng_name__last_name',
            'tech_name__first_name',
            'tech_name__last_name',
            'station_code__station_id',
            'ticket_id',
            'task_id__name',
            'visit_date',
            'notes',
            'record_date',
            'area_manager_status'
        ).order_by('-id')
        data = [
            {
                'id': tsh.id,
                'eng_name': tsh.eng_name.first_name + ' ' + tsh.eng_name.last_name,
                'tech_name': tsh.tech_name.first_name + ' ' + tsh.tech_name.last_name if tsh.tech_name else None,
                'station_code': tsh.station_code.station_id,
                'ticket_id': tsh.ticket_id,
                'task_id': tsh.task_id.name,
                'visit_date': tsh.visit_date,
                'notes': tsh.notes,
                'record_date': tsh.record_date,
                'area_manager_status': tsh.area_manager_status
            }
            for tsh in time_sheet_list
        ]
        return JsonResponse(data=data, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)


@is_user_login
def SiteDataView(request):
    if request.method == 'POST':
        station_id = request.POST.get('station_id', None)
        station_code = request.POST.get('station_code', None)
        gts_station_id = request.POST.get('gts_station_id', None)
        governorate = request.POST.get('governorate', None)
        company_name = request.POST.get('company_name', None)
        phase = request.POST.get('phase', None)
        inserted_by = request.POST.get('inserted_by', None)
        Station.objects.create(
            station_id=station_id,
            station_code=station_code,
            gts_station_id=gts_station_id,
            governorate=governorate,
            company_name=company_name,
            phase=phase,
            inserted_by=inserted_by
        )
        return HttpResponseRedirect('/system/SiteData/?done=true')
    user_token = request.session['user_token']
    user_obj = Token.objects.get(token=user_token).user
    sites_data_list = Station.objects.all().order_by('id')
    page = request.GET.get('page', 1)
    paginator = Paginator(sites_data_list, 200)
    context = {
        'user': user_obj,
        'paginator': paginator.get_page(page)
    }
    return render(request,'AMSiteData.html', context)


@is_user_login
def AllowancesView(request):
    user_token = request.session['user_token']
    user_obj = Token.objects.get(token=user_token).user
    if ApprovedTimeSheet.objects.exists():
        rec_date = ApprovedTimeSheet.objects.order_by('timestamp').first().timestamp
    else:
        rec_date = datetime.now()
    context = {
        'user': user_obj,
        'rec_date': rec_date,
    }
    return render(request,'AMAllowances.html', context)


# def AllowancesViewApi(request, start, end, check):
#     try:
#         # print(start, end, check)
#         filter_condition = Q()
#         if check == 'both':
#             filter_condition &= Q(record_date__date__gte=parsed_date(start), record_date__date__lte=parsed_date(end))
#         elif check == 'start':
#             filter_condition &= Q(record_date__date__gte=parsed_date(start))
#         elif check == 'end':
#             filter_condition &= Q(record_date__date__lte=parsed_date(end))
#         # time_sheet_list = TimeSheet.objects.filter(filter_condition)
#         time_sheet_list = TimeSheet.objects.select_related('eng_name', 'task_id')\
#             .exclude(Q(area_manager_status=None) | Q(area_manager_status='na'))\
#             .filter(filter_condition)\
#             .only(
#                 'eng_name__first_name',
#                 'eng_name__last_name',
#             )

#         time_sheet_calc = time_sheet_list.values('eng_name__id', 'eng_name__first_name', 'eng_name__last_name')\
#             .annotate(allowances=Sum('task_id__allowances'), sheets=Count('task_id'))
        
#         time_sheet_summary = []
#         total_sheets = 0
#         total_allowances = 0
#         for tss in time_sheet_calc:
#             time_sheet_summary.append(tss)
#             total_sheets += int(tss['sheets'])
#             total_allowances += int(tss['allowances'])
#         data = {
#             'summary': time_sheet_summary,
#             'total_sheets': total_sheets,
#             'total_allowances': total_allowances,
#         }
#         return JsonResponse(data=data, safe=False)
#     except TimeSheet.DoesNotExist:
#         return JsonResponse(data=[['Error', 1]], safe=False)


def AllowancesViewApi(request, start, end, check):
    try:
        # print(start, end, check)
        filter_condition = Q()
        if check == 'both':
            filter_condition &= Q(timestamp__date__gte=parsed_date(start), timestamp__date__lte=parsed_date(end))
        elif check == 'start':
            filter_condition &= Q(timestamp__date__gte=parsed_date(start))
        elif check == 'end':
            filter_condition &= Q(timestamp__date__lte=parsed_date(end))
        # time_sheet_list = TimeSheet.objects.filter(filter_condition)
        time_sheet_list = ApprovedTimeSheet.objects.select_related('sheet', 'task')\
            .filter(filter_condition)\
            .only(
                'sheet__eng_name__first_name',
                'sheet__eng_name__last_name',
            )

        time_sheet_calc = time_sheet_list.values('sheet__eng_name__id', 'sheet__eng_name__first_name', 'sheet__eng_name__last_name')\
            .annotate(allowances=Sum('task__allowances'), tasks=Count('task'))
        
        time_sheet_summary = []
        total_sheets = 0
        total_allowances = 0
        for tss in time_sheet_calc:
            # print(tss)
            time_sheet_summary.append({
                'eng_name__id': tss['sheet__eng_name__id'],
                'eng_name__first_name': tss['sheet__eng_name__first_name'],
                'eng_name__last_name': tss['sheet__eng_name__last_name'],
                'sheets': tss['tasks'],
                'allowances': tss['allowances']
            })
            total_sheets += int(tss['tasks'])
            total_allowances += int(tss['allowances'])
        data = {
            'summary': time_sheet_summary,
            'total_sheets': total_sheets,
            'total_allowances': total_allowances,
        }
        # print(data)
        return JsonResponse(data=data, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)


def AllowancesDetailsViewApi(request, eng_id):
    try:
        time_sheet_list = ApprovedTimeSheet.objects.select_related('sheet__tech_name', 'station', 'task')\
            .filter(sheet__eng_name__id=eng_id)\
            .only(
                'sheet__tech_name__first_name',
                'sheet__tech_name__last_name',
                'station__station_id',
                'sheet__ticket_id',
                'task__name',
                'task__allowances',
                'sheet__visit_date',
                'sheet__record_date',
            )
        data = [
            {
                'id': tsl.sheet.id,
                'tech_name': f"{tsl.sheet.tech_name.first_name} {tsl.sheet.tech_name.last_name}" if tsl.sheet.tech_name else None,
                'station_id': tsl.station.station_id,
                'ticket_id': tsl.sheet.ticket_id,
                'task_name': tsl.task.name,
                'task_allowances': tsl.task.allowances,
                'visit_date': date_time_formatter(tsl.sheet.visit_date),
                # 'record_date': tsl.record_date,
            }
            for tsl in time_sheet_list
        ]
        return JsonResponse(data=data, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)
    

def AllowancesAllDetailsViewApi(request):
    try:
        time_sheet_list = ApprovedTimeSheet.objects.select_related('sheet__eng_name', 'sheet__tech_name', 'station', 'task')\
            .only(
                'sheet__eng_name__first_name',
                'sheet__eng_name__last_name',
                'sheet__tech_name__first_name',
                'sheet__tech_name__last_name',
                'station__station_id',
                'sheet__ticket_id',
                'task__name',
                'task__allowances',
                'sheet__visit_date',
                'sheet__record_date',
            )
        data = [
            {
                'id': tsl.sheet.id,
                'eng_name': f"{tsl.sheet.eng_name.first_name} {tsl.sheet.eng_name.last_name}",
                'tech_name': f"{tsl.sheet.tech_name.first_name} {tsl.sheet.tech_name.last_name}" if tsl.sheet.tech_name else None,
                'station_id': tsl.station.station_id,
                'ticket_id': tsl.sheet.ticket_id,
                'task_name': tsl.task.name,
                'task_allowances': tsl.task.allowances,
                'visit_date': date_time_formatter(tsl.sheet.visit_date),
                # 'record_date': tsl.record_date,
            }
            for tsl in time_sheet_list
        ]
        return JsonResponse(data=data, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)
    

def parsed_date(date):
    return datetime.strptime(date, "%Y-%m-%dT%H:%M").date()


@is_user_login
def UserChangePassword(request):
    if request.method == 'POST':
        username = request.POST.get('userid', None)
        password = request.POST.get('new_password', None)
        try:
            user = UserAccount.objects.get(id=username)
            user.password = make_password(password)
            user.save()
            return HttpResponseRedirect('/system/change/password/?change=true')
        except UserAccount.DoesNotExist:
            print('UserAccount not found')
    user_token = request.session['user_token']
    user_obj = Token.objects.get(token=user_token).user
    context = {
        'user': user_obj,
    }
    return render(request, 'changePassword.html', context)


@is_user_login
def SiteEngineerDashboardView(request):
    user_token = request.session['user_token']
    user_obj = Token.objects.get(token=user_token).user
    time_sheet_list = TimeSheet.objects.select_related('eng_name', 'tech_name', 'station_code', 'task_id')\
            .filter(eng_name=user_obj)\
            .only(
                'eng_name__username',
                'tech_name__first_name',
                'tech_name__last_name',
                'station_code__station_id',
                'ticket_id',
                'task_id__name',
                'visit_date',
                'notes',
                'area_manager_status',
            )
    context = {
        'user': user_obj,
        'timesheet': time_sheet_list,
    }
    return render(request, 'SEDashboard.html', context)


@is_user_login
def SiteEngineerManPowerTaskView(request):
    user_token = request.session['user_token']
    user_obj = Token.objects.get(token=user_token).user
    if request.method == 'POST':
        print(request.POST)
        eng_select = request.POST.get('eng_select', None)
        tech_select = request.POST.get('tech_select', None)
        station_select = request.POST.get('station_select', None)
        ticket = request.POST.get('ticket', None)
        task_select = request.POST.get('task_select', None)
        visit = request.POST.get('visit', None)
        notes = request.POST.get('notes', None)
        check_exists = ApprovedTimeSheet.objects.exclude(task__name__icontains='maintenance')\
            .filter(
                station_id=station_select,
                task_id=task_select,
            ).exists()
        if not check_exists:
            sheet_obj = TimeSheet.objects.create(
                eng_name_id=eng_select,
                tech_name_id=tech_select,
                station_code_id=station_select,
                ticket_id=ticket,
                task_id_id=task_select,
                visit_date=visit,
                notes=notes,
                record_date=datetime.now(),
            )
            PendingTimeSheet.objects.create(
                sheet=sheet_obj,
                station=sheet_obj.station_code,
                task=sheet_obj.task_id,
                timestamp = datetime.now()
            )
            return HttpResponseRedirect('/system/Task/?done=true')
        else:
            return HttpResponseRedirect('/system/Task/?fail=true')
    tasks_list = Task.objects.only('id', 'man_power_type', 'name')
    context = {
        'user': user_obj,
        # 'manPowerTypes': man_power_choices,
        'tasks_list': tasks_list,
    }
    return render(request, 'SEManPowerTask.html', context)


def SiteEngineerManPowerTaskViewApi(request):
    try:
        eng_list = UserAccount.objects.filter(position_id=2).only('id', 'first_name', 'last_name')
        tech_list = UserAccount.objects.filter(position_id=3).only('id', 'first_name', 'last_name')
        station_list = Station.objects.only('id', 'station_id')
        data = {
            'eng_list': [{'id': el.id, 'first_name': el.first_name, 'last_name': el.last_name} for el in eng_list],
            'tech_list': [{'id': tchl.id, 'first_name': tchl.first_name, 'last_name': tchl.last_name} for tchl in tech_list],
            'station_list': [{'id': stl.id, 'station_id': stl.station_id} for stl in station_list],
        }
        return JsonResponse(data=data, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)
    

@is_user_login
def CostControlAllowancesView(request):
    user_token = request.session['user_token']
    user_obj = Token.objects.get(token=user_token).user
    context = {
        'user': user_obj,
    }
    return render(request,'CCAllowances.html', context)


def CostControlAllowancesViewApi(request, start, end, check):
    try:
        # print(start, end, check)
        filter_condition = Q()
        if check == 'both':
            filter_condition &= Q(record_date__date__gte=parsed_date(start), record_date__date__lte=parsed_date(end))
        elif check == 'start':
            filter_condition &= Q(record_date__date__gte=parsed_date(start))
        elif check == 'end':
            filter_condition &= Q(record_date__date__lte=parsed_date(end))
        # time_sheet_list = TimeSheet.objects.filter(filter_condition)
        time_sheet_list = TimeSheet.objects.select_related('eng_name', 'task_id')\
            .exclude(Q(area_manager_status=None) | Q(area_manager_status='na'))\
            .filter(filter_condition)\
            .only(
                'eng_name__first_name',
                'eng_name__last_name',
            )

        time_sheet_calc = time_sheet_list.values('eng_name__id', 'eng_name__first_name', 'eng_name__last_name')\
            .annotate(allowances=Sum('task_id__allowances'), sheets=Count('task_id'))
        
        time_sheet_summary = []
        total_sheets = 0
        total_allowances = 0
        for tss in time_sheet_calc:
            time_sheet_summary.append(tss)
            total_sheets += int(tss['sheets'])
            total_allowances += int(tss['allowances'])
        data = {
            'summary': time_sheet_summary,
            'total_sheets': total_sheets,
            'total_allowances': total_allowances,
        }
        return JsonResponse(data=data, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)


def CostControlAllowancesDetailsViewApi(request, eng_id):
    try:
        time_sheet_list = TimeSheet.objects.select_related('tech_name', 'station_code', 'task_id')\
            .exclude(Q(area_manager_status=None) | Q(area_manager_status='na'))\
            .filter(eng_name__id=eng_id)\
            .only(
                'tech_name__first_name',
                'tech_name__last_name',
                'station_code__station_id',
                'ticket_id',
                'task_id__name',
                'task_id__allowances',
                'visit_date',
                'record_date',
            )
        data = [
            {
                'id': tsl.id,
                'tech_name': f"{tsl.tech_name.first_name} {tsl.tech_name.last_name}" if tsl.tech_name else None,
                'station_id': tsl.station_code.station_id,
                'ticket_id': tsl.ticket_id,
                'task_name': tsl.task_id.name,
                'task_allowances': tsl.task_id.allowances,
                'visit_date': tsl.visit_date,
                # 'record_date': tsl.record_date,
            }
            for tsl in time_sheet_list
        ]
        return JsonResponse(data=data, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)
    


def CostControlAllowancesAllDetailsViewApi(request):
    try:
        time_sheet_list = TimeSheet.objects.select_related('eng_name', 'tech_name', 'station_code', 'task_id')\
            .exclude(Q(area_manager_status=None) | Q(area_manager_status='na'))\
            .only(
                'eng_name__first_name',
                'eng_name__last_name',
                'tech_name__first_name',
                'tech_name__last_name',
                'station_code__station_id',
                'ticket_id',
                'task_id__name',
                'task_id__allowances',
                'visit_date',
                'record_date',
            )
        data = [
            {
                'id': tsl.id,
                'eng_name': f"{tsl.eng_name.first_name} {tsl.eng_name.last_name}",
                'tech_name': f"{tsl.tech_name.first_name} {tsl.tech_name.last_name}" if tsl.tech_name else None,
                'station_id': tsl.station_code.station_id,
                'ticket_id': tsl.ticket_id,
                'task_name': tsl.task_id.name,
                'task_allowances': tsl.task_id.allowances,
                'visit_date': date_time_formatter(tsl.visit_date),
                # 'record_date': tsl.record_date,
            }
            for tsl in time_sheet_list
        ]
        return JsonResponse(data=data, safe=False)
    except TimeSheet.DoesNotExist:
        return JsonResponse(data=[['Error', 1]], safe=False)
    


def date_time_formatter(date):
    # Format the datetime as "Month Day, Year, Hour:Minute a.m./p.m."
    formatted_date = date.strftime("%b. %d, %Y, %I:%M %p")
    # print(formatted_date)
    return formatted_date