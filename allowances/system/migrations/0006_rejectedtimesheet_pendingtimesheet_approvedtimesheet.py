# Generated by Django 4.2.5 on 2023-09-27 10:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0005_alter_timesheet_area_manager_status'),
    ]

    operations = [
        migrations.CreateModel(
            name='RejectedTimeSheet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('status', models.CharField(default='Rejected', max_length=50)),
                ('sheet', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='Rejectedengineer', to='system.timesheet')),
                ('station', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='Rejectedstation', to='system.station')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='Rejectedtask', to='system.task')),
            ],
        ),
        migrations.CreateModel(
            name='PendingTimeSheet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('status', models.CharField(default='Pending', max_length=50)),
                ('sheet', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='Pendingengineer', to='system.timesheet')),
                ('station', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='Pendingstation', to='system.station')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='Pendingtask', to='system.task')),
            ],
        ),
        migrations.CreateModel(
            name='ApprovedTimeSheet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('timestamp', models.DateTimeField()),
                ('status', models.CharField(default='Approved', max_length=50)),
                ('sheet', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='Approvedsheet', to='system.timesheet')),
                ('station_code', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='Approvedstation', to='system.station')),
                ('task', models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='Approvedtask', to='system.task')),
            ],
        ),
    ]
