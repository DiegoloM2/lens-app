"""API endpoints for the user model."""

from django.urls import path
from .views import DeckCRUD, GetNextStudyCard, GetAllCards, GetSubDecks

urlpatterns = [
    path('deck/<int:pk>', DeckCRUD.as_view(), name="createDeck"),
    path('deck/', DeckCRUD.as_view(), name="createDeck"),
    path('deck/<int:pk>/study-card', GetNextStudyCard.as_view(), name = "nextStudyCard"),
    path('deck/<int:pk>/cards', GetAllCards.as_view(), name = "getAllCards"),
    path("deck/<int:pk>/sub-decks", GetSubDecks.as_view(), name = "getSubDecks" )
]
