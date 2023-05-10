from django.db import models

#For unique id string creation: 
import uuid


# Image Model.
class Image(models.Model): 
    link = models.URLField(null = True, blank = True)
    id = models.UUIDField(
        primary_key = True, 
        default = uuid.uuid4, 
        editable = False
    )
    card = models.ForeignKey('Card', on_delete=models.CASCADE, null = False, blank = False)