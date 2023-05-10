# Django Imports
from django.contrib.auth import get_user_model

# 3rd party imports
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework.response import Response
from rest_framework import status


# Local Imports
from ..permissions.permissions import IsOwner
from .serializer import DeckSerializer
from business.Deck.deck import Deck

User = get_user_model()



class DeckCRUD(APIView):
    # Require token authentication
    # Write permissions
    permission_classes = (permissions.IsAuthenticated, IsOwner)
    # authentication_classes = [authentication.TokenAuthentication, ]
    
    def get(self, request, pk):
        deck = Deck.get_by_pk(pk)
        self.check_object_permissions(self.request, deck)
        data = DeckSerializer(instance=deck, context={"request": request})
        return Response(data.data, status.HTTP_200_OK)


    def post(self, request):
        """Create a new deck."""
        data = DeckSerializer(data = request.data, context={"request": request})
        if data.is_valid():
            if data.validated_data['parent_deck'] is not None:
                self.check_object_permissions(self.request, data.validated_data['parent_deck'])
            data.save()
        else: 
            return Response({}, status.HTTP_400_BAD_REQUEST)
        return Response({}, status.HTTP_201_CREATED)

    def put(self, request, pk):
        """Update an existing deck."""
        deck = Deck.get_by_pk(pk)
        self.check_object_permissions(self.request, deck)
        deck = Deck.get_by_pk(pk)
        data = DeckSerializer(data = request.data, instance=deck, context={"request": request})
        if data.is_valid():
            data.save()
        else: 
            return Response(data.errors, status.HTTP_400_BAD_REQUEST)
        return Response({}, status.HTTP_200_OK)
    
    def delete(self, request, pk):
        """Delete a deck by pk."""
        deck = Deck.get_by_pk(pk)
        self.check_object_permissions(self.request, deck)
        deck.delete()
        return Response({}, status.HTTP_204_NO_CONTENT)


class GetNextStudyCard(APIView):
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get(self, request, pk):
        deck = Deck.get_by_pk(pk)
        self.check_object_permissions(self.request, deck)
        return Response(deck.getNextStudyCard(), status.HTTP_200_OK)

class GetAllCards(APIView):
    permission_classes = (permissions.IsAuthenticated, IsOwner)

    def get(self, request, pk):
        deck: Deck = Deck.get_by_pk(pk)
        self.check_object_permissions(self.request, deck)
        return Response(deck.getDeckCards())

    
class GetSubDecks(APIView):
    """Get all the subdecks of a main deck."""

    permission_classes = (permissions.IsAuthenticated, IsOwner)
    
    def get(self, request, pk):
        deck: Deck = Deck.get_by_pk(pk)
        self.check_object_permissions(self.request, deck)
        return Response(deck.getSubDecks(), status = status.HTTP_200_OK)