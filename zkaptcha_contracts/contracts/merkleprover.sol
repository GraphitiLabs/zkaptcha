// // SPDX-License-Identifier: MIT
// pragma solidity ^0.8.0;

// library MerkleProof {
//     function _efficientHash(
//         bytes32 a,
//         bytes32 b
//     ) private pure returns (bytes32 value) {
//         /// @solidity memory-safe-assembly
//         assembly {
//             mstore(0x00, a)
//             mstore(0x20, b)
//             value := keccak256(0x00, 0x40)
//         }
//     }

//     function verify(
//         bytes32[] memory proof,
//         bytes32 root,
//         bytes32 leaf
//     ) internal pure returns (bool) {
//         bytes32 computedHash = leaf;
//         for (uint256 i = 0; i < proof.length; i++) {
//             bytes32 proofElement = proof[i];

//             if (computedHash <= proofElement) {
//                 computedHash = _efficientHash(computedHash, proofElement);
//             } else {
//                 computedHash = _efficientHash(proofElement, computedHash);
//             }
//         }

//         return computedHash == root;
//     }
// }

// contract MerkleTest {
//     function verify(
//         bytes32[] memory proof,
//         bytes32 root,
//         bytes32 leaf
//     ) public pure returns (bool) {
//         return MerkleProof.verify(proof, root, leaf);
//     }
// }
