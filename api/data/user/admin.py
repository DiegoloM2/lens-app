from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

from .forms import UserAdminCreationForm, UserAdminChangeForm

User = get_user_model()


class UserAdmin(BaseUserAdmin):
    # The forms to add and change user instances
    add_form = UserAdminCreationForm
    form = UserAdminChangeForm


    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ['username', 'admin']
    list_filter = ['admin']
    fieldsets = (
        (None, {'fields': ('username','email', 'password')}),
        ('Personal info', {'fields': ()}),
        ('Permissions', {'fields': ('admin',)}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            # 'fields': ('email', 'username')}
            'fields': ('username', 'email', 'password', 'password_2',)}
        ),
    )
    search_fields = ['username']
    ordering = ['username']
    filter_horizontal = ()