# Generated by Django 4.2.5 on 2023-09-20 13:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='useraccount',
            name='email',
            field=models.CharField(blank=True, max_length=254, null=True),
        ),
    ]
