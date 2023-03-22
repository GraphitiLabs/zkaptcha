// SPDX-License-Identifier: GPL-2.0-only

pragma solidity >=0.6.0;

import "./plonk_vk_v1.sol";

contract ZkaptchaRegistry {
    // Save the owner address. The owner can add or remove users from the registry.
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the Owner");
        _;
    }

    // Save the address of the verifier contract
    address public verifierAddress;

    constructor(address _verifierAddress) {
        owner = msg.sender;
        verifierAddress = _verifierAddress;
    }

    // Store all valid users in an array.
    address[] public whiteListedUsers;

    // Create a mapping of user addresses to an array of 3 sha256 hashes.
    mapping(address => bytes32[3]) public validMerkleRoots;

    // Add a user to the registry.
    function addUser(address user) public onlyOwner {
        whiteListedUsers.push(user);
    }

    // Remove a user from the registry.
    function removeUser(address user) public onlyOwner {
        for (uint i = 0; i < whiteListedUsers.length; i++) {
            if (whiteListedUsers[i] == user) {
                whiteListedUsers[i] = whiteListedUsers[
                    whiteListedUsers.length - 1
                ];
                whiteListedUsers.pop();
                break;
            }
        }
    }

    // Add a merkle root to the user's array of valid roots, remove the oldest root.
    function addMerkleRoot(address user, bytes32 hash) public onlyOwner {
        validMerkleRoots[user][0] = validMerkleRoots[user][1];
        validMerkleRoots[user][1] = validMerkleRoots[user][2];
        validMerkleRoots[user][2] = hash;
    }

    // Check if a user is in the registry.
    function isWhitelistedUser(address user) internal view returns (bool) {
        for (uint i = 0; i < whiteListedUsers.length; i++) {
            if (whiteListedUsers[i] == user) {
                return true;
            }
        }
        return false;
    }

    // Check if a merkle root is valid for a user.
    function isValidMerkleRoot(
        address user,
        bytes32 hash
    ) internal view returns (bool) {
        for (uint i = 0; i < 3; i++) {
            if (validMerkleRoots[user][i] == hash) {
                return true;
            }
        }
        return false;
    }

    // Check if a proof is valid using Turboverifiers verify function.
    function verifyProof(bytes calldata) internal view returns (bool result) {
        TurboVerifier verifier = TurboVerifier(verifierAddress);

        result = verifier.verify();

        return result;
    }
}
