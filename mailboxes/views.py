from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
# from django.contrib.auth.models import User
from jwt_auth.serializers import UserSerializer

# Create your views here.

from django.core.mail import send_mail
from django.conf import settings


from .models import MailBox
from .models import RentalAgreement
from .models import Mail
from .serializers import PopulatedUserSerializer
from .serializers import MailBoxSerializer
from .serializers import RentalAgreementSerializer
from .serializers import MailSerializer



class MessageView(APIView):

    def post(self, request):
        name = request.data.get('name')
        message = request.data.get('message')
        email_from = request.data.get('email')
        recipient_list = [settings.EMAIL_HOST_USER,]
        send_mail(name, message, email_from, recipient_list)
        return Response({'message': 'Message sent!'})


#================================MAILBOXES===========================================


class MailBoxListView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        mailboxes = MailBox.objects.all()
        serializer = MailBoxSerializer(mailboxes, many=True)
        return Response(serializer.data)


    # def post(self, request):
    #     serializer = MailBoxSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save(user=request.user)
    #         return Response(serializer.data, status=201)
    #
    #     return Response(serializer.errors, status=422)


class MailBoxDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request, pk):
        mailbox = MailBox.objects.get(pk=pk)
        serializer = MailBoxSerializer(mailbox)
        return Response(serializer.data)


    # def put(self, request, pk):
    #     mailbox = MailBox.objects.get(pk=pk)
    #     serializer = MailBoxSerializer(mailbox, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #
    #     return Response(serializer.errors, status=422)

    # def delete(self, _request, pk):
    #     mailbox = MailBox.objects.get(pk=pk)
    #     mailbox.delete()
    #
    #     return Response(status=204)




#================================RENTALAGREEMENT===========================================



class RentalAgreementListView(APIView):
    # permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request):
        mailboxes = RentalAgreement.objects.all()
        serializer = RentalAgreementSerializer(mailboxes, many=True)
        return Response(serializer.data)


    def post(self, request):
        serializer = RentalAgreementSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(customer=request.user)
            return Response(serializer.data, status=201)

        return Response(serializer.errors, status=422)


class RentalAgreementDetailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,) # must be only his own rental agreement!!!!!!!!!!!!!!!

    def get(self, _request, pk):
        mailbox = RentalAgreement.objects.get(pk=pk)
        serializer = RentalAgreementSerializer(mailbox)
        return Response(serializer.data)


    def put(self, request, pk):
        mailbox = RentalAgreement.objects.get(pk=pk)
        serializer = RentalAgreementSerializer(mailbox, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=422)


    def delete(self, _request, pk):
        mailbox = RentalAgreement.objects.get(pk=pk)
        mailbox.delete()

        return Response(status=204)


#================================MAIL===========================================



class MailView(APIView):
    permission_classes = (IsAuthenticatedOrReadOnly,)

    def get(self, _request, pk):
        mail = Mail.objects.get(pk=pk)
        serializer = MailSerializer(mail)
        return Response(serializer.data)


    # def put(self, request, pk):
    #     mail = Mail.objects.get(pk=pk)
    #     serializer = MailSerializer(mail, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data)
    #
    #     return Response(serializer.errors, status=422)

    # def delete(self, _request, pk):
    #     mail = Mail.objects.get(pk=pk)
    #     mail.delete()
    #
    #     return Response(status=204)

#================================USERPROFILE===================================


class UserProfileView(APIView):

    permission_classes = (IsAuthenticated,)

    def get(self, request):
        serializer = PopulatedUserSerializer(request.user)
        return Response(serializer.data)


    def put(self, request):
        serializer = UserSerializer(request.user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=422)
