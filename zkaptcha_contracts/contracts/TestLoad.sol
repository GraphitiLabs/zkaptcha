// SPDX-License-Identifier: GPL-2.0-only

pragma solidity >=0.6.0;

contract TestLoad {
    // Function to extract offset first 4 bytes and return the next 32 bytes from calldata as a bytes32
    function extractMerkleRoot(
        bytes calldata data
    ) public pure returns (bytes32) {
        // assembly {
        //     let _root := calldataload(0x04)
        //     // return(_root, 0x20)
        //     // calldatacopy(0x0, 4, 8)
        //     return(_root, 32)
        // }
        // bytes4 selector = bytes4(data[:4]);
        // return bytes32(data[4:36]);
        // assembly {
        //     selector := calldataload(data.offset)
        // }
    }

    function convertBytesToBytes8(
        bytes calldata inBytes
    ) public pure returns (bytes8 outBytes8) {
        // if (inBytes.length == 0) {
        //     return 0x0;
        // }

        assembly {
            outBytes8 := mload(add(inBytes.offset, 32))
        }
    }

    function callMe(bytes calldata) public pure returns (bytes32) {
        bytes32 root;
        assembly {
            // calldatacopy(0x0, 4, 36)
            // return(0x0, 32)
            mstore(root, calldataload(add(calldataload(0x04), 0x24)))
            return(root, 32)
        }
    }

    function getSig() public pure returns (bytes4) {
        assembly {
            calldatacopy(0x0, 0, 4)
            return(0x0, 4)
        }
    }

    function foo(bytes calldata data) external pure {
        bytes4 selector;
        assembly {
            selector := calldataload(data.offset)
            return(selector, 4)
        }
    }
}
