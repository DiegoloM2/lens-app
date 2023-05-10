"""A user model module that requires the user model to input email."""

# Django imports
from django.db import models
from django.contrib.auth.models import AbstractBaseUser

# Local imports
from .manager import UserManager


class User(AbstractBaseUser):
    """A user model class that requires the user model to input email.

    ::field username - required
    ::field email - required
    ::field password - required
    """

    objects = UserManager()

    username = models.CharField(unique=True, blank=False, max_length=200)
    email = models.EmailField(
        verbose_name='email address',
        max_length=255,
        unique=True,
    )
    is_active = models.BooleanField(default=True)
    staff = models.BooleanField(default=False)  # a admin user; non super-user
    admin = models.BooleanField(default=False)  # a superuser

    # notice the absence of a "Password field", that is built in.

    # User & Password are required by default
    USERNAME_FIELD = 'username'

    # Make email required.
    REQUIRED_FIELDS = ['email']

    def get_full_name(self):
        # The user is identified by their email address
        return self.username

    def get_short_name(self):
        # The user is identified by their email address
        return self.username

    def __str__(self):
        return self.username

    def has_perm(self, perm, obj=None):
        """Does the user have a specific permission?"""
        # Simplest possible answer: Yes, always
        return True

    def has_module_perms(self, app_label):
        """Check if user have permissions to view the app `app_label`."""
        # Simplest possible answer: Yes, always
        return True

    @property
    def is_staff(self):
        """Check whether user member of stuff."""
        return self.staff

    @property
    def is_admin(self):
        """Check whether user is admin member."""
        return self.admin
