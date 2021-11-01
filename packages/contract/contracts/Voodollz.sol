// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

import "./Presalable.sol";

contract Voodollz is ERC721Enumerable, Ownable, Pausable, Presalable {
    using ECDSA for bytes32;
    using Counters for Counters.Counter;

    uint256 private constant _RESERVED = 150;

    string public baseTokenURI;
    
    uint256 public constant MAX_TOKEN_COUNT = 10000;
    uint256 public constant PRICE = 0.0999 ether;
    
    Counters.Counter private _tokenIdCounter = Counters.Counter(_RESERVED);
    Counters.Counter private _giveTokenIdCounter;

    constructor(string memory _baseTokenURI) ERC721("Zllodoov", "ZLDV")  {
        setBaseURI(_baseTokenURI);
        presale();
    }

    // Mint methods

    function _mintVoodollz(uint256 _amount) private whenNotPaused {
        require(balanceOf(msg.sender) + _amount <= 5, "Can only mint 5 tokens at address");
        require(_tokenIdCounter.current() + _amount <= MAX_TOKEN_COUNT, "Exceeds maximum Voodollz supply");
        require(msg.value >= PRICE * _amount, "Ether value sent is not correct");
    
        for(uint256 i = 0; i < _amount; i++) {
            if (_tokenIdCounter.current() < MAX_TOKEN_COUNT) {
                _tokenIdCounter.increment();
                _safeMint(msg.sender, _tokenIdCounter.current());
            }
        }
    }

    function mint(uint256 _amount) public payable whenNotPresaled {
        _mintVoodollz(_amount);
    }

    function presaleMint(uint256 _amount, bytes memory _signature) public payable whenPresaled {        
        address signer = recoverSigner(msg.sender, _signature);
        require(signer == owner(), "Not authorized to mint");

        _mintVoodollz(_amount);
    }

    // Give methods
    
    function giveAway(address _to) public onlyOwner {
        require(_giveTokenIdCounter.current() < _RESERVED, "Exceeds reserved Voodollz supply");

        _giveTokenIdCounter.increment();
        _safeMint(_to, _giveTokenIdCounter.current());
    }

    // Burn methods
    
    function burn(uint256 tokenId) public virtual {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        _burn(tokenId);
    }

    // Service methods

    function tokensOfOwner(address _owner) public view returns(uint256[] memory){
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokensId = new uint256[](tokenCount);

        for(uint256 i; i < tokenCount; i++){
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    function recoverSigner(address _wallet, bytes memory _signature) private pure returns (address){
        return keccak256(abi.encodePacked(_wallet)).toEthSignedMessageHash().recover(_signature);
    }
    
    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function presale() public onlyOwner {
        _presale();
    }

    function unpresale() public onlyOwner {
        _unpresale();
    }
}