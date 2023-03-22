from brownie import accounts, network, config, TurboVerifier


def deploy_scroll_verifier():
    # account = get_account()
    account = accounts.load("dev-account")
    # publish_source=True
    scroll_verifier = TurboVerifier.deploy(
        {"from": account},
        # publish_source=config["networks"][network.show_active()].get("verify"),
    )

    return scroll_verifier


def main():
    deploy_scroll_verifier()
