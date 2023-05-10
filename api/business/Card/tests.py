from django.test import TestCase
from django.contrib.auth import get_user_model

# Local imports
from .card import Card
from data.deck.model import Deck
from data.image.model import Image as ImageModel
from .testingVariables import (
    testCreateCardHtml, testUpdateCardHtmlDeleteImage, imageUpdateTest
    )
from business.Image.tests import does_object_exist
from .supermemo2 import Supermemo2

# 3rd Party imports
from bs4 import BeautifulSoup as bs
from urllib import request
from datetime import date, timedelta


SECRET_KEY = "cRm8EOomUSzJMYcXI8/qyTxxqDEsLQDByrN8KuVX"
ACCESS_KEY = "AKIASB57DW2YE4H2JA7E"
REGION = "eu-west-3"
BUCKET = "memory-dev-storage"


class CardTests(TestCase):
    """Tests for the 'Card' business layer module."""

    def setUp(self):
        """Set up test data."""
        User = get_user_model()

        self.user = User.objects.create_user(
            username="test",
            email="whatev.com",
            password="123"
        )

        self.deck = Deck.objects.create(
            title="test",
            description="testing the deck db model",
            owner=self.user
            )

        self.testHtml = testCreateCardHtml

        self.card = Card.create(
            question=self.testHtml, answer=self.testHtml, deck=self.deck
            )

    def test_read_card(self):
        """Test card reading functionality."""
        jsonData = self.card.read()

        urlExample = bs(jsonData['question']).findAll("img")[0]['src']

        response = request.urlopen(urlExample)
        self.assertEqual(response.status, 200)

    def test_udpate_card(self):
        """Test card update functionality."""
        self.card.update(
            {
                "question": testUpdateCardHtmlDeleteImage,
                "answer": self.card.answer + imageUpdateTest
            })

        self.assertEqual(bs(self.card.question).findAll('img'), [])
        self.assertEqual(len(bs(self.card.answer).findAll('img')), 2)

    def test_delete_card(self):
        """Test card delete functionality."""
        images = ImageModel.objects.filter(card=self.card.pk)
        self.card.delete()

        if images:
            self.assertEqual(does_object_exist(images[0].link), False)

    def test_study_card(self):
        """Test the study card functionality."""
        self.card.studyCard(4)
        self.assertEqual(self.card.next_review, Supermemo2().firstReview(4).nextReview)


class SuperMemoTests(TestCase):
    """Class to test the Supermemo module."""

    def setUp(self):
        """Set up test data."""
        self.sm2 = Supermemo2()

    def test_calculate_e_factor(self):
        """Test calculateEfactor function."""
        self.sm2.nextEfactor(4)
        self.assertEqual(self.sm2.Efactor, 2.5 + (0.1-(5-4)*(0.08+(5-4)*0.02)))

    def test_calculate_first_review(self):
        """Test the calculation of the first review."""
        self.sm2.firstReview(2)
        self.assertEqual(self.sm2.interval, 1)
        self.assertEqual(self.sm2.nextReview, date.today())
        self.sm2.firstReview(4)
        self.assertEqual(self.sm2.repetitions, 1)
        self.assertEqual(self.sm2.nextReview, date.today() + timedelta(days=1))

    def test_calculate_next_review(self): 
        """Test the calculation of the next review."""
        self.sm2.calcNextReview(2)
        self.assertEqual(self.sm2.repetitions, 0)
        self.assertEqual(self.sm2.nextReview, date.today())
        self.assertEqual(self.sm2.interval, 1)

        oldinterval = self.sm2.interval
        self.sm2.calcNextReview(5)
        self.assertEqual(self.sm2.repetitions, 1)
        self.assertEqual(self.sm2.interval, oldinterval * self.sm2.Efactor)
        self.assertEqual(
            self.sm2.nextReview,
            date.today() + timedelta(days=self.sm2.interval)
        )
