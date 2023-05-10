"""Module that tests all of the User API endpoints."""

# 3rd party imports
from rest_framework.test import APITestCase
from rest_framework import status
from django.contrib.auth import get_user_model
import json
from datetime import date, timedelta

# Local imports
from business.Deck.deck import Deck
from data.deck.model import Deck as DeckModel
from .serializer import DeckSerializer
from data.card.model import Card as CardModel


User = get_user_model()


class TestApiCreateDeck(APITestCase):
    """Class to test the /users/decks API endpoint."""

    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
            )
    
    def test_only_title(self):
        """Test the creation of a deck only with title."""
        data = {
            "title":"HeyTest",
        }
        self.client.login(username=self.user.email, password="testingUserModel")

        response = self.client.post("/api/v1/deck/", data)
        newDeck = DeckModel.objects.get(title = "HeyTest")

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(newDeck.title, "HeyTest")

    def test_not_logged_in(self):
        """Test the creation of a with an unlogged user."""
        data = {
            "title":"HeyTest",
        }
        # self.client.login(username=self.user.email, password="testingUserModel")

        response = self.client.post("/api/v1/deck/", data)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_with_parent_deck(self):
        """Test the creation of a deck with a parent deck."""
        # Set up data
        testDeck = DeckModel.objects.create(title = "testTemplate", owner = self.user)
        self.client.login(username=self.user.email, password="testingUserModel")

        # Test with a parent_deck
        data = {
            "title":"test",
            "parent_deck":testDeck.pk
        }

        response = self.client.post("/api/v1/deck/", data)

        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        
        createdDeck = DeckModel.objects.get(title = "test")
        self.assertEqual(createdDeck.title, data['title'])
        self.assertEqual(createdDeck.parent_deck, testDeck)

    def test_with_description(self):
        """Test the creation of a deck with a description."""
        self.client.login(username=self.user.email, password="testingUserModel")

        # Test with a parent_deck
        data = {
            "title":"test",
            "description":"Testing"
        }

        response = self.client.post("/api/v1/deck/", data)

        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        
        createdDeck = DeckModel.objects.get(title = "test")
        self.assertEqual(createdDeck.title, data['title'])
        self.assertEqual(createdDeck.description, data['description'])
    
    def test_with_all_options(self):
        """Test the creation of a deck with all options."""
        # Set up data
        testDeck = DeckModel.objects.create(title = "testTemplate", owner = self.user)
        self.client.login(username=self.user.email, password="testingUserModel")

        # Test with a parent_deck
        data = {
            "title":"test",
            "description":"Testing", 
            "parent_deck":testDeck.pk
        }

        response = self.client.post("/api/v1/deck/", data)
        createdDeck = DeckModel.objects.get(title = "test")


        self.assertEquals(response.status_code, status.HTTP_201_CREATED)
        
        self.assertEqual(createdDeck.title, data['title'])
        self.assertEqual(createdDeck.description, data['description'])
        self.assertEqual(createdDeck.parent_deck, testDeck)

    def test_with_parent_deck_not_owner(self):
        """Test the creation of a deck with a parent deck of which you are not the owner."""
        user = User.objects.create_user(
            username="test2",
            email="test2@gmamil.com",
            password="testingUserModel"
            )
        self.client.login(username=user.email, password="testingUserModel")
        testDeck = DeckModel.objects.create(title = "testTemplate", owner = self.user)

        # Test with a parent_deck
        data = {
            "title":"test",
            "description":"Testing", 
            "parent_deck":testDeck.pk
        }

        response = self.client.post("/api/v1/deck/", data)
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)





