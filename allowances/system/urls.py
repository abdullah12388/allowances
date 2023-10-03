from django.urls import path, re_path, include
from .views import *
# from django.views.static import serve

urlpatterns = [
    # dashboard
    path('AM/', AreaManagerView, name='AreaManagerView'),
    path('AM/table/data/api/', TasksTableApi, name='TasksTableApi'),
    path('AM/status/combo/chart/api/', StatusComboChartApi, name='StatusComboChartApi'),
    path('AM/status/pie/chart/api/', StatusPieChartApi, name='StatusPieChartApi'),
    # path('AM/pending/pie/chart/api/', PendingPieChartApi, name='PendingPieChartApi'),
    # path('AM/tasks/column/chart/api/', TasksColumnChartApi, name='TasksColumnChartApi'),
    path('AM/tasks/pie/chart/api/', TasksPieChartApi, name='TasksPieChartApi'),
    # man power
    path('ManPower/', ManPowerView, name='ManPowerView'),
    path('ManPower/position/pie/chart/api/', ManPowerPositionPieChartApi, name='ManPowerPositionPieChartApi'),
    path('Tasks/', TasksView, name='TasksView'),
    # time sheet
    path('TimeSheet/ToDo/', TimeSheetToDoView, name='TimeSheetToDoView'),
    path('TimeSheet/ToDo/approved/api/<str:timeSheetId>/', TimeSheetApprovedApi, name='TimeSheetApprovedApi'),
    path('TimeSheet/ToDo/rejected/api/<str:timeSheetId>/', TimeSheetNotApprovedApi, name='TimeSheetNotApprovedApi'),
    path('TimeSheet/Done/', TimeSheetDoneView, name='TimeSheetDoneView'),
    path('TimeSheet/Done/api/', TimeSheetDoneApi, name='TimeSheetDoneApi'),
    # site data
    path('SiteData/', SiteDataView, name='SiteDataView'),
    # allowances
    path('Allowances/', AllowancesView, name='AllowancesView'),
    path('Allowances/api/<str:start>/<str:end>/<str:check>/', AllowancesViewApi, name='AllowancesViewApi'),
    path('Allowances/details/api/<str:eng_id>/', AllowancesDetailsViewApi, name='AllowancesDetailsViewApi'),
    path('Allowances/all/details/api/', AllowancesAllDetailsViewApi, name='AllowancesAllDetailsViewApi'),
    # change Password
    path('change/password/', UserChangePassword, name='UserChangePassword'),

    # Site Engineer
    path('SE/', SiteEngineerDashboardView, name='SiteEngineerDashboardView'),
    path('Task/', SiteEngineerManPowerTaskView, name='SiteEngineerManPowerTaskView'),
    path('Task/api/', SiteEngineerManPowerTaskViewApi, name='SiteEngineerManPowerTaskViewApi'),
    
    # Cost Control
    path('CC/Allowances/', CostControlAllowancesView, name='CostControlAllowancesView'),
    path('CC/Allowances/api/<str:start>/<str:end>/<str:check>/', CostControlAllowancesViewApi, name='CostControlAllowancesViewApi'),
    path('CC/Allowances/details/api/<str:eng_id>/', CostControlAllowancesDetailsViewApi, name='CostControlAllowancesDetailsViewApi'),
    path('CC/Allowances/all/details/api/', CostControlAllowancesAllDetailsViewApi, name='CostControlAllowancesAllDetailsViewApi'),

]
