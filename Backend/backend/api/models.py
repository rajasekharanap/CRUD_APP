from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.

class Customuser(AbstractUser):
    image = models.ImageField(upload_to="profile_pics/", blank=True, null=True)
    phone_number = models.CharField(max_length=10, blank=True, null=True)