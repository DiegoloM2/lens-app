"""A module to design custom permissions for the deck API."""

# 3rd party imports.
from rest_framework import permissions

# Local imports.


class IsOwner(permissions.BasePermission):
    """Permission given only to the owner of a deck."""

    def has_object_permission(self, request, view, obj):
        """Return true if the request user is the owner of the deck."""
        return obj.owner == request.user

class IsOwnerOfDeck(permissions.BasePermission):
    """Permission given only to the owner of a card's deck."""

    def has_object_permission(self, request, view, obj):
        """Return true if the request user is the owner of the deck."""
        return obj.deck.owner == request.user
