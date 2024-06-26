# Generated by Django 5.0.4 on 2024-04-16 22:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='board',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('rows', models.IntegerField()),
                ('columns', models.IntegerField()),
                ('current_rows', models.IntegerField()),
                ('current_columns', models.IntegerField()),
                ('board', models.JSONField()),
            ],
        ),
    ]
