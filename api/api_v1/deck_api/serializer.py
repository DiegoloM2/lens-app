from rest_framework import serializers
from business.User.user import User
from business.Deck.deck import Deck

class DeckSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=200)
    description = serializers.CharField(required=False, default=None)
    parent_deck = serializers.PrimaryKeyRelatedField(
        queryset=Deck.all_decks(),
        required = False, 
        default = None
    )
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    pk = serializers.IntegerField(required = False, default = None, read_only = True)

    def create(self, validated_data):
        return Deck.create(**validated_data)

    def update(self, instance, validated_data):
        newInfo = {
            "title":validated_data['title'],
            "description":validated_data['description'], 
            "parent_deck":validated_data['parent_deck'],
        }
        instance.update(**newInfo)
        return instance 

    
