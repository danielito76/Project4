# Generated by Django 2.2.5 on 2019-09-05 14:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='MailBox',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('number', models.IntegerField()),
                ('customer', models.ManyToManyField(blank=True, related_name='mailboxes', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='StorageArea',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='RentalAgreement',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('startdate', models.DateTimeField()),
                ('rentalperiod', models.DurationField()),
                ('confirmed', models.BooleanField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='rentalagreement', to=settings.AUTH_USER_MODEL)),
                ('mailbox', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='rentalagreement', to='mailboxes.MailBox')),
            ],
        ),
        migrations.CreateModel(
            name='Mail',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('receivingtime', models.DateTimeField()),
                ('trackingnumber', models.CharField(max_length=500)),
                ('color', models.CharField(max_length=30)),
                ('description', models.TextField()),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='mail', to=settings.AUTH_USER_MODEL)),
                ('mailbox', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='mail', to='mailboxes.MailBox')),
                ('storagearea', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='mail', to='mailboxes.StorageArea')),
            ],
        ),
    ]
