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

    uint256 private _maxTokenCount = 10000;
    uint256 private _reserved = 400;
    mapping(uint256 => uint256) private _claimableEth;

    string public baseTokenURI;
    
    uint256 public constant price = 0.05 ether;

    constructor(string memory _baseTokenURI) ERC721("Voodollz", "Voodollz")  {
        setBaseURI(_baseTokenURI);
    }

    function _mint(uint256 _amount) private whenNotPaused {
        require(_amount <= 20, "Can only mint 20 tokens at a time");
        require(totalSupply() + _amount <= _maxTokenCount - _reserved, "Exceeds maximum Voodollz supply");
        require(msg.value >= price * _amount, "Ether value sent is not correct");
    
        for(uint256 i = 0; i < _amount; i++) {
            uint mintIndex = totalSupply() + 1;
            if (totalSupply() < _maxTokenCount) {
                _safeMint(msg.sender, mintIndex);
            }
        }
    }

    function mintVoodollz(uint256 _amount) public payable whenNotPresaled {
        _mint(_amount);
    }

    function presaleVoodollz(uint256 _amount, bytes memory _signature) public payable whenPresaled {
        address signer = recoverSigner(msg.sender, _signature);
        require(signer == owner(), "Not authorized to mint");

        _mint(_amount);
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseURI(string memory _baseTokenURI) public onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function giveAway(address _to, uint256 _amount) public onlyOwner whenNotPaused {
        require(_amount <= _reserved, "Exceeds reserved Voodollz supply");

        for(uint256 i = 1; i <= _amount; i++) {
            uint mintIndex = totalSupply() + 1;
            if (totalSupply() < _maxTokenCount) {
                _safeMint(_to, mintIndex);
            }
        }

        _reserved -= _amount;
    }

    function recoverSigner(address wallet, bytes memory _signature) public pure returns (address){
        return keccak256(abi.encodePacked(wallet)).toEthSignedMessageHash().recover(_signature);
    }

    function deposit() public payable onlyOwner {
        uint256 tokenCount = totalSupply();
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

        emit EthClaimed(msg.sender, amount);

        require(payable(msg.sender).send(amount));
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
        unpresale();
    }
}