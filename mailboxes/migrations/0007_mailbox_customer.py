# Generated by Django 2.2.5 on 2019-09-12 10:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mailboxes', '0006_remove_mailbox_customer'),
    ]

    operations = [
        migrations.AddField(
            model_name='mailbox',
            name='customer',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='mailboxes', to=settings.AUTH_USER_MODEL),
        ),
    ]
