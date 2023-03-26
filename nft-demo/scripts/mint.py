import json
from pathlib import Path
from brownie import (
    accounts,
    config,
    CaptchaCollection,
)


def main():
    # Get our account info
    dev = accounts.load("dev-account")
    # Get the most recent deployment of our contract
    water_collection = CaptchaCollection[-1]
    # Check the number of currently minted tokens
    existing_tokens = water_collection.tokenCounter()
    print("Existing tokens: ", existing_tokens)

    # Get the metadata hash for this token's URI
    meta_data_hash = "https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/armstrong.json"
    # Call our createCollectible function to mint a token
    transaction = water_collection.createToken(meta_data_hash, {"from": dev})
    # Wait for 3 blocks to be created atop our transactions
    transaction.wait(3)
