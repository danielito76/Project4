from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class StorageArea(models.Model):
    name = models.CharField(max_length=30)
    def __str__(self):
        return f'{self.name}'

class MailBox(models.Model):
    number = models.IntegerField()
    customer = models.ForeignKey(User, related_name='mailboxes', on_delete=models.SET_NULL, null=True)

    def __str__(self):
        return f'{self.number} {self.customer}'

class RentalAgreement(models.Model):
    customer = models.ForeignKey(User, related_name='rental_agreements', on_delete=models.PROTECT)
    mailbox = models.ForeignKey(MailBox, related_name='rental_agreements', on_delete=models.PROTECT) # i need number
    startdate = models.DateTimeField(auto_now=False, auto_now_add=False)
    rentalperiod = models.DurationField()
    confirmed = models.BooleanField()
    def __str__(self):
        return f'{self.customer} {self.mailbox} {self.startdate} {self.rentalperiod} {self.confirmed}'

class Mail(models.Model):
    customer = models.ForeignKey(User, related_name='mail', on_delete=models.PROTECT)
    mailbox = models.ForeignKey(MailBox, related_name='mail', on_delete=models.PROTECT) # i need number
    receivingtime = models.DateTimeField(auto_now=False, auto_now_add=False)
    trackingnumber = models.CharField(max_length=500)
    color = models.CharField(max_length=30)
    description = models.TextField()
    storagearea = models.ForeignKey(StorageArea, related_name='mail', on_delete=models.PROTECT)
    collected = models.BooleanField(default=False)
    def __str__(self):
        return f'{self.customer} {self.mailbox} {self.receivingtime} {self.trackingnumber} {self.color} {self.description} {self.storagearea}'
