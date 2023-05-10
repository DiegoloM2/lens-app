from django.urls import path
from .user_api.urls import urlpatterns as userUrls
from .deck_api.urls import urlpatterns as deckUrls
from .card_api.urls import urlpatterns as cardUrls

urlpatterns = [
] + userUrls + deckUrls + cardUrls
