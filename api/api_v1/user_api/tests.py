"""Module that tests all of the User API endpoints."""

# 3rd party imports
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

# Local imports
from business.Deck.deck import Deck
from .test_password_reset import TestPasswordReset
from .registration_tests import TestRegistration

User = get_user_model()


class TestGetUserDecks(APITestCase):
    """Class to test the /users/decks API endpoint."""

    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
            )

    def test_logged_in(self):
        """Test the /users/deck/ endpoint with logged in user with no decks."""
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.get("/api/v1/accounts/user/decks/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_not_logged_in(self):
        """Test the /users/deck/ endpoint without user."""
        response = self.client.get("/api/v1/accounts/user/decks/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_with_decks(self):
        """Test the /users/deck/ endpoint for a user with decks."""
        self.client.force_authenticate(self.user)
        deck = Deck.create("test", self.user)
        response = self.client.get("/api/v1/accounts/user/decks/")
        self.assertEqual(response.data[0], deck.read())


class TestUserLogin(APITestCase):
    """Class to test the /accounts/login/ API endpoint."""

    def setUp(self):
        """Set up the test data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
            )
        self.token = Token.objects.create(user=self.user)

    def test_correct_credentials(self):
        """Test logging  in the users with correct credentials."""
        data = {
            "username": "test",
            "email": "test@gmamil.com",
            "password": "testingUserModel"
        }
        response = self.client.post(
            "/api/v1/accounts/login/", data
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual('key' in response.data.keys(), True)

    def test_incorrect_credentials(self):
        """Test logging in the users with incorrect credentials."""
        data = {
            "username": "whatever",
            "email": "whatever@gmail.com",
            "password": "whatev"
        }
        response = self.client.post(
            "/api/v1/accounts/login/", data
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_without_user(self):
        """Test logging in with email, without username."""
        data = {
            "email": "test@gmamil.com",
            "password": "testingUserModel"
        }
        response = self.client.post(
            "/api/v1/accounts/login/", data
            )
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual('key' in response.data.keys(), True)

    def test_login_without_email(self):
        """Test logging in with username, without email."""
        data = {
            "username": self.user.username,
            "password": "testingUserModel"
        }
        response = self.client.post(
            "/api/v1/accounts/login/", data
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_without_password(self):
        """Test logging in without a password."""
        data = {
            "username": self.user.username,
            "email":self.user.email,
        }
        response = self.client.post(
            "/api/v1/accounts/login/", data
            )
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


class TestUserLogout(APITestCase):
    """A class to test a user loggging out."""

    def setUp(self):
        """Set up the test data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
        )

    def test_logout_user(self):
        """Test logging out a session with a user."""
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.post("/api/v1/accounts/logout/", {})
        self.assertEqual(response.status_code, status.HTTP_200_OK)


class TestGetUser(APITestCase):
    """A class to test the /accounts/user/ endpoint."""

    def setUp(self):
        """Set up the test data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
        )

    def test_with_user(self):
        """Test the endpoint with a user in session."""
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.get("/api/v1/accounts/user/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data,
            {
                "pk": self.user.pk,
                "username": self.user.username
            }
        )
    
    def test_wihtout_user(self):
        """Testing the endpoint without a user."""
        response = self.client.get("/api/v1/accounts/user/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

class TestDeleteUser(APITestCase):
    """A class to test the /accounts/user/ endpoint."""

    def setUp(self):
        """Set up the test data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
        )

    def test_owner(self):
        """Test the endpoint with logged in user in session."""
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.delete("/api/v1/accounts/user/delete/")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
    
    def test_not_logged_in(self):
        """Testing the endpoint without a user."""
        response = self.client.delete("/api/v1/accounts/user/delete/")
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    