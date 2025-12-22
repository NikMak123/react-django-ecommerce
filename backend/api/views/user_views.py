from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from rest_framework import status

# rest frameworks import

from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.serializers import Serializer

#  rest framework jwt

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# local import
from api.models import *
from api.serializers import UserSerializer,UserSerializerWithToken

# jwt views

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs) #for validating token
    
    # serializing user and adding token to it
        serializer = UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k] = v
    
        return data
    
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user) #for generating token
    
        # add custom field
        token['Username'] = user.username
        token['message'] = "Hello Proshop"


        return token
    
# class based view for login
class MyTokenObtainParisView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


# shop api
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/products'
        '/api/products/<id>'
        '/api/users',
        '/api/users/register'
        '/api/users/login'
        '/api/users/profile',
    ]
    return Response(routes)

@api_view(['POST'])
def resgisterUser(request):
    data = request.data
    name = data.get('name', '')
    email = data.get('email', '')
    password = data.get('password', '')

    if not name or not email or not password:
        return Response({"detail": "All fields are required"}, status=400)

    if User.objects.filter(username=email).exists():
        return Response({"detail": "User with this email already exists"}, status=400)

    user = User.objects.create(
        first_name=name,
        username=email,
        password=make_password(password)
    )

    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    data = request.data

    # Check if the new username/email is already taken by another user
    new_email = data.get('email', user.email)
    if new_email != user.email and User.objects.filter(username=new_email).exists():
        return Response({'detail': 'Email/Username already in use'}, status=status.HTTP_400_BAD_REQUEST)

    # Update user fields
    user.first_name = data.get('name', user.first_name)
    user.username = new_email  # keep username unique
    user.email = new_email
    if data.get('password'):
        user.password = make_password(data['password'])

    user.save()

    # Serialize after saving
    serializer = UserSerializerWithToken(user, many=False)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUser(request,pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()

    return Response('User was deleted')
