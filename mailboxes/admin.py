from django.contrib import admin
from .models import MailBox, StorageArea, RentalAgreement, Mail

# Register your models here.
admin.site.register(MailBox)
admin.site.register(StorageArea)
admin.site.register(RentalAgreement)
admin.site.register(Mail)
