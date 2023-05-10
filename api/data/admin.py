from django.contrib import admin
from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

# Local Imports
from .deck.model import Deck
from .card.model import Card
from .user.admin import UserAdmin 


# Register your models here.

#Register the deck
admin.site.register(Deck)
admin.site.register(Card)

#Register custom user model
admin.site.register(get_user_model(), UserAdmin)


# Remove Group Model from admin. We're not using it.
admin.site.unregister(Group)

