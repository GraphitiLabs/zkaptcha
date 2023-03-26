from brownie import accounts, network, exceptions, Zkaptcha, CaptchaCollection
from scripts.helpers import (
    get_account,
    proof_with_public_input,
    extract_proof,
    LOCAL_BLOCKCHAIN_ENVIRONMENTS,
)
import pytest


def setup():
    account = get_account()
    print(f"The active network is {network.show_active()}")
    zkaptcha = Zkaptcha.deploy({"from": account})
    return zkaptcha


# Test to check if the contract is deployed
def test_can_talk_to_zkaptcha_contract():

    zkaptcha = setup()
    assert zkaptcha.address != None
    assert zkaptcha.owner() == accounts[0]


# Test to test the whitelist
def test_whitelist():
    zkaptcha = setup()
    user_1 = get_account(index=1)
    user_2 = get_account(index=2)

    # Add user_1 and user_2 to whitelist using addUser function
    zkaptcha.addUser(user_1, {"from": accounts[0]})
    zkaptcha.addUser(user_2, {"from": accounts[0]})

    # Check if user_1 and user_2 are in whitelist with isWhitelistedUser
    assert zkaptcha.isWhitelistedUser(user_1) == True
    assert zkaptcha.isWhitelistedUser(user_2) == True

    # Remove user_1 from whitelist using removeUser function
    zkaptcha.removeUser(user_1, {"from": accounts[0]})
    assert zkaptcha.isWhitelistedUser(user_1) == False


def test_merkle_membership():
    zkaptcha = setup()
    user_1 = get_account(index=1)
    user_2 = get_account(index=2)

    # Add user_1 and user_2 to whitelist using addUser function
    zkaptcha.addUser(user_1, {"from": accounts[0]})
    zkaptcha.addUser(user_2, {"from": accounts[0]})

    # Check if user_1 and user_2 are in whitelist with isWhitelistedUser
    assert zkaptcha.isWhitelistedUser(user_1) == True
    assert zkaptcha.isWhitelistedUser(user_2) == True

    # Add Merkle root for user_1
    zkaptcha.addMerkleRoot(
        user_1,
        "0xbf0412ac33a2027ac4ea70ec0f2fbb6a704bd50b8c03f6e11393930da2fe70a2",
        {"from": accounts[0]},
    )

    # Add Merkle root for user_2
    zkaptcha.addMerkleRoot(
        user_2,
        "0x90da206ebbf3e31280070578d68094186c7e780d6137582a3d7a03c1a54c1685",
        {"from": accounts[0]},
    )

    # Check if leaf is in users merkle tree for user_1
    assert (
        zkaptcha.checkMerkleMembership(
            [
                "0x9d5913e05fea728f85833c11432990b3fed6d9d1d46a8f8092858433bf89bc02",
                "0x523e338ce4eaa4e78c5ba665d4a4fa60745b75a79980db547edb09a7650424e1",
                "0x82e12e554b92fa50a3f131c905d0ba4e8e8cab2e44513ddc795b4ebf60ca6bdd",
            ],
            user_1,
            "9913e4db9d1e51fb530ba665d9e874c03745aa5a211b7afdca25906328fc82c5",
        )
        == True
    )

    # Check if leaf is in users merkle tree for user_2
    assert (
        zkaptcha.checkMerkleMembership(
            [
                "0xb74f4f173d83e96a8a0ba8d865a3df2961e6cdc7c6bea13badc300973da2baec",
                "0xe0de0c239776a92b3a1f51a509b89d7ae8067fc71e26172ac65861d6ac86799d",
                "0xfaa3ab74ca6b3893948cc8713fb99d75ff6704fc8c4a933969f7ed5a0998433b",
                "0xc82254ed51e4597b68e8e65cec1eed7d763fb52bf2e68e0828baa6e30b0a28ff",
            ],
            user_2,
            "0xb4f78daa7d86696c87a9e3184a8a62fe6b0638a0590654749aee9561eba67e2c",
        )
    ) == True


def test_zkprover():
    proof = extract_proof()

    zkaptcha = setup()

    # Call verifyZkProof on the proof string and check that it returns True
    assert zkaptcha.verifyZkProof(bytes.fromhex(proof)) == True


def test_nft_demo():
    zkaptcha = setup()

    # get the address of where zkaptcha is deployed
    zkaptcha_address = zkaptcha.address

    # deploy the nft collection
    account = get_account()
    captcha_collection = CaptchaCollection.deploy(zkaptcha_address, {"from": account})

    # Add CaptchaCollection address to the Zkaptcha whitelist
    zkaptcha.addUser(captcha_collection.address, {"from": account})

    # Add Merkle root for CaptchaCollection
    zkaptcha.addMerkleRoot(
        captcha_collection.address,
        "0xbf0412ac33a2027ac4ea70ec0f2fbb6a704bd50b8c03f6e11393930da2fe70a2",
        {"from": accounts[0]},
    )

    # Check if CaptchaCollection is whitelisted
    assert zkaptcha.isWhitelistedUser(captcha_collection.address) == True

    # Mint a new NFT
    meta_data_hash = "https://gateway.pinata.cloud/ipfs/QmYseRJwUGHJbqYvTqivquZxE8pmjbTUMoHd6B6S5t4MoA/armstrong.json"

    transaction = captcha_collection.createToken(
        meta_data_hash,
        [
            "0x9d5913e05fea728f85833c11432990b3fed6d9d1d46a8f8092858433bf89bc02",
            "0x523e338ce4eaa4e78c5ba665d4a4fa60745b75a79980db547edb09a7650424e1",
            "0x82e12e554b92fa50a3f131c905d0ba4e8e8cab2e44513ddc795b4ebf60ca6bdd",
        ],
        "9913e4db9d1e51fb530ba665d9e874c03745aa5a211b7afdca25906328fc82c5",
        {"from": account},
    )

    # Check of NFT count is 1
    assert captcha_collection.tokenCounter() == 1
