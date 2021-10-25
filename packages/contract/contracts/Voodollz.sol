// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

import "./Presalable.sol";

contract Voodollz is ERC721Enumerable, Ownable, Pausable, Presalable {
    using ECDSA for bytes32;

    event EthDeposited(uint256 amount);
    event EthClaimed(address to, uint256 amount);

    uint256 private constant _RESERVED = 150;
    uint256 private _reservedLeft = _RESERVED;
    mapping(uint256 => uint256) private _claimableEth;

    string public baseTokenURI;
    
    uint256 public constant MAX_TOKEN_COUNT = 10000;
    uint256 public constant PRICE = 0.05 ether;

    constructor(string memory _baseTokenURI) ERC721("Voodollz", "Voodollz")  {
        setBaseURI(_baseTokenURI);
        presale();
    }

    // Mint methods

    function _mintVoodollz(uint256 _amount) private whenNotPaused {
        require(balanceOf(msg.sender) + _amount <= 5, "Can only mint 5 tokens at address");
        require(totalSupply() + _amount <= MAX_TOKEN_COUNT - _RESERVED, "Exceeds maximum Voodollz supply");
        require(msg.value >= PRICE * _amount, "Ether value sent is not correct");
    
        for(uint256 i = 0; i < _amount; i++) {
            uint256 mintIndex = totalSupply() + _RESERVED + 1;
            if (totalSupply() < MAX_TOKEN_COUNT) {
                _safeMint(msg.sender, mintIndex);
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

    function recoverSigner(address _wallet, bytes memory _signature) public pure returns (address){
        return keccak256(abi.encodePacked(_wallet)).toEthSignedMessageHash().recover(_signature);
    }

    // Give methods
    
    function giveAway(address _to) public onlyOwner whenNotPaused {
        require(totalSupply() < MAX_TOKEN_COUNT, "Exceeds maximum Voodollz supply");
        require(_reservedLeft > 0, "Exceeds reserved Voodollz supply");

        _safeMint(_to, _RESERVED - _reservedLeft + 1);

        _reservedLeft -= 1;
    }

    // Community wallet methods

    function deposit() public payable onlyOwner {
        uint256 tokenCount = totalSupply();

        require(tokenCount > 0, "No owners");
        require(msg.value > 0, "Ether value sent is not correct");

        uint256 claimableAmountPerToken = msg.value / tokenCount;

        for(uint256 i = 0; i < tokenCount; i++) {
            _claimableEth[tokenByIndex(i)] += claimableAmountPerToken;
        }

        emit EthDeposited(msg.value);
    }

    function claimableBalance(address owner) public view returns (uint256) {
        uint256 balance = 0;
        uint256 numTokens = balanceOf(owner);

        for(uint256 i = 0; i < numTokens; i++) {
            balance += _claimableEth[tokenOfOwnerByIndex(owner, i)];
        }

        return balance;
    }

    function claim() public {
        uint256 amount = 0;
        uint256 numTokens = balanceOf(msg.sender);

        for(uint256 i = 0; i < numTokens; i++) {
            uint256 tokenId = tokenOfOwnerByIndex(msg.sender, i);
            amount += _claimableEth[tokenId];
            _claimableEth[tokenId] = 0;
        }

        require(amount > 0, "There is no amount left to claim");

        require(payable(msg.sender).send(amount));

        emit EthClaimed(msg.sender, amount);
    }

    // Burn methods
    
    function burn(uint256 tokenId) public virtual {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        _burn(tokenId);
    }

    // Service methods
    
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