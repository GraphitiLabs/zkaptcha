from brownie import accounts, network, exceptions, Zkaptcha
from scripts.helpers import (
    get_account,
    proof_with_public_input,
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


def test_zkprover():
    proof = hex(proof_with_public_input())

    zkaptcha = setup()

    # Call verifyZkProof on the proof string and check that it returns True
    assert zkaptcha.verifyZkProof(proof) == True
