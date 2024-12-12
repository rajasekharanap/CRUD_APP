from rest_framework import  serializers
from .models import Customuser

class CustomUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    class Meta:
        model = Customuser
        fields = ['username', 'email', 'password', 'image', 'phone_number', 'id', "is_staff", "is_active"]

    def validate_password(self, value):
        if len(value) < 8:
            raise serializers.ValidationError("Password must be atleast 8 characters")
        return value

    def validate_email(self, value):
        if Customuser.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return  value

    def create(self, validated_data):
        user = Customuser.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            )
        user.phone_number = validated_data.get('phone_number', None)
        user.image = validated_data.get('image', None)
        user.save()
        return user