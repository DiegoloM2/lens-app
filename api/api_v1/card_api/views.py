"""A module to add CRUD functionality for cards in the REST API."""


# 3rd party modules
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import authentication, permissions
from rest_framework import status

# Local imports
from business.Card.card import Card
from .serializers import CardSerializer
from api_v1.permissions.permissions import IsOwner
from business.Deck.deck import Deck


class CardCRUD(APIView):
    """A class to create, update, and delete cards through the Api."""

    permission_classes = (permissions.IsAuthenticated, )
    # authentication_classes = [authentication.TokenAuthentication, ]

    def isOwner(self, request, deck):
        return IsOwner().has_object_permission(request, self, deck)
    
    def get(self, request, pk):
        card = Card.from_pk(pk)
        if self.isOwner(request, self,card.deck):
            data = CardSerializer(instance=card)
            return Response(data.data, status.HTTP_200_OK)
        else:
            return Response({}, status.HTTP_403_FORBIDDEN)

    def post(self, request, pk):
        deck = Deck.get_by_pk(pk)
        if self.isOwner(request, deck):
            data = CardSerializer(data = request.data, context={"request": request})
            if data.is_valid():
                data.save()
                return Response({}, status.HTTP_201_CREATED)
            else: 
                return Response({}, status.HTTP_400_BAD_REQUEST)
        else: 
            return Response({}, status.HTTP_403_FORBIDDEN)

    def put(self, request, pk):
        card = Card.from_pk(pk)
        if self.isOwner(request, card.deck):
            
            data = CardSerializer(instance = card, data = request.data)
            if data.is_valid():
                data.save()
            else: 
                return Response(data.errors, status.HTTP_400_BAD_REQUEST)
            return Response({}, status.HTTP_200_OK)
        else: 
            return Response({}, status.HTTP_403_FORBIDDEN)
        
    def delete(self, request, pk):
        card = Card.from_pk(pk)
        if self.isOwner(request, card.deck):
            card.delete()
            return Response({}, status.HTTP_204_NO_CONTENT)
        else: 
            return Response({}, status.HTTP_403_FORBIDDEN)


class StudyCard(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    def post(self, request, pk):
        card = Card.from_pk(pk)
        if IsOwner().has_object_permission(request, self, card.deck):
            card.studyCard(int(request.data['difficulty'][0]))
            return Response({}, status.HTTP_204_NO_CONTENT)

        else: 
            return Response({}, status.HTTP_403_FORBIDDEN)
            

