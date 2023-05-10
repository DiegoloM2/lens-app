"""Utility functions for the Image class."""

import base64
import logging
import boto3
from botocore.exceptions import ClientError
from botocore.client import Config

def create_presigned_url(bucket_name, object_name, access_key, secret_key,region, expiration=60):
    """Generate a presigned URL to share an S3 object.

    :param bucket_name: string
    :param object_name: string
    :param expiration: Time in seconds that presigned URL remains valid
    :return: Presigned URL as string. If error, returns None.
    """
    # Generate a presigned URL for the S3 object
    s3_client = boto3.client(
                's3',
                aws_access_key_id=access_key,
                aws_secret_access_key=secret_key,
                region_name=region,
                config=Config(signature_version='s3v4')
            )
    try:
        response = s3_client.generate_presigned_url('get_object',
                                                    Params={'Bucket':bucket_name,
                                                            'Key':object_name},
                                                    ExpiresIn=expiration)
    except ClientError as e:
        logging.error(e)
        return None

    # The response contains the presigned URL
    return response


def decode(img):
    """Decode html <img> from base64 to jpg/png."""
    src = img['src'][22:]
    src = bytes(src, encoding="utf-8")

    # Make sure the number of characters is divisible by 4
    # for it to be decodable into img bytes.
    missing_padding = len(src) % 4
    if missing_padding:
        src += b'=' * (4 - missing_padding)
    return base64.decodebytes(src)

