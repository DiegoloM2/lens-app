from django.db import models
from django.conf import settings
# Deck Model.
class Deck(models.Model): 
    title = models.CharField(max_length = 200, blank = False)
    description = models.TextField(blank = True, null = True, help_text = "Describe the deck")

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete = models.CASCADE)

    parent_deck = models.ForeignKey('Deck', blank = True, null = True, on_delete = models.CASCADE)

    #Help text for the admin page
    def __str__(self): 
        return f"{self.title} - {self.owner}"
