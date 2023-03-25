from brownie import accounts, network, config, CaptchaCollection

# from brownie import MerkleTest, MerkleProof
import os


def deploy_nft_collection():
    account = accounts.load("dev-account")
    scroll_nft = CaptchaCollection.deploy(
        {"from": account},
    )
    return scroll_nft


def main():
    deploy_nft_collection()
