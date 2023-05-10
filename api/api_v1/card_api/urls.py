"""API endpoints for the user model."""

from django.urls import path
from .views import CardCRUD, StudyCard

urlpatterns = [
    path('card/<int:pk>', CardCRUD.as_view(), name="createCard"),
    path('card/', CardCRUD.as_view(), name="createCard"),
    path('card/<int:pk>/study', StudyCard.as_view(), name = "studyCard"),
]
