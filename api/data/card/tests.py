from django.test import TestCase
from django.contrib.auth import get_user_model

#Local imports
from .model import Card
from data.deck.model import Deck

class CardModelTests(TestCase):
    def setUp(self): 
        User = get_user_model()

        self.user = User.objects.create_user(
            username = "test", 
            email = "whatev.com", 
            password = "123"
        )

        self.deck = Deck.objects.create(title = "test", description = "testing the deck db model", owner = self.user)
        self.card = Card.objects.create(question = "testing", answer = "testing", deck = self.deck )

    def test_change_card(self): 
        test_string = "testing 2"
        self.card.question = test_string
        self.card.answer = test_string
        self.card.save()
        self.assertEqual(self.card.question, test_string)
        self.assertEqual(self.card.answer, test_string)