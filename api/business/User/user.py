"""Module that serves as gateway between API and User table in db."""
from business.Deck.deck import Deck
from data.deck.model import Deck as DeckModel
from django.contrib.auth import get_user_model

UserModel = get_user_model()

class User:
    """Class that serves as gateway between API and user table in db."""

    def __init__(self, user):
        """Initialize this class from a user model instance."""
        self.username = user.username
        self.email = user.email
        self.pk = user.pk
        self.__modelInstance = user

    def getUserDecks(self):
        """Get all of the user's decks."""
        deckModelInstances = DeckModel.objects.filter(
            owner=self.__modelInstance)
        decks = []
        for deckModelInstance in deckModelInstances:
            decks.append(Deck(deckModelInstance).read())
        return decks

    @staticmethod
    def all_users():
        """Get all the users."""
        return UserModel.objects.all()
    
    def delete(self):
        """Delete a user"""
        self.__modelInstance.delete()
