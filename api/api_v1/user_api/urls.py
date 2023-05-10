"""API endpoints for the user model."""

from django.urls import path
from .api_endpoints import GetUserDecks, DeleteUserDecks

urlpatterns = [
    path('accounts/user/decks/', GetUserDecks.as_view(), name="getUserDecks"),
    path('accounts/user/delete/', DeleteUserDecks.as_view(), name = "deleteUser"),
]
