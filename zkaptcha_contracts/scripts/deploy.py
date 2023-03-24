from brownie import accounts, network, config, TestLoad


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


def main():
    # deploy_scroll_verifier()
    lt = deploy_mload_test()
    print("Contract deployed at: " + str(lt.address))
    extractRoot(lt)
