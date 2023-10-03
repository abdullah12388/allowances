from typing import Iterable, Optional
from django.db import models
from django.dispatch import receiver
from django.db.models.signals import post_save
import secrets
import string


# Create your models here.
class UserType(models.Model):
    type = models.CharField(max_length=254)
    add_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.type


class UserAccount(models.Model):
    first_name = models.CharField(max_length=254)
    last_name = models.CharField(max_length=254)
    email = models.CharField(max_length=254, blank=True, null=True)
    username = models.CharField(max_length=254, blank=True, null=True)
    password = models.CharField(max_length=254)
    national_id = models.CharField(max_length=254)
    position = models.ForeignKey(UserType, on_delete=models.DO_NOTHING, related_name='position')
    add_date = models.DateTimeField(auto_now_add=True)
    first_login = models.BooleanField(default=True)
    # For Area Managers Only
    edit_site_data = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.first_name} {self.last_name}"


class Token(models.Model):
    user = models.ForeignKey(UserAccount, on_delete=models.CASCADE, related_name='user')
    token = models.CharField(max_length=254)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.first_name

@receiver(post_save, sender=UserAccount)
def TokenAndUsernameCreate(sender, instance, created, **kwargs):
    if created:
        instance.username = generate_user_login(instance)
        instance.save()
        Token.objects.create(
            user=instance,
            token=generate_user_token()
        )

def generate_user_token(length=16):
    """Generate a random user token of specified length."""
    characters = string.ascii_letters + string.digits
    token = ''.join(secrets.choice(characters) for _ in range(length))
    return token

def generate_user_login(user):
    """Generate a user login from first_name and last_name and last 4 digites of national_id"""
    first_name = user.first_name
    last_name = user.last_name
    national_id = user.national_id
    username = first_name + '_' + last_name + str(national_id)[-4:]
    return username
