"""Util functions for the Card model."""
# Local imports
from business.Image.image import Image

# 3rd party imports
from bs4 import BeautifulSoup as bs
import copy


def storeFormattedImagesInSoup(soupText, rawImgs, card):
    """
    Store raw base64 images in a formatted manner in a soup data structure.

    ::param soupText - text where formatted images are stored.
    ::param rawImgs - images in raw base 64 format.
    ::param card - card model instance to which image is linked.
    """
    for rawImg, formattedImage in zip(rawImgs, soupText.findAll('img')):
        image = Image.create(rawImg, card)
        formattedImage['src'] = image.link

    return soupText


def parseImages(htmlText):
    """Find images in a html file and format them if they are in raw base64."""
    soup = bs(htmlText)

    # Variable to modify soup
    origImages = soup.findAll('img')

    # Actual images to return
    returnImages = copy.deepcopy(origImages)

    count = 0
    for image in origImages:
        # Only change images which are not already in uuid format.
        if len(image['src']) != 46:
            image['src'] = f"image[{count}]"
        count += 1

    return soup, returnImages


def checkForNewImages(newImgs, newHtml, card):
    """Check for new images in a html file."""
    for rawImg, formattedImage in zip(newImgs, newHtml.findAll('img')):
        if len(rawImg['src']) != 46:
            image = Image.create(rawImg, card)
            formattedImage['src'] = image.link
    return newHtml
