// SPDX-License-Identifier: MIT
pragma solidity >=0.6.0;
pragma experimental ABIEncoderV2;

interface ZkaptchaInterface {
    function verifyCaptcha(
        bytes32[] memory merkleProof,
        address user,
        bytes32 _hash,
        bytes calldata zkProof
    ) external view returns (bool);
}

// zkaptcha = ZKaptchaInterface.at("0cnkjrng30tgn")

// function mint () {
//     assert(verify.verifyCaptcha(params))
//     // ...
// }
