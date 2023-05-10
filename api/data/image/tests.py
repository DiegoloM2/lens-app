from django.test import TestCase
from django.contrib.auth import get_user_model

#Local imports
from data.card.model import Card
from data.deck.model import Deck
from .model import Image

class CardModelTests(TestCase):
    def setUp(self): 
        User = get_user_model()

        self.user = User.objects.create_user(
            username = "test", 
            email = "whatev.com", 
            password = "123"
        )

        self.test_url = "https://metro.co.uk/wp-content/uploads/2017/07/pri_47292953.jpg?quality=90&strip=all&crop=0px%2C107px%2C2500px%2C1314px&resize=1200%2C630"

        self.deck = Deck.objects.create(title = "test", description = "testing the deck db model", owner = self.user)
        self.card = Card.objects.create(question = "testing", answer = "testing", deck = self.deck )
        self.image = Image.objects.create(card = self.card, link = self.test_url)

    def test_create_image(self): 
        self.assertEqual(self.image.link, self.test_url )