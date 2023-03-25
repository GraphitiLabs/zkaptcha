import requests
import os
import json

metadata_template = {"name": "", "description": "", "image": ""}

names = [
    "buterin",
    "saylor",
    "zhao",
    "kulechov",
    "dorsey",
    "gensler",
    "armstrong",
    "altman",
    "fried",
    "benet",
]


def main():
    write_metadata(10)


def write_metadata(num_tokens):
    # We'll use this array to store the hashes of the metadata
    meta_data_hashes = []
    for token_id in range(num_tokens):
        collectible_metadata = metadata_template.copy()

        # The filename where we're going to locally store the metadata
        meta_data_filename = f"metadata/{names[token_id]}.json"

        # Name of the collectible set to its token id
        collectible_metadata["name"] = str(names[token_id])
        # Description of the collectible set to be "Wata"
        collectible_metadata[
            "description"
        ] = "Captcha art for the names of a few promininent people in the Crypto space"
        # Path of the artwork to be uploaded to IPFS
        img_path = f"images/{names[token_id]}.png"
        with open(img_path, "rb") as f:
            img_binary = f.read()
        # Upload the image to IPFS and get the storage address
        image = upload_to_ipfs(img_binary)
        # Add the image URI to the metadata
        image_path = f"<https://ipfs.io/ipfs/{image}>"
        collectible_metadata["image"] = image_path
        with open(meta_data_filename, "w") as f:
            # Write the metadata locally
            json.dump(collectible_metadata, f)
        # Upload our metadata to IPFS
        meta_data_hash = upload_to_ipfs(collectible_metadata)
        meta_data_path = f"<https://ipfs.io/ipfs/{meta_data_hash}>"
        # Add the metadata URI to the array
        meta_data_hashes.append(meta_data_path)
    with open("metadata/data.json", "w") as f:
        # Finally, we'll write the array of metadata URIs to a file
        json.dump(meta_data_hashes, f)
    return meta_data_hashes


def upload_to_ipfs(data):
    # Get our Pinata credentials from our .env file
    pinata_api_key = os.environ["PINATA_API_KEY"]
    pinata_api_secret = os.environ["PINATA_API_SECRET"]
    endpoint = "<https://api.pinata.cloud/pinning/pinFileToIPFS>"
    headers = {
        "pinata_api_key": pinata_api_key,
        "pinata_secret_api_key": pinata_api_secret,
    }
    body = {"file": data}
    # Make the pin request to Pinata
    response = requests.post(endpoint, headers=headers, files=body)
    # Return the IPFS hash where the data is stored
    return response.json()["IpfsHash"]
