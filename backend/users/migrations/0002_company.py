# Generated by Django 3.2 on 2021-04-15 11:13

from django.db import migrations, models
import shortuuidfield.fields


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0001_initial"),
    ]

    operations = [
        migrations.CreateModel(
            name="Company",
            fields=[
                (
                    "id",
                    shortuuidfield.fields.ShortUUIDField(
                        blank=True,
                        editable=False,
                        max_length=22,
                        primary_key=True,
                        serialize=False,
                    ),
                ),
                ("name", models.CharField(max_length=100)),
                (
                    "icon",
                    models.ImageField(
                        blank=True, null=True, upload_to="companies/icons"
                    ),
                ),
            ],
            options={
                "verbose_name": "Company",
                "verbose_name_plural": "Companies",
                "db_table": "",
                "managed": True,
            },
        ),
    ]
