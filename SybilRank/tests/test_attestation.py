from brownie import accounts, network, exceptions, AttestationStation

from scripts.helpers import get_account

"""
We want to create an attestation table indexed by the zkaptcha contract address

Attestation Station mappings are creator => about => key => value

In our case:
creator: zkaptcha contract address
about: user address
key: sybil score
value: score

We want to be able to add and update the score of a user in the attestation table

"""
# Get the attestation station at a contract address


def get_AttestationStation():
    account = accounts.load("dev-account")
    station = AttestationStation.deploy({"from": account})

    return station


def test_add_attestation():
    station = get_AttestationStation()
    account = get_account()

    # Get 2 dummy accounts
    user1 = get_account(index=1)
    user2 = get_account(index=2)

    key = "Zkaptcha.SybilRank"

    # Convert key to bytes32
    key = key.encode("utf-8")

    value1 = 100
    value2 = 69

    station.attest(user1, key, value1, {"from": account})
    station.attest(user2, key, value2, {"from": account})

    # Check that the attestation was added
    # The mapping is creator => about => key => value
    # Print the values
    # convert values to hex bytes strings
    value1 = hex(value1)
    value2 = hex(value2)

    print(value1)
    print(value2)

    print(station.attestations(account.address, user1, key))
    print(station.attestations(account.address, user2, key))

    assert station.attestations(account.address, user1, key) == value1
    assert station.attestations(account.address, user2, key) == value2
