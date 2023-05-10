"""A module to test the registration api endpoints."""
# 3rd party imports
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model


User = get_user_model()


class TestRegistration(APITestCase):
    """A class to test the /registration api endpoint."""

    def setUp(self):
        """Set up the test data."""
        self.register_data = {
            "username": "testing",
            "email": "testing@gmail.com",
            "password1": "whatevingas1029348",
            "password2": "whatevingas1029348"
        }

    def login(self, client, username):
        """Login a test user."""
        user = User.objects.get(username=username)
        return client.login(username=user.email, password="whatevingas1029348")

    def test_register_ok(self):
        """Test with correct data."""
        response = self.client.post(
            "/api/v1/registration/",
            self.register_data
        )
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(
            self.login(self.client, self.register_data['username']),
            True
            )

    def test_register_with_different_passwords(self):
        """Test register with two different passwords."""
        register_data = self.register_data
        register_data['password2'] = "different"
        response = self.client.post(
            "/api/v1/registration/",
            register_data
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_with_wrong_password(self):
        """Test register with a wrong password."""
        register_data = self.register_data
        register_data['password1'] = "testing"
        register_data['password2'] = "testing"
        response = self.client.post(
            "/api/v1/registration/",
            register_data
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_register_with_wrong_email(self):
        """Test register with a wrong password."""
        register_data = self.register_data
        register_data['email'] = "not-an-email"
        response = self.client.post(
            "/api/v1/registration/",
            register_data
        )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
