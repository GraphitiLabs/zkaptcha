# from brownie import network, config, accounts
# from web3 import Web3

# FORKED_LOCAL_ENVIRONMENTS = ["mainnet-fork", "mainnet-fork-dev"]
# LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]

# DECIMALS = 8
# STARTING_PRICE = 200000000000


# def get_account(index=None):
#     if (
#         network.show_active() in LOCAL_BLOCKCHAIN_ENVIRONMENTS
#         or network.show_active() in FORKED_LOCAL_ENVIRONMENTS
#     ):
#         if not index:
#             return accounts[0]
#         else:
#             return accounts[index]
#     else:
#         return accounts.load("dev-account")

import os

PROOF_PATH = "/Users/ketanjog/Documents/startup/dev/zkaptcha-generator/circuits/proofs"
PROOF_FILE = "p.proof"


with open(os.path.join(PROOF_PATH, PROOF_FILE), "r") as f:
    proof = f.read()
    # Print the first 100 characters of the proof
    print(proof[:100])
