from brownie import accounts, network, config, AttestationStation
from web3 import Web3
import os
from scripts.helpers import get_account


def get_AttestationStation():
    account = accounts.load("dev-account")
    station = AttestationStation.at("0xEE36eaaD94d1Cc1d0eccaDb55C38bFfB6Be06C77")

    return station


def add_table():

    account = accounts.load("dev-account")

    # Get 2 dummy accounts
    user1 = get_account(index=1)
    user2 = get_account(index=2)

    key = "Zkaptcha.SybilRank"

    value1 = 100
    value2 = 69

    station = get_AttestationStation()

    station.attest(user1, key, value1, {"from": account})
    station.attest(user2, key, value2, {"from": account})
    print("Added zkaptcha attestation")


def main():
    add_table()
