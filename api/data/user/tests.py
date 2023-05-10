from django.test import TestCase
from django.contrib.auth import get_user_model



class UserModelTests(TestCase):
    def setUp(self): 
            
        User = get_user_model()

        self.user = User.objects.create_user(
            username = "test", 
            email = "whatev@gmail.com", 
            password = "123"
        )

    def test_change_email(self): 
        self.user.email = "test_change@gmail.com"
        self.user.save()
        self.assertEqual(self.user.email, "test_change@gmail.com")

    def test_change_username(self):
        self.user.username = 'test_change'
        self.user.save()
        self.assertEqual(self.user.username, "test_change")