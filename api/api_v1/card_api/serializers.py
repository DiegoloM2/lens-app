from rest_framework import serializers
from business.Deck.deck import Deck
from business.Card.card import Card

class CardSerializer(serializers.Serializer):
    """A class to serialize a card."""

    question = serializers.CharField()
    answer = serializers.CharField()
    deck = serializers.PrimaryKeyRelatedField(
        queryset=Deck.all_decks(),
        required = False, 
        default = None
    )
    pk = serializers.IntegerField(required = False, default = None, read_only = True)
    next_review = serializers.DateField(required = False, default = None, read_only = True)

    def create(self, validated_data):
        return Card.create(**validated_data)

    def update(self, instance, validated_data):
        newInfo = {
            "question":validated_data['question'],
            "answer":validated_data['answer'], 
        }
        instance.update(newInfo)
        return instance 
