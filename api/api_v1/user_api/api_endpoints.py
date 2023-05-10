"""All of the application-specific user API endpoints."""
# 3rd party imports
from api_v1.permissions.permissions import IsOwner
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions

# Local imports
from business.User.user import User


class GetUserDecks(APIView):
    permission_classes = (permissions.IsAuthenticated, IsOwner,)

    """An API endpoint to get all of a user's decks."""
    def get(self, request, format=None):
        """Return all users."""
        return Response(User(request.user).getUserDecks())

class DeleteUserDecks(APIView):
    permission_classes = (permissions.IsAuthenticated, IsOwner, )
    """An API endpoint to delete a user."""
    def delete(self, request, format=None):
        """Delete a user."""
        return Response(User(request.user).delete())
