# Generated by Django 3.2 on 2021-04-17 07:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0010_auto_20210416_0653'),
    ]

    operations = [
        migrations.AddField(
            model_name='offer',
            name='opened',
            field=models.BooleanField(default=False),
        ),
    ]
