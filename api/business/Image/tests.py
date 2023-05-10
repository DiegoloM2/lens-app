"""Unit tests for the 'Image' business layer module."""

# Django imports
from django.test import TestCase
from django.contrib.auth import get_user_model

# Local imports
from .image import Image
from data.deck.model import Deck
from data.card.model import Card as CardModel
from .testingVariables import testCreateImageImage

# 3rd Party imports
from bs4 import BeautifulSoup as bs
from urllib import request
import boto3


SECRET_KEY = "cRm8EOomUSzJMYcXI8/qyTxxqDEsLQDByrN8KuVX"
ACCESS_KEY = "AKIASB57DW2YE4H2JA7E"
REGION = "eu-west-3"
BUCKET = "memory-dev-storage"


class ImageTests(TestCase):
    """A class to unit test the Image module."""

    def setUp(self):
        """Set up data for the tests."""
        User = get_user_model()
        self.user = User.objects.create_user(
            username="test",
            email="whatev.com",
            password="123",
        )

        self.deck = Deck.objects.create(
                        title="test",
                        description="testing the deck db model",
                        owner=self.user
                    )
        self.card = CardModel.objects.create(
            deck=self.deck, question="hai", answer="hai"
            )

        self.image = Image.create(
            bs(testCreateImageImage).findAll('img')[0],
            self.card
            )

    def test_create_image_from_link(self):
        """Test @classmethod create_image_from_link."""
        Image.from_link(self.image.link).read()

    def test_read_image(self):
        """Test read image method."""
        url = Image.from_link(self.image.link).read()

        # Test the url with urllib
        response = request.urlopen(url)
        self.assertEqual(response.status, 200)

    def test_delete_image(self):
        """Test deleting image in both database and S3."""
        self.image.delete()
        self.assertEqual(
            does_object_exist(BUCKET, ACCESS_KEY, SECRET_KEY, self.image.link),
            False
            )


def does_object_exist(bucket, access_key, secret_key, obj):
    """Check whether an object exists in an s3 bucket."""
    s3 = boto3.client(
                's3',
                aws_access_key_id=access_key,
                aws_secret_access_key=secret_key
            )
    result = s3.list_objects_v2(Bucket=bucket, Prefix=obj)

    if 'Contents' in result:
        return True
    else:
        return False
