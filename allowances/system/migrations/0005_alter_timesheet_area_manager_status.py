# Generated by Django 4.2.5 on 2023-09-24 09:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0004_task_add_date'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timesheet',
            name='area_manager_status',
            field=models.CharField(blank=True, choices=[('a', 'Approved'), ('na', 'Rejected')], max_length=254, null=True),
        ),
    ]
