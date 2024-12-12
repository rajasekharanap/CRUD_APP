from .models import Customuser
from rest_framework.decorators import api_view,permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .serilalizers import CustomUserSerializer
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.shortcuts import get_object_or_404


# Create your views here.


@api_view(['POST'])
@permission_classes([AllowAny])
def register_user(request):
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User registered successfully'},
                        status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    user = authenticate(request, username=username, password=password)

    if user is not None:
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': user.username,
            'email': user.email,
            'is_active': user.is_active,
            'is_staff': user.is_staff,
            'accessToken': str(refresh.access_token),
            'refresh': str(refresh),
        }, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid credentials'},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_view(request):
    print("Headers:", dict(request.headers))
    serializer = CustomUserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({'message': 'User Created Successfully',
                         'user': serializer.data},
                        status=status.HTTP_201_CREATED)
    else:
        return Response({'errors': serializer.errors},
                        status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([AllowAny])
def user_list(request):
    users = Customuser.objects.all()
    serializer = CustomUserSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['DELETE'])
@permission_classes([AllowAny])
def delete_user(request, user_id):
    user = get_object_or_404(Customuser, id=user_id)
    if user == request.user:
        return Response({'message': "You cannot delete your own account"},
                        status=status.HTTP_400_BAD_REQUEST)
    user.delete()
    return Response({'message': 'User deleted successfully'},
                    status=status.HTTP_204_NO_CONTENT)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout_user(request):
    request.user.auth_token.delete()
    return Response({'message': "Successfully logged out"}, status=200)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def block_user(request, user_id):
    user = get_object_or_404(Customuser, id=user_id)
    user.is_active = not user.is_active
    user.save()
    status_message = 'blocked' if not user.is_active else 'unblocked'
    return Response({'message': f'User successfully {status_message}'},
                    status=status.HTTP_200_OK)
