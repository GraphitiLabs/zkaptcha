// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

interface ZkaptchaInterface {
    function verifyCaptcha(
        bytes32[] memory merkleProof,
        address user,
        bytes32 _hash,
        bytes calldata zkProof
    ) external view returns (bool);

    function checkMerkleMembership(
        bytes32[] memory proof,
        address user,
        bytes32 leaf
    ) external view returns (bool);
}

contract CaptchaCollection is ERC721URIStorage {
    uint256 public tokenCounter;
    uint256 public constant NFT_PRICE = 0.0000 ether;
    bool public saleIsActive = true;
    address public owner;
    ZkaptchaInterface zkaptcha;

    constructor(
        address zkaptchaAddress
    ) public ERC721("Captcha Collection", "CAPT") {
        tokenCounter = 0;
        owner = msg.sender;
        zkaptcha = ZkaptchaInterface(zkaptchaAddress);
    }

    // modifier to check merkle membership
    modifier isHuman(
        bytes32[] memory proof,
        address user,
        bytes32 leaf
    ) {
        require(
            zkaptcha.checkMerkleMembership(proof, user, leaf),
            "Merkle membership not verified"
        );
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function.");
        _;
    }

    function createToken(
        string memory tokenURI,
        bytes32[] memory proof,
        bytes32 leaf
    ) public isHuman(proof, address(this), leaf) returns (bytes32) {
        require(tokenCounter < 10, "Max number of tokens reached");
        // require(NFT_PRICE <= msg.value, "Ether value sent is not correct");
        require(saleIsActive, "Sale must be active to mint NFTs");
        uint256 tokenId = tokenCounter;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, tokenURI);
        tokenCounter++;
    }

    function flipSaleState() external onlyOwner {
        saleIsActive = !saleIsActive;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        payable(owner).transfer(balance);
    }
}
