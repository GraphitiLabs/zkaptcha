// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library MerkleProof {
    function _efficientHash(
        bytes32 a,
        bytes32 b
    ) private pure returns (bytes32 value) {
        /// @solidity memory-safe-assembly
        assembly {
            mstore(0x00, a)
            mstore(0x20, b)
            value := keccak256(0x00, 0x40)
        }
    }

    function verify(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) internal pure returns (bool) {
        bytes32 computedHash = leaf;
        for (uint256 i = 0; i < proof.length; i++) {
            bytes32 proofElement = proof[i];

            if (computedHash <= proofElement) {
                computedHash = _efficientHash(computedHash, proofElement);
            } else {
                computedHash = _efficientHash(proofElement, computedHash);
            }
        }

        return computedHash == root;
    }
}

contract Zkaptcha {
    // Save the owner address. The owner can add or remove users from the registry.
    address public owner;
    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the Owner");
        _;
    }

    constructor() {
        owner = msg.sender;
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

    function verifyMerkle(
        bytes32[] memory proof,
        bytes32 root,
        bytes32 leaf
    ) internal pure returns (bool) {
        return MerkleProof.verify(proof, root, leaf);
    }

    // Verify a merkle proof.
    function checkMerkleMembership(
        bytes32[] memory proof,
        address user,
        bytes32 leaf
    ) public view returns (bool) {
        // For each root in the user's array of valid roots, check if the proof is valid.
        for (uint i = 0; i < 3; i++) {
            if (verifyMerkle(proof, validMerkleRoots[user][i], leaf)) {
                return true;
            }
        }

        return false;
    }

    // TODO: Add the ZK Proof verifier code here
}
