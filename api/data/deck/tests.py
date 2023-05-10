from django.test import TestCase
from django.contrib.auth import get_user_model
from .model import Deck


class DeckModelTests(TestCase):
    def setUp(self): 
        User = get_user_model()

        self.user = User.objects.create_user(
            username = "test", 
            email = "whatev.com", 
            password = "123"
        )

        self.deck = Deck.objects.create(title = "test", description = "testing the deck db model", owner = self.user)

    def test_change_title(self): 
        self.deck.title = "new"
        self.deck.save()
        self.assertEqual(self.deck.title, "new")
        
    def test_change_description(self):
        self.deck.description = "new description"
        self.deck.save()
        self.assertEqual(self.deck.description, "new description") 

    def test_create_subdeck(self): 
        self.sub_deck = Deck.objects.create(title = "sub deck",
         description = "testing sub deck", 
         owner = self.user, parent_deck = self.deck)

        self.assertEqual(self.sub_deck.title, "sub deck")
        self.assertEqual(self.sub_deck.description, "testing sub deck")
        self.assertEqual(self.sub_deck.owner, self.user)
        self.assertEqual(self.sub_deck.parent_deck, self.deck)

    def test_delete_deck(self):
        self.deck.delete()