# Generated by Django 3.2 on 2021-04-15 14:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_applicant'),
    ]

    operations = [
        migrations.AddField(
            model_name='applicant',
            name='email',
            field=models.EmailField(default='', max_length=254),
            preserve_default=False,
        ),
    ]