class TestApiUpdateDeck(APITestCase):
    """Class to test the /users/decks API endpoint."""

    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
            )
        self.deck = DeckModel.objects.create(
            owner = self.user, 
            title = "testing",
            description = "whatever"
        )
        self.url = f"/api/v1/deck/{self.deck.pk}"
    
    def test_change_title(self):
        """Test updating only the title."""
        data = {
            "title":"HeyTest",
        }
        self.client.login(username=self.user.email, password="testingUserModel")

        response = self.client.put(self.url, data)
        deck = Deck.get_by_pk(self.deck.pk)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(deck.title, "HeyTest")

    def test_change_description(self):
        """Test the changing a deck's description."""
        self.client.login(username=self.user.email, password="testingUserModel")

        # Test with a parent_deck
        data = {
            "title":self.deck.title,
            "description":"Testing"
        }

        response = self.client.put(self.url, data)
        deck = Deck.get_by_pk(self.deck.pk)
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEqual(deck.description, data['description'])

    
    def test_change_parent_deck(self):
        """Test the creation of a deck with a parent deck."""
        # Set up data
        testDeck = DeckModel.objects.create(title = "testTemplate", owner = self.user)
        self.client.login(username=self.user.email, password="testingUserModel")

        # Test with a parent_deck
        data = {
            "title":"test",
            "parent_deck":testDeck.pk
        }

        response = self.client.put(self.url, data)
        deck = DeckModel.objects.get(pk=self.deck.pk)

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        self.assertEqual(deck.parent_deck, testDeck)

    
    def test_change_all(self):
        """Test the creation of a deck with all options."""
        # Set up data
        testDeck = DeckModel.objects.create(title = "testTemplate", owner = self.user)
        self.client.login(username=self.user.email, password="testingUserModel")

        # Test with a parent_deck
        data = {
            "title":"test",
            "description":"Testing", 
            "parent_deck":testDeck.pk
        }

        response = self.client.put(self.url, data)
        deck = DeckModel.objects.get(pk = self.deck.pk)

        self.assertEquals(response.status_code, status.HTTP_200_OK)
        
        self.assertEqual(deck.title, data['title'])
        self.assertEqual(deck.description, data['description'])
        self.assertEqual(deck.parent_deck, testDeck)
    
    def test_not_owner(self):
        """Test updating a deck when you are not an owner."""
        user = User.objects.create_user(
            username="test2",
            email="test2@gmamil.com",
            password="testingUserModel"
            )
        self.client.login(username=user.email, password="testingUserModel")

        # Test with a parent_deck
        data = {
            "title":"test",
            "description":"Testing", 
        }

        response = self.client.put(self.url, data)
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)


class TestApiReadDeck(APITestCase):
    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
            )
        self.deck = DeckModel.objects.create(
            owner = self.user, 
            title = "testing",
            description = "whatever"
        )
        self.url = f"/api/v1/deck/{self.deck.pk}"
    
    def test_normal_conditions(self):
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.get(self.url)
        serializer = DeckSerializer(json.loads(response.content))
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(serializer.data['title'], self.deck.title)
        self.assertEqual(serializer.data['description'], self.deck.description)
        self.assertEqual(serializer.data['pk'], self.deck.pk)


    def test_pk_does_not_exist(self):
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.get("/api/v1/deck/10")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_not_logged_in(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_with_parent_deck(self):
        deck = DeckModel.objects.create(
            title = "test2", description = "whatev", parent_deck = self.deck, owner = self.user
            )
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.get(f"/api/v1/deck/{deck.pk}")
        data = json.loads(response.content)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data['title'], deck.title)
        self.assertEqual(data['description'], deck.description)
        self.assertEqual(data['parent_deck'], self.deck.pk)
        self.assertEqual(data['pk'], deck.pk)


class TestApiDeleteDeck(APITestCase):
    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
            )
        self.deck = DeckModel.objects.create(
            owner = self.user, 
            title = "testing",
            description = "whatever"
        )
        self.url = f"/api/v1/deck/{self.deck.pk}"
    
    def test_normal_conditions(self):
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.delete(self.url)
        deckExists = DeckModel.objects.filter(pk = self.deck.pk).exists()

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(deckExists)

    def test_pk_does_not_exist(self):
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.delete("/api/v1/deck/10")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_not_logged_in(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_not_owner(self):
        user = User.objects.create_user(
            username="test2",
            email="test2@gmamil.com",
            password="testingUserModel"
            )
        self.client.login(username=user.email, password="testingUserModel")
        response = self.client.delete(self.url)
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)



