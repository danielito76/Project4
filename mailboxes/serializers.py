from rest_framework import serializers
from django.contrib.auth.models import User
from .models import MailBox, RentalAgreement, Mail

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('username', 'email', 'mailboxes', 'rental_agreements', 'mail')

class MailBoxSerializer(serializers.ModelSerializer):
    # customer = UserSerializer(read_only=True)
    class Meta:
        model = MailBox
        fields = ('id', 'number',)


class RentalAgreementSerializer(serializers.ModelSerializer):

    class Meta:
        model = RentalAgreement
        fields = ('mailbox', 'startdate', 'rentalperiod', 'confirmed')
        read_only_fields = ('confirmed',)

class PopulatedRentalAgreementSerializer(RentalAgreementSerializer):
    mailbox = MailBoxSerializer()

class MailSerializer(serializers.ModelSerializer):
    # customer = UserSerializer()
    class Meta:
        model = Mail
        fields = ('mailbox', 'receivingtime', 'trackingnumber', 'color', 'description', 'collected')


class PopulatedUserSerializer(UserSerializer):

    mailboxes = MailBoxSerializer(many=True)
    rental_agreements = PopulatedRentalAgreementSerializer(many=True)
    mail = MailSerializer(many=True)
