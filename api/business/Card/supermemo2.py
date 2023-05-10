"""A module to handle all the space repetition logic for cards."""
from datetime import date, timedelta


class Supermemo2():
    """A class to handle all the space repetition logic for cards.

    This class makes use of the supermemo2 algorithm for spaced repetition.
    """

    def __init__(self, repetitions=0, interval=1, nextReview=date.today(), Efactor=2.5):
        """Initialize supermemo2 object with default parameters."""
        self.repetitions = repetitions
        self.interval = interval
        self.nextReview = nextReview
        self.Efactor = Efactor

    def firstReview(self, quality):
        """Calculate the next review date for the first review of a card."""
        if quality > 3:
            self.repetitions += 1
            self.interval = 1
            self.nextReview = date.today() + timedelta(days=1)
        else:
            self.interval = 1
            self.nextReview = date.today()

        self.nextEfactor(quality)

        return self

    def calcNextReview(self, quality):
        """Calculate next review date considering difficulty of recall."""
        if quality < 3:
            self.repetitions = 0
            self.nextReview = date.today()
            self.interval = 1
        elif quality < 4:
            self.repetitions += 1
            self.nextReview = date.today()
            self.nextEfactor(quality)
            self.interval = self.interval * self.Efactor
        else:
            self.repetitions += 1
            self.nextEfactor(quality)
            self.interval = self.interval * self.Efactor
            self.nextReview = date.today() + timedelta(days=self.interval)
        return self

    def nextEfactor(self, q):
        """Calculate the next E factor.

        The Efactor is a factor that is crucial for the correct
        functioning of the SM2 algo and it is always changing.
        """
        self.Efactor = self.Efactor + (0.1-(5-q)*(0.08+(5-q)*0.02))
        if self.Efactor < 1.3:
            self.Efactor = 1.3
