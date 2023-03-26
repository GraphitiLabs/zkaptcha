from brownie import network, config, accounts
from web3 import Web3
import os


# FORKED_LOCAL_ENVIRONMENTS = ["mainnet-fork", "mainnet-fork-dev"]
LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]


def get_account(index=None):
    if network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS:
        if not index:
            # print balance of account[0]
            print(
                "Account balance: ",
                Web3.fromWei(accounts[0].balance(), "ether"),
            )
            return accounts[0]
        else:
            return accounts[index]
    else:
        # return accounts.load("ethsf")
        return accounts.load("dev-account")
