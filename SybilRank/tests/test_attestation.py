from brownie import (
    accounts,
    network,
    exceptions,
    AttestationStation
)

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
def get_attestation_station():


