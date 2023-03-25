from brownie import accounts, network, config, TestLoad, MerkleTest, MerkleProof


# def deploy_scroll_verifier():
#     # account = get_account()
#     account = accounts.load("dev-account")
#     # publish_source=True
#     scroll_verifier = TurboVerifier.deploy(
#         {"from": account},
#         # publish_source=config["networks"][network.show_active()].get("verify"),
#     )

#     return scroll_verifier


def deploy_mload_test():
    # account = get_account()
    account = accounts.load("dev-account")
    # publish_source=True
    scroll_verifier = TestLoad.deploy(
        {"from": account},
        # publish_source=config["networks"][network.show_active()].get("verify"),
    )

    return scroll_verifier


def extractRoot(lt):
    account = accounts.load("dev-account")
    rootstring = "10a1c961bed625d"
    # root = lt.convertBytesToBytes8(
    #     rootstring,
    #     {"from": account, "data": "10a1c961bed625d", },
    # )
    root = lt.callMe(
        "10a1c961bed625d",
        {
            "from": account,
        },
    )
    # root = lt.getSig(
    #     {
    #         "from": account,
    #     }
    # )
    print("Root: " + str(root))


# Deploy MerkleProof Library and MerkleTest Contract
def deploy_merkle():
    account = accounts.load("dev-account")

    # Deploy MerkleProof Library
    # merkle_proof = MerkleProof.deploy({"from": account})

    # Deploy MerkleTest Contract
    merkle_test = MerkleTest.deploy({"from": account})

    return merkle_test


def test_merkle(merkle_test):
    account = accounts.load("dev-account")

    leaf = "0x9913e4db9d1e51fb530ba665d9e874c03745aa5a211b7afdca25906328fc82c5"
    root = "0xde129054d03be04cba38e71188702e8898e6a55d6bf49617989712dd1f4a8715"
    proof = ["0x6b47bcfb6f1548f3676129cfb1f97fafc1c27b02027da26b98a958b09248eee1"]

    # Verify Proof
    print(merkle_test.verify(proof, root, leaf, {"from": account}))


def main():
    # deploy_scroll_verifier()
    # lt = deploy_mload_test()
    # print("Contract deployed at: " + str(lt.address))
    # extractRoot(lt)
    merkle_test = deploy_merkle()
    test_merkle(merkle_test)
