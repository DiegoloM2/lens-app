"""Class to handle CardModel and serve as gateway between API and db."""

# Django imports
from django.shortcuts import get_object_or_404


# Local imports
from data.card.model import Card as CardModel
from data.image.model import Image as ImageModel
from business.Image.image import Image
from .utils import checkForNewImages, parseImages, storeFormattedImagesInSoup
from .supermemo2 import Supermemo2

# 3rd party imports
from bs4 import BeautifulSoup as bs


class Card:
    """Class to handle CardModel and serve as gateway between API and db."""

    def __init__(self, card):
        """Initialize a 'Card' object from a CardModel instance."""
        self.question = card.question
        self.answer = card.answer
        self.next_review = card.next_review
        self.__modelInstance = card
        self.pk = card.pk
        self.__tt_repeat = card.tt_repeat
        self.__e_factor = card.e_factor
        self.__study_repetitions = card.study_repetitions
        self.deck = card.deck

    def save(self):
        """Save changes made to the Card in the database"""
        self.__modelInstance.question = self.question
        self.__modelInstance.answer = self.answer
        self.__modelInstance.next_review = self.next_review
        self.__modelInstance.pk = self.pk
        self.__modelInstance.tt_repeat = self.__tt_repeat
        self.__modelInstance.e_factor = self.__e_factor
        self.__modelInstance.study_repetitions = self.__study_repetitions
        self.__modelInstance.deck = self.deck
        self.__modelInstance.save()

    @classmethod
    def from_pk(cls, pk):
        """Create a Card instance from its primary key."""
        card = get_object_or_404(CardModel, pk=pk)
        return cls(card)

    @classmethod
    def create(cls, question, answer, deck):
        """Create a card and send all images to s3."""
        question, questionImages = parseImages(question)
        answer, answerImages = parseImages(answer)

        card = CardModel.objects.create(
            question=str(question),
            answer=str(answer),
            deck=deck
            )

        card.question = str(
            storeFormattedImagesInSoup(question, questionImages, card)
            )
        card.answer = str(
            storeFormattedImagesInSoup(answer, answerImages, card)
            )

        card.save()
        return cls(card)

    def read(self):
        """Read a card and return it in json format."""
        question = bs(self.question)
        answer = bs(self.answer)
        for image in question.findAll("img"):
            image['src'] = Image.from_link(image['src']).read()

        for image in answer.findAll("img"):
            image['src'] = Image.from_link(image['src']).read()

        return {
            "question": str(question),
            "answer": str(answer),
            "review": self.next_review,
            "pk":self.pk,
            "deck":self.deck.pk
        }

    def update(self, newCard):
        """Update the card model and respective images it contains."""
        newQuestion, newQuestionImgs = parseImages(newCard['question'])
        newAnswer, newAnswerImgs = parseImages(newCard['answer'])

        self.question = str(checkForNewImages(
                newQuestionImgs,
                newQuestion,
                self.__modelInstance
            ))

        self.answer = str(checkForNewImages(
            newAnswerImgs,
            newAnswer,
            self.__modelInstance
            ))

        self.__modelInstance.question = self.question
        self.__modelInstance.answer = self.answer
        self.__modelInstance.save()

        # Check for image deletions
        cardImages = ImageModel.objects.filter(card=self.__modelInstance)

        for image in cardImages:
            if image.link not in bs(self.question).findAll('img'):
                Image(image).delete()

    def delete(self):
        """Delete a card entry and its respective images."""
        images = ImageModel.objects.filter(card=self.__modelInstance)
        for image in images:
            Image(image).delete()

        self.__modelInstance.delete()

    def studyCard(self, difficulty):
        """Calculate the next review of a card from difficulty of recall."""
        if self.__study_repetitions < 1.0:
            data = Supermemo2().firstReview(difficulty)
            self.__e_factor = data.Efactor
            self.__tt_repeat = data.interval
            self.__study_repetitions = data.repetitions
            self.next_review = data.nextReview
            self.save()
        else:
            data = Supermemo2(
                Efactor=self.__e_factor,
                interval=self.__tt_repeat,
                repetitions=self.__study_repetitions
                ).calcNextReview(difficulty)
            self.__e_factor = data.Efactor
            self.__tt_repeat = data.interval
            self.__study_repetitions = data.repetitions
            self.next_review = data.nextReview
            self.save()
