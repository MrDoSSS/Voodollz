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
    event EthClaimed(string _nonce, uint256 amount);

    uint256 private constant _RESERVED = 150;
    uint256 private _reservedLeft = _RESERVED;
    uint256 private _ethDeposited = 0 ether;

    string public baseTokenURI;
    
    uint256 public constant MAX_TOKEN_COUNT = 10000;
    uint256 public constant PRICE = 0.05 ether;

    mapping(string => bool) private _usedNonces;

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

    // Give methods
    
    function giveAway(address _to) public onlyOwner whenNotPaused {
        require(totalSupply() < MAX_TOKEN_COUNT, "Exceeds maximum Voodollz supply");
        require(_reservedLeft > 0, "Exceeds reserved Voodollz supply");

        _safeMint(_to, _RESERVED - _reservedLeft + 1);

        _reservedLeft -= 1;
    }

    // Community wallet methods

    function deposit() public payable onlyOwner{
        _ethDeposited = msg.value;

        emit EthDeposited(msg.value);
    }

    function claim(uint256 _amount, string memory _nonce, bytes memory _signature) public {
        address signer = recoverSigner(_amount, _nonce, _signature);
        require(signer == owner(), "Not authorized to claim");
        require(!_usedNonces[_nonce], "Not authorized to claim");

        require(_amount > 0, "There is no amount left to claim");
        require(payable(msg.sender).send(_amount));

        _usedNonces[_nonce] = true;

        emit EthClaimed(_nonce, _amount);
    }

    function tokensOfOwner(address _owner) public view returns(uint256[] memory){
        uint256 tokenCount = balanceOf(_owner);
        uint256[] memory tokensId = new uint256[](tokenCount);

        for(uint256 i; i < tokenCount; i++){
            tokensId[i] = tokenOfOwnerByIndex(_owner, i);
        }

        return tokensId;
    }

    // Burn methods
    
    function burn(uint256 tokenId) public virtual {
        require(_isApprovedOrOwner(msg.sender, tokenId), "Caller is not owner nor approved");
        _burn(tokenId);
    }

    // Service methods

    function recoverSigner(address _wallet, bytes memory _signature) private pure returns (address){
        return keccak256(abi.encodePacked(_wallet)).toEthSignedMessageHash().recover(_signature);
    }

    function recoverSigner(uint256 _amount, string memory nonce, bytes memory _signature) private pure returns (address){
        return keccak256(abi.encodePacked(_amount, nonce)).toEthSignedMessageHash().recover(_signature);
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