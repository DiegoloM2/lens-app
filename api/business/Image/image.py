"""Class that covers functionality of Image Model."""

# 3rd party imports
import boto3


# Local imports
from data.image.model import Image as ImageModel
from .utils import create_presigned_url, decode

# S3 Constants
SECRET_KEY = "cRm8EOomUSzJMYcXI8/qyTxxqDEsLQDByrN8KuVX"
ACCESS_KEY = "AKIASB57DW2YE4H2JA7E"
REGION = "eu-west-3"
BUCKET = "memory-dev-storage"


class Image:
    """
    Class that covers functionality of Image Model.

    It serves as a gateway between the API and database.
    """

    def __init__(self, image):
        """Initialize an Image object from an ImageModel instance."""
        self.__uuid = image.id
        self.__cardModel = image.card
        self.__modelInstance = image
        self.link = image.link

    @classmethod
    def from_link(cls, imageLink) -> 'Image':
        """Create an image from its link."""
        uuid = imageLink[6: len(imageLink) - 4]
        image = ImageModel.objects.get(id=uuid)
        return cls(image=image)

    @classmethod
    def create(cls, image, card):
        """Create an image by sending it to S3 and saving it in the db."""
        decodedImage = decode(image)
        imageModel = ImageModel.objects.create(card=card)
        link = f"image_{imageModel.id}.png"
        imageModel.link = link
        imageModel.save()
        cls.upload(decodedImage, link)
        return cls(imageModel)

    # Upload decoded image to S3
    @staticmethod
    def upload(decoded_image, img_link):
        """Upload a decoded image to S3."""
        s3 = boto3.client(
            's3',
            aws_access_key_id=ACCESS_KEY,
            aws_secret_access_key=SECRET_KEY
            )

        s3.put_object(
            Body=decoded_image,
            Bucket="memory-dev-storage",
            Key=img_link
            )

    def read(self):
        """Create presigned url to read image in frontend."""
        presignedUrl = create_presigned_url(
            bucket_name="memory-dev-storage",
            object_name=self.link,
            access_key=ACCESS_KEY,
            secret_key=SECRET_KEY,
            region=REGION,
            expiration=60
            )

        return presignedUrl

    def delete(self):
        """Delete image from db and s3."""
        s3 = boto3.resource(
            's3',
            aws_access_key_id=ACCESS_KEY,
            aws_secret_access_key=SECRET_KEY
        )
        s3.Object(BUCKET, self.link).delete()
        self.__modelInstance.delete()
