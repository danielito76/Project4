import datetime
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.models import User
from django.conf import settings
import jwt
from .serializers import UserSerializer
# Create your views here.

class RegisterView(APIView):

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message':'Registration Successful'})

        return  Response(serializer.errors, status=422)


class LoginView(APIView):

    def get_user(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            raise AuthenticationFailed({'message':'Invalid credentials'})

    def post(self, request):

        email = request.data.get('email')
        password = request.data.get('password')

        user = self.get_user(email)


# =======================


        print(user)

        if not user.check_password(password):
            raise AuthenticationFailed({'message': 'Invalid credentials'})

        payload = {
            'sub': user.id,
            'iat': datetime.datetime.utcnow(),
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=6)
        }

        token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'user': user.id})






        # if not user.check_password(password):
        #     raise AuthenticationFailed({'message':'Invalid credentials'})
        #
        # token = jwt.encode({'sub': user.id}, settings.SECRET_KEY, algorithm='HS256')
        # return Response({'token': token, 'message': f'Welcome back {user.username}!'})
