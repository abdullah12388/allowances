from django.urls import path
from .views import *

urlpatterns = [
    path('', userLogin, name='login'),
    path('logout/', UserLogout, name='UserLogout'),
    path('change/password/first/login/', UserChangePasswordFirstLogin, name='UserChangePasswordFirstLogin'),
]
