from django import forms
from django.contrib import admin
from .models import *
from django.contrib.auth.hashers import make_password
# Register your models here.


class UserAccountAdminForm(forms.ModelForm):
    class Meta:
        model = UserAccount
        fields = '__all__'

    def __init__(self, *args, **kwargs):
        super(UserAccountAdminForm, self).__init__(*args, **kwargs)
        # Hide the edit_site_data field for users whose position is not "Area Manager"
        if self.instance and self.instance.position.id != 1:
            self.fields['edit_site_data'].widget = forms.HiddenInput()


@admin.register(UserType)
class UserTypeAdmin(admin.ModelAdmin):
    list_display = [
        'id',
        'type',
        'add_date'
    ]


@admin.register(UserAccount)
class UserAdmin(admin.ModelAdmin):
    list_display = [
        'first_name',
        'last_name',
        'email',
        'username',
        'password',
        'national_id',
        'position',
        'add_date',
        'first_login',
        'edit_site_data',
    ]
    form = UserAccountAdminForm
    def save_model(self, request, obj, form, change):
        if obj.password:
            obj.password = make_password(obj.password)
        # Call the parent class's save_model() to perform the actual saving
        super().save_model(request, obj, form, change)


@admin.register(Token)
class TokenAdmin(admin.ModelAdmin):
    list_display = [
        'get_user_email',
        'token',
        'timestamp'
    ]

    def get_user_email(self, obj):
        return obj.user.username
    get_user_email.short_description = 'Username'

