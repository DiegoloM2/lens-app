"""Module that tests all of the User API endpoints."""

# 3rd party imports
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
import json
from datetime import date, timedelta

# Local imports
from data.deck.model import Deck as DeckModel
from data.card.model import Card as CardModel
from business.Card.card import Card


User = get_user_model()


class TestAPIGetCard(APITestCase):
    """Class to test the /users/cards API endpoint."""

    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testing"
            )
        self.deck = DeckModel.objects.create(
            owner = self.user, 
            title = "testing"
        )
        self.card = CardModel.objects.create(
            question = "hey",
            answer = "hey",
            deck = self.deck
        )
        self.url = f"/api/v1/card/{self.card.pk}"
    
    def test_normal_conditions(self):
        """Test getting a card under normal conditions."""
        self.client.login(username=self.user.email, password="testing")
        response = self.client.get(self.url)
        data = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data['question'], self.card.question)
        self.assertEqual(data['answer'], self.card.answer)
        self.assertEqual(data['pk'], self.card.pk)
        self.assertEqual(data['deck'], self.deck.pk)

    def test_not_owner(self):
        """Test getting a card without being the owner of its deck."""
        user = User.objects.create_user(
            username = "test2",
            email = "test2@gmail.com",
            password = "testing"
        )
        self.client.login(username = user.email, password = "testing")

        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_pk_not_exist(self):
        self.client.login(username = self.user.email, password = "testing")
        response = self.client.get("api/v1/card/120")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

class TestApiCreateCard(APITestCase):
    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testing"
            )
        self.deck = DeckModel.objects.create(
            owner = self.user, 
            title = "testing"
        )
        self.card = CardModel.objects.create(
            question = "hey",
            answer = "hey",
            deck = self.deck
        )
        self.url = f"/api/v1/card/{self.deck.pk}"
    
    def test_normal_conditions(self):
        """Test creating a card under normal conditions."""
        self.client.login(username=self.user.email, password="testing")
        card = {
            "question": "cardaasdf",
            "answer": "hey",
            "deck": self.deck.pk
        }
        response = self.client.post(self.url, card)

        card2 = {
            "question": "haskdfj", 
            "deck": self.deck.pk
        }

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(CardModel.objects.filter(question = "cardaasdf").exists())
        newCard = CardModel.objects.filter(question = "cardaasdf").first()
        self.assertEquals(newCard.question, card['question'])
        self.assertEquals(newCard.answer, "hey")
        self.assertEquals(newCard.deck, self.deck)
        
        response = self.client.post(self.url, card2)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

        response = self.client.post(self.url, {"question": "hasdfkl"})
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)


    def test_not_owner(self):
        """Test creating a card without being the owner of its deck."""
        user = User.objects.create_user(
            username = "lkjhl",
            email = "testkjhgiuy@gmail.com",
            password = "testing"
        )
        card = {
            "question": "hey",
            "answer": "hey",
            "deck": self.deck.pk
        }
        self.client.login(username = user.email, password = "testing")

        response = self.client.post(self.url, card)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TestApiUpdateCard(APITestCase):
    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testing"
            )
        self.deck = DeckModel.objects.create(
            owner = self.user, 
            title = "testing"
        )
        self.card = CardModel.objects.create(
            question = "hey",
            answer = "hey",
            deck = self.deck
        )
        self.url = f"/api/v1/card/{self.card.pk}"
    
    def test_normal_conditions(self):
        """Test creating a card under normal conditions."""
        self.client.login(username=self.user.email, password="testing")
        card = {
            "question": "asdf",
            "answer": self.card.answer
        }
        response = self.client.put(self.url, card)

        card2 = {
            "question": "haskdfj", 
            "answer": "whatever the fuck you wanna answer",
            "deck": 6
        }

        self.card = CardModel.objects.get(pk = self.card.pk)

        # Change only the question
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEquals(self.card.question, card['question'])
        
        # Change question and answer with don't allow change in deck.
        response = self.client.put(self.url, card2)
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)



    def test_not_owner(self):
        """Test creating a card without being the owner of its deck."""
        user = User.objects.create_user(
            username = "lkjhl",
            email = "testkjhgiuy@gmail.com",
            password = "testing"
        )
        card = {
            "question": "hey",
            "answer": "hey",
            "deck": self.deck.pk
        }
        self.client.login(username = user.email, password = "testing")

        response = self.client.post(self.url, card)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TestApiDeleteCard(APITestCase):
    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testing"
            )
        self.deck = DeckModel.objects.create(
            owner = self.user, 
            title = "testing"
        )
        self.card = CardModel.objects.create(
            question = "hey",
            answer = "hey",
            deck = self.deck
        )
        self.url = f"/api/v1/card/{self.card.pk}"
    
    def test_normal_conditions(self):
        """Test deleting a card under normal conditions."""
        self.client.login(username=self.user.email, password="testing")
        response = self.client.delete(self.url)

        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(CardModel.objects.filter(pk = self.card.pk).exists())




    def test_not_owner(self):
        """Test deleting a card without being the owner of its deck."""
        user = User.objects.create_user(
            username = "lkjhl",
            email = "testkjhgiuy@gmail.com",
            password = "testing"
        )

        self.client.login(username = user.email, password = "testing")

        response = self.client.delete(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)


class TestApiStudyCard(APITestCase):
    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testing"
            )
        self.deck = DeckModel.objects.create(
            owner = self.user, 
            title = "testing"
        )
        self.card = Card.create(
            question = "hey",
            answer = "hey",
            deck = self.deck
        )
        self.url = f"/api/v1/card/{self.card.pk}/study"
    
    def test_normal_conditions(self):
        """Test deleting a card under normal conditions."""
        self.client.login(username=self.user.email, password="testing")
        payload = {
            "difficulty": 4,
        }
        response = self.client.post(self.url, payload)
        next_review = CardModel.objects.get(pk = self.card.pk).next_review

        self.assertEquals(response.status_code, status.HTTP_204_NO_CONTENT)

        self.card.studyCard(payload['difficulty'])
        self.assertEquals(self.card.next_review, next_review)


    def test_not_owner(self):
        """Test studying a card without being the owner of its deck."""
        user = User.objects.create_user(
            username = "lkjhl",
            email = "testkjhgiuy@gmail.com",
            password = "testing"
        )

        self.client.login(username = user.email, password = "testing")

        response = self.client.post(self.url, {"difficulty": 4})
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
