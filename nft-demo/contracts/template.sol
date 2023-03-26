// pragma solidity ^0.8.0;

// import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
// import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/utils/Counters.sol";

// contract NFTokenDrop is ERC721, Ownable {
//     using Counters for Counters.Counter;
//     Counters.Counter private _tokenIdCounter;

//     uint256 public constant MAX_NFT_SUPPLY = 10000;
//     uint256 public constant NFT_PRICE = 0.05 ether;

//     bool public saleIsActive = false;

//     string private _baseTokenURI;

//     constructor(
//         string memory name,
//         string memory symbol,
//         string memory baseTokenURI
//     ) ERC721(name, symbol) {
//         _baseTokenURI = baseTokenURI;
//     }

//     function setBaseTokenURI(string memory baseTokenURI) external onlyOwner {
//         _baseTokenURI = baseTokenURI;
//     }

//     function _baseURI() internal view virtual override returns (string memory) {
//         return _baseTokenURI;
//     }

//     function flipSaleState() external onlyOwner {
//         saleIsActive = !saleIsActive;
//     }

//     function mintNFT(uint256 numberOfTokens) external payable {
//         require(saleIsActive, "Sale must be active to mint NFTs");
//         require(
//             numberOfTokens > 0 && numberOfTokens <= 20,
//             "Mint 1 to 20 NFTs at once"
//         );
//         require(
//             _tokenIdCounter.current() + numberOfTokens <= MAX_NFT_SUPPLY,
//             "Purchase would exceed max supply"
//         );
//         require(
//             NFT_PRICE * numberOfTokens <= msg.value,
//             "Ether value sent is not correct"
//         );

//         for (uint256 i = 0; i < numberOfTokens; i++) {
//             if (_tokenIdCounter.current() < MAX_NFT_SUPPLY) {
//                 uint256 newTokenId = _tokenIdCounter.current();
//                 _safeMint(msg.sender, newTokenId);
//                 _tokenIdCounter.increment();
//             }
//         }
//     }

//     function withdraw() external onlyOwner {
//         uint256 balance = address(this).balance;
//         payable(owner()).transfer(balance);
//     }
// }
