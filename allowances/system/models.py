from django.db import models
from account.models import *
# Create your models here.


man_power_choices = (
    ('single', 'Single Person Task'),
    ('multi', 'Multi Persons Task'),
)

area_manager_status = (
    ('a', 'Approved'),
    ('na', 'Rejected'),
)

class Task(models.Model):
    name = models.CharField(max_length=254)
    allowances = models.PositiveBigIntegerField(default=0)
    man_power_type = models.CharField(max_length=254, choices=man_power_choices)
    add_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Station(models.Model):
    station_id = models.CharField(max_length=254)
    station_code = models.CharField(max_length=254)
    gts_station_id = models.CharField(max_length=254)
    governorate = models.CharField(max_length=254)
    company_name = models.CharField(max_length=254)
    phase = models.CharField(max_length=254)
    inserted_by = models.CharField(max_length=254, default='SysAdmin')
    insertion_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.station_id


class TimeSheet(models.Model):
    eng_name = models.ForeignKey(UserAccount, on_delete=models.DO_NOTHING, related_name='engineer')
    tech_name = models.ForeignKey(UserAccount, on_delete=models.DO_NOTHING, related_name='technicion', blank=True, null=True)
    station_code = models.ForeignKey(Station, on_delete=models.DO_NOTHING, related_name='station')
    ticket_id = models.CharField(max_length=254, blank=True, null=True)
    task_id = models.ForeignKey(Task, on_delete=models.DO_NOTHING, related_name='task')
    visit_date = models.DateTimeField()
    notes = models.TextField(blank=True, null=True)
    record_date = models.DateTimeField()
    area_manager_status = models.CharField(max_length=254, choices=area_manager_status, blank=True, null=True)


class ApprovedTimeSheet(models.Model):
    sheet = models.ForeignKey(TimeSheet, on_delete=models.DO_NOTHING, related_name='Approvedsheet')
    station = models.ForeignKey(Station, on_delete=models.DO_NOTHING, related_name='Approvedstation')
    task = models.ForeignKey(Task, on_delete=models.DO_NOTHING, related_name='Approvedtask')
    timestamp = models.DateTimeField()
    status = models.CharField(max_length=50, default='Approved')


class RejectedTimeSheet(models.Model):
    sheet = models.ForeignKey(TimeSheet, on_delete=models.DO_NOTHING, related_name='Rejectedengineer')
    station = models.ForeignKey(Station, on_delete=models.DO_NOTHING, related_name='Rejectedstation')
    task = models.ForeignKey(Task, on_delete=models.DO_NOTHING, related_name='Rejectedtask')
    timestamp = models.DateTimeField()
    status = models.CharField(max_length=50, default='Rejected')


class PendingTimeSheet(models.Model):
    sheet = models.ForeignKey(TimeSheet, on_delete=models.DO_NOTHING, related_name='Pendingengineer')
    station = models.ForeignKey(Station, on_delete=models.DO_NOTHING, related_name='Pendingstation')
    task = models.ForeignKey(Task, on_delete=models.DO_NOTHING, related_name='Pendingtask')
    timestamp = models.DateTimeField()
    status = models.CharField(max_length=50, default='Pending')

