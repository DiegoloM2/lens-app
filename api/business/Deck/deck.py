"""Module that serves as gateway between API and database for 'Deck' model."""

# Local imports
from data.deck.model import Deck as DeckModel
from data.card.model import Card as CardModel
from business.Card.card import Card
from django.shortcuts import get_object_or_404

# 3rd party imports
from datetime import date


class Deck:
    """Class to serve as gateway between API and Deck table in database."""

    def __init__(self, deck):
        """Initialize deck values."""
        self.title = deck.title
        self.description = deck.description
        self.parent_deck = deck.parent_deck
        self.owner = deck.owner
        self.pk = deck.pk
        self.__modelInstance = deck

    @classmethod
    def create(cls, title, user, description=None, parent_deck=None):
        """Create a new deck."""
        deckInstance = None
        if parent_deck:
            deckInstance = DeckModel.objects.create(
                title=title,
                owner=user,
                description=description,
                parent_deck_id=parent_deck.pk)
        else:
            deckInstance = DeckModel.objects.create(
                title=title, owner=user, description=description)

        return cls(deckInstance)

    def read(self):
        """Get the deck in dictionary format."""
        return {
            "title": self.title,
            "description": self.description,
            "pk": self.pk,
        }

    def save(self):
        """Save the chitself.Let's say you want to assign a profile ...anges made to the 'Deck' class to the database."""
        self.__modelInstance.title = self.title
        self.__modelInstance.owner = self.owner
        self.__modelInstance.description = self.description
        self.__modelInstance.parent_deck = self.parent_deck
        self.__modelInstance.save()

    def update(self, title = None, description = None, parent_deck = None):
        """Update the deck and save it."""
        if title is not None:
            self.title = title
        if description is not None:
            self.description = description
        if parent_deck is not None:
            self.parent_deck = parent_deck
        self.save()

    def delete(self):
        """Delete the deck and its respective cards and images."""
        cards = CardModel.objects.filter(deck=self.__modelInstance)
        for card in cards:
            Card(card).delete()
        self.__modelInstance.delete()

    def getNextStudyCard(self):
        """Get the next card to be studied in this deck."""
        card = CardModel.objects.filter(
            deck=self.__modelInstance,
            next_review__lte=date.today()
            ).first()
        if card:
            return Card(card).read()
        else:
            return {}

    def getSubDecks(self):
        """Get all the child decks of this deck."""
        subDecks = DeckModel.objects.filter(parent_deck=self.__modelInstance)
        result = []
        for deck in subDecks:
            result.append(Deck(deck).read())
        return result

    def getDeckCards(self):
        """Get all the deck's cards."""
        cards = CardModel.objects.filter(deck=self.__modelInstance)
        result = []
        for card in cards:
            result.append(Card(card).read())
        return result

    @staticmethod
    def all_decks():
        return DeckModel.objects.all()

    @classmethod
    def get_by_pk(cls, pk:int):
        """Get a deck by primary key."""
        return cls(get_object_or_404(DeckModel, pk = pk))
