# Generated by Django 4.2.5 on 2023-09-23 15:35

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('system', '0003_alter_timesheet_tech_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='task',
            name='add_date',
            field=models.DateTimeField(auto_now_add=True, default=django.utils.timezone.now),
            preserve_default=False,
        ),
    ]
