// SPDX-License-Identifier: MIT

pragma solidity 0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import {Base64} from "./libraries/Base64.sol";
import "hardhat/console.sol";



contract ProjectName is AutomationCompatibleInterface, ERC721URIStorage, Ownable {
    
    using Counters for Counters.Counter;
    Counters.Counter private currentTokenId;
    using SafeMath for uint256;

    string public baseTokenURI;
    uint256 public burnToken;
    uint256 public interval;
    uint256 public lastTimeStamp;

    struct TicketNFTInfo {
        string name;
        uint price;
        string date;
        string location;
        string descripton;
        string typeOfTicket;
        uint256 startTime;
        uint256 EndTime;
        uint256 duration;
        bool soldOnce;
    }

    string svgPartOne = '<svg xmlns="http://www.w3.org/2000/svg" width="270" height="270" fill="none"><path fill="url(#a)" d="M0 0h270v270H0z"/><defs><filter id="b" color-interpolation-filters="sRGB" filterUnits="userSpaceOnUse" height="270" width="270"><feDropShadow dx="0" dy="1" stdDeviation="2" flood-opacity=".225" width="200%" height="200%"/></filter></defs><path d="M72.863 42.949a4.382 4.382 0 0 0-4.394 0l-10.081 6.032-6.85 3.934-10.081 6.032a4.382 4.382 0 0 1-4.394 0l-8.013-4.721a4.52 4.52 0 0 1-1.589-1.616 4.54 4.54 0 0 1-.608-2.187v-9.31a4.27 4.27 0 0 1 .572-2.208 4.25 4.25 0 0 1 1.625-1.595l7.884-4.59a4.382 4.382 0 0 1 4.394 0l7.884 4.59a4.52 4.52 0 0 1 1.589 1.616 4.54 4.54 0 0 1 .608 2.187v6.032l6.85-4.065v-6.032a4.27 4.27 0 0 0-.572-2.208 4.25 4.25 0 0 0-1.625-1.595L41.456 24.59a4.382 4.382 0 0 0-4.394 0l-14.864 8.655a4.25 4.25 0 0 0-1.625 1.595 4.273 4.273 0 0 0-.572 2.208v17.441a4.27 4.27 0 0 0 .572 2.208 4.25 4.25 0 0 0 1.625 1.595l14.864 8.655a4.382 4.382 0 0 0 4.394 0l10.081-5.901 6.85-4.065 10.081-5.901a4.382 4.382 0 0 1 4.394 0l7.884 4.59a4.52 4.52 0 0 1 1.589 1.616 4.54 4.54 0 0 1 .608 2.187v9.311a4.27 4.27 0 0 1-.572 2.208 4.25 4.25 0 0 1-1.625 1.595l-7.884 4.721a4.382 4.382 0 0 1-4.394 0l-7.884-4.59a4.52 4.52 0 0 1-1.589-1.616 4.53 4.53 0 0 1-.608-2.187v-6.032l-6.85 4.065v6.032a4.27 4.27 0 0 0 .572 2.208 4.25 4.25 0 0 0 1.625 1.595l14.864 8.655a4.382 4.382 0 0 0 4.394 0l14.864-8.655a4.545 4.545 0 0 0 2.198-3.803V55.538a4.27 4.27 0 0 0-.572-2.208 4.25 4.25 0 0 0-1.625-1.595l-14.993-8.786z" fill="#fff"/><defs><linearGradient id="a" x1="0" y1="0" x2="270" y2="270" gradientUnits="userSpaceOnUse"><stop stop-color="#00FF0A"/><stop offset="1" stop-color="#F9FE09"/></linearGradient></defs><text x="32.5" y="231" font-size="27" fill="#fff" filter="url(#b)" font-family="Plus Jakarta Sans,DejaVu Sans,Noto Color Emoji,Apple Color Emoji,sans-serif" font-weight="bold">';
    string svgPartTwo = '</text></svg>';

    constructor(string memory nftName, string memory nftShort) ERC721(nftName, nftShort){}

    mapping(uint256 => TicketNFTInfo) public tokenIdToNftInfo;

    modifier checkForReSell(uint256 tokenId) {
        require(
            tokenIdToNftInfo[tokenId].soldOnce,     
            "Ticket hasn't been sold yet"
        );
        _;
    }

    modifier checkForExpiry(uint256 tokenId) {
        require(
            block.timestamp <= tokenIdToNftInfo[tokenId].EndTime,
            "Ticket Expired"
        );
        _;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return baseTokenURI;
    }

    function safeMint(string calldata eventName, address payable to, uint256 _interval) public payable {

        string memory finalSvg = string(abi.encodePacked(svgPartOne, eventName, svgPartTwo));
        uint256 tokenId = currentTokenId.current();

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"description": "Event ticket", "image": "data:image/svg+xml;base64,',
                Base64.encode(bytes(finalSvg)),
                '"}'
            )
        );
        string memory finalTokenUri = string( abi.encodePacked("data:application/json;base64,", json));

        console.log("\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
        console.log("Final tokenURI: ", finalTokenUri);
        console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n");
        
        currentTokenId.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, finalTokenUri);
        lastTimeStamp = block.timestamp;
        burnToken = tokenId;
        interval = _interval;
    }

    function transferBalance(address payable recipient) public {
        uint256 balance = address(this).balance;
        require(balance > 0, "Contract balance is zero.");
        recipient.transfer(balance);
    }

    function burn(uint256 tokenId) public {
        super._burn(tokenId);
    }

    function getTicketActiveDuration(uint256 tokenId)
        public
        view
        checkForExpiry(tokenId)
        returns (uint256)
    {
        return tokenIdToNftInfo[tokenId].EndTime - block.timestamp;
    }

    function checkUpkeep(
        bytes calldata //checkData
    )
        external
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /*performData*/
        )
    {
        upkeepNeeded = (block.timestamp - lastTimeStamp) > interval;
    }

    function performUpkeep(bytes calldata performData) external override {
        if ((block.timestamp - lastTimeStamp) > interval) {
            burn(burnToken);
        }
    }

    receive() external payable {}

    fallback() external payable {}
}