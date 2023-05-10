from django.db import models
from datetime import date

# Card Model.
class Card(models.Model): 
    question = models.TextField(blank = False)
    answer = models.TextField(blank = True, null = True)
    deck = models.ForeignKey('Deck', on_delete = models.CASCADE)

    #Algo Parameters
    tt_repeat = models.IntegerField(default = 0)
    next_review = models.DateField(default = date.today)
    e_factor = models.FloatField(default = -1.0)
    study_repetitions = models.IntegerField(default = 0)


    #Help text for the admin page
    def __str__(self): 
        return f"{self.question} - {self.deck.title} "
