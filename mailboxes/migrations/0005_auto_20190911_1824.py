# Generated by Django 2.2.5 on 2019-09-11 17:24

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mailboxes', '0004_auto_20190910_2228'),
    ]

    operations = [
        migrations.AlterField(
            model_name='rentalagreement',
            name='rentalperiod',
            field=models.CharField(max_length=30),
        ),
        migrations.AlterField(
            model_name='rentalagreement',
            name='startdate',
            field=models.DateField(),
        ),
    ]
