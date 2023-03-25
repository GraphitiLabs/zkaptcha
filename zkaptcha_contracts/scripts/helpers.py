from brownie import network, config, accounts
from web3 import Web3

# FORKED_LOCAL_ENVIRONMENTS = ["mainnet-fork", "mainnet-fork-dev"]
LOCAL_BLOCKCHAIN_ENVIRONMENTS = ["development", "ganache-local"]

import os

PROOF_PATH = "/Users/ketanjog/Documents/startup/dev/zkaptcha-generator/circuits/proofs"
PROOF_FILE = "p.proof"

PUBLIC_INPUT_PATH = (
    "/Users/ketanjog/Documents/startup/dev/zkaptcha-generator/circuits/Verifier.toml"
)


def extract_public_inputs():
    with open(os.path.join(PUBLIC_INPUT_PATH), "r") as f:
        public_input = f.read()

        # Get first line of the file and store it as pkey
        pkey = public_input.splitlines()[0][7:]

        # Get second line of the file, which is an array of 4 elements, store it in an array
        preimage_array = public_input.splitlines()[1]
        # Drop "return =" and "[]" brackets
        preimage_array = preimage_array[10:-1]
        # Split the string into an array of 4 elements
        preimage_array = preimage_array.split(", ")

        # print the public key and preimage array elements one by one
        # print(pkey)
        # for i in range(4):
        #     print(preimage_array[i])

        # convert the public key and preimage array elements to bytes after dropping the quotes and the 0x prefix
        pkey = bytes.fromhex(pkey[1:-1][2:])
        for i in range(4):
            preimage_array[i] = bytes.fromhex(preimage_array[i][1:-1][2:])

        # concantenate the public key and preimage array elements
        public_input = (
            pkey[1:-1]
            + preimage_array[0][1:-1]
            + preimage_array[1][1:-1]
            + preimage_array[2][1:-1]
            + preimage_array[3][1:-1]
        )

        # print the public input
        # print(public_input)

        return public_input


def extract_proof():
    with open(os.path.join(PROOF_PATH, PROOF_FILE), "r") as f:
        proof = f.read()

    # convert the proof to bytes
    proof = bytes.fromhex(proof)

    return proof


# Function to prepend public input to proof and return the string
def proof_with_public_input():
    proof = extract_proof()
    public_input = extract_public_inputs()

    proof_with_public_input = public_input.append(proof)

    return proof_with_public_input


def check_proof_reading():
    with open(os.path.join(PROOF_PATH, PROOF_FILE), "r") as f:
        proof = f.read()
        # Print the first 100 characters of the proof
        print(proof[:100])


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
