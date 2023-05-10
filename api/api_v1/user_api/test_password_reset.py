from django.core import mail
from django.utils.encoding import force_str
from django.urls import reverse
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase
from rest_framework import status

User = get_user_model()


class TestPasswordReset(APITestCase):
    """A class to test the password reset functionality."""

    def setUp(self):
        """Set up the test data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
        )

        self.newPassword = "testNewPassword"

    def _generate_uid_and_token(self, user):
        result = {}
        if 'allauth' in settings.INSTALLED_APPS:
            from allauth.account.forms import default_token_generator
            from allauth.account.utils import user_pk_to_url_str
            result['uid'] = user_pk_to_url_str(user)
        else:
            from django.utils.encoding import force_bytes
            from django.contrib.auth.tokens import default_token_generator
            from django.utils.http import urlsafe_base64_encode
            result['uid'] = urlsafe_base64_encode(force_bytes(user.pk))
        result['token'] = default_token_generator.make_token(user)
        return result

    def test_password_reset(self):
        """Test resetting the password."""
        password_reset_url = reverse('rest_password_reset')

        # call password reset
        mail_count = len(mail.outbox)
        payload = {'email': self.user.email}
        response = self.client.post(password_reset_url, data=payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(mail.outbox), mail_count + 1)

        url_kwargs = self._generate_uid_and_token(self.user)
        url = reverse('rest_password_reset_confirm')

        # wrong token
        data = {
            'new_password1': self.newPassword,
            'new_password2': self.newPassword,
            'uid': force_str(url_kwargs['uid']),
            'token': '-wrong-token-',
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # wrong uid
        data = {
            'new_password1': self.newPassword,
            'new_password2': self.newPassword,
            'uid': '-wrong-uid-',
            'token': url_kwargs['token'],
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # wrong token and uid
        data = {
            'new_password1': self.newPassword,
            'new_password2': self.newPassword,
            'uid': '-wrong-uid-',
            'token': '-wrong-token-',
        }
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        # valid payload
        data = {
            'new_password1': self.newPassword,
            'new_password2': self.newPassword,
            'uid': force_str(url_kwargs['uid']),
            'token': url_kwargs['token'],
        }
        url = reverse('rest_password_reset_confirm')
        response = self.client.post(url, data=data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

        payload = {
            "email": self.user.email,
            "username": self.user.username,
            "password": self.newPassword,

        }
        response = self.client.post('/api/v1/accounts/login/', data=payload)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