class TestGetNextStudyCard(APITestCase):
    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
            )
        self.deck = DeckModel.objects.create(
            owner = self.user, 
            title = "testing",
            description = "whatever"
        )
        self.nextCard = CardModel.objects.create(
            question = "test", 
            answer = "cool testing",
            deck = self.deck)

        CardModel.objects.create(
            question = "test2", 
            answer = "whatev",
            deck = self.deck, 
            next_review = date.today() - timedelta(days = 5)
            )

        
        self.url = f"/api/v1/deck/{self.deck.pk}/study-card"
    
    def test_normal_conditions(self):
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.get(self.url)
        data = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(data['question'], self.nextCard.question)
        self.assertEqual(data['answer'], self.nextCard.answer)
        self.assertEqual(data['pk'], self.nextCard.pk)


    def test_pk_does_not_exist(self):
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.delete("/api/v1/deck/10/study-card")
        self.assertEqual(response.status_code, status.HTTP_405_METHOD_NOT_ALLOWED)
    
    def test_not_logged_in(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_not_owner(self):
        user = User.objects.create_user(
            username="test2",
            email="test2@gmamil.com",
            password="testingUserModel"
            )
        self.client.login(username=user.email, password="testingUserModel")
        response = self.client.get(self.url)
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_no_review_card(self):
        deck = DeckModel.objects.create(
            title = 'testing',
            description = "just a test", 
            owner = self.user
        )
        self.client.login(username = self.user.email, password = "testingUserModel")
        response = self.client.get(f"/api/v1/deck/{deck.pk}/study-card")
        self.assertEquals(response.status_code, status.HTTP_200_OK)
        data = json.loads(response.content)
        self.assertEquals(data, {})

class TestGetAllCards(APITestCase):
    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
            )
        self.deck = DeckModel.objects.create(
            owner = self.user, 
            title = "testing",
            description = "whatever"
        )
        self.cards = [] 
        self.cards.append(CardModel.objects.create(
            question = "test", 
            answer = "cool testing",
            deck = self.deck))

        self.cards.append(CardModel.objects.create(
            question = "test2", 
            answer = "whatev",
            deck = self.deck, 
            next_review = date.today() - timedelta(days = 5)
            ))

        
        self.url = f"/api/v1/deck/{self.deck.pk}/cards"
    
    def test_normal_conditions(self):
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.get(self.url)
        data = json.loads(response.content)
        
        self.assertTrue(len(data) > 0)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        for i, data in enumerate(data):
            self.assertEqual(data['question'], self.cards[i].question)
            self.assertEqual(data['answer'], self.cards[i].answer)
            self.assertEqual(data['pk'], self.cards[i].pk)


    def test_pk_does_not_exist(self):
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.get("/api/v1/deck/10/study-card")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_not_logged_in(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_not_owner(self):
        user = User.objects.create_user(
            username="test2",
            email="test2@gmamil.com",
            password="testingUserModel"
            )
        self.client.login(username=user.email, password="testingUserModel")
        response = self.client.get(self.url)
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)



    



class TestGetSubDecks(APITestCase):
    def setUp(self):
        """Set up all the testing data."""
        self.user = User.objects.create_user(
            username="test",
            email="test@gmamil.com",
            password="testingUserModel"
            )
        self.deck = DeckModel.objects.create(
            owner = self.user, 
            title = "testing",
            description = "whatever"
        )
        self.decks: list[Deck] = [] 
        self.decks.append(Deck.create(
            user = self.user,
            title = "test", 
            description = "cool testing",
            parent_deck = self.deck))

        self.decks.append(Deck.create(
            user = self.user,
            title = "test2", 
            description = "whatev",
            parent_deck = self.deck, 
            ))

        
        self.url = f"/api/v1/deck/{self.deck.pk}/sub-decks"
    
    def test_normal_conditions(self):
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.get(self.url)
        data = json.loads(response.content)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        deckInList = len(data)*[False]
        for i, data in enumerate(data):
            deck = Deck.get_by_pk(data['pk'])
            for d in self.decks:
                if (deck.pk == d.pk):
                    deckInList[i] = True
                    break

        for isIn in deckInList:
            self.assertTrue(isIn)
    def test_pk_does_not_exist(self):
        self.client.login(username=self.user.email, password="testingUserModel")
        response = self.client.get("/api/v1/deck/10098/study-card")
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
    
    def test_not_logged_in(self):
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
    
    def test_not_owner(self):
        user = User.objects.create_user(
            username="test2",
            email="test2@gmamil.com",
            password="testingUserModel"
            )
        self.client.login(username=user.email, password="testingUserModel")
        response = self.client.get(self.url)
        self.assertEquals(response.status_code, status.HTTP_403_FORBIDDEN)
