from django.contrib import admin
from .models import *
# Register your models here.


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'name',
        'allowances',
        'man_power_type',
    ]


@admin.register(Station)
class StationAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'station_id',
        'station_code',
        'gts_station_id',
        'governorate',
        'company_name',
        'phase',
        'inserted_by',
        'insertion_date',
    ]



@admin.register(TimeSheet)
class TimeSheetAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'eng_name',
        'tech_name',
        'station_code',
        'ticket_id',
        'task_id',
        'visit_date',
        'notes',
        'record_date',
        'area_manager_status'
    ]


@admin.register(ApprovedTimeSheet)
class ApprovedTimeSheetAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'sheet',
        'station',
        'task',
        'timestamp',
        'status'
    ]


@admin.register(RejectedTimeSheet)
class RejectedTimeSheetAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'sheet',
        'station',
        'task',
        'timestamp',
        'status'
    ]


@admin.register(PendingTimeSheet)
class PendingTimeSheetAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'sheet',
        'station',
        'task',
        'timestamp',
        'status'
    ]
