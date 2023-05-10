
"""A module to test the 'Deck' B_layer module."""

# Django imports
from django.test import TestCase
from django.contrib.auth import get_user_model


# Local imports
from .deck import Deck
from business.Card.card import Card
from data.deck.model import Deck as DeckModel

# 3rd party imports
from datetime import date


class DeckTests(TestCase):
    """Test the 'Deck' B_layer module."""

    def setUp(self):
        """Set up test data."""
        User = get_user_model()

        self.user = User.objects.create_user(
            username="test",
            email="whatev@gmail.com",
            password="123",
        )

        self.deck = Deck.create(
            'Testing', self.user, "Testing the create method")

    def test_create_deck(self):
        """Test create deck function."""
        self.assertEqual(self.deck.title, 'Testing')
        self.assertEqual(self.deck.description, 'Testing the create method')

    def test_read_deck(self):
        """Test read deck function."""
        jsonDeck = self.deck.read()
        self.assertEqual(jsonDeck['title'], self.deck.title)
        self.assertEqual(jsonDeck['description'], self.deck.description)

    def test_update_deck(self):
        """Test update deck function."""
        newDeck = DeckModel.objects.create(title = "hey", description = "testing", owner = self.user)
        self.deck.update("Testing Update", "1", newDeck)

        self.assertEqual(self.deck.parent_deck, newDeck)
        self.assertEqual(self.deck.title, "Testing Update")
        self.assertEqual(self.deck.description, "1")

    def test_getNextStudyCard(self):
        """Test get next study card function."""
        Card.create("question", "answer", self.deck)
        card = self.deck.getNextStudyCard()
        self.assertLessEqual(date.today(), card['review'])

    def test_get_subdecks(self):
        """Test get subdecks function."""
        subDeck = Deck.create(
            title="title", description="description",
            user=self.user, parent_deck=self.deck)

        subdecks = self.deck.getSubDecks()
        self.assertTrue(subDeck.read() in subdecks)

    def test_delete_deck(self):
        """Test deck delete function."""
        self.deck.delete()
