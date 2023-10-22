// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import {ITokenManager} from "@axelar-network/interchain-token-service/contracts/interfaces/ITokenManager.sol";
import {ITokenManagerType} from "@axelar-network/interchain-token-service/contracts/interfaces/ITokenManagerType.sol";
import {IInterchainToken} from "@axelar-network/interchain-token-service/contracts/interfaces/IInterchainToken.sol";
import {IInterchainTokenService} from "@axelar-network/interchain-token-service/contracts/interfaces/IInterchainTokenService.sol";
import {AddressBytesUtils} from "@axelar-network/interchain-token-service/contracts/libraries/AddressBytesUtils.sol";
import "./interfaces/iBaseSecurityToken.sol";
import "./interfaces/iDocumentManager.sol";
import "./interfaces/iAssetController.sol";

/*
 * @title AssetToken
 * @dev This contract represents an asset token with various functionalities.
 */
contract AssetToken is
    Initializable,
    ERC20Upgradeable,
    ERC20BurnableUpgradeable,
    IBaseSecurityToken,
    IDocumentManager,
    IAssetController
{
    // STATE VARIABLES

    bool internal issuance;
    address assetAdmin;
    // smart contract that initialized contract
    address factory;
    uint256 public tokenOfferingPrice;
    address public controller;

    ITokenManager public tokenManager;
    IInterchainTokenService public service;

    uint constant TRF_STATUS_FAILURE = 0x50;
    uint constant TRF_STATUS_SUCCESS = 0x51;
    uint constant TRF_STATUS_INSUFFICIENT_BALANCE = 0x52;
    uint constant TRF_STATUS_INSUFFICIENT_ALLOWANCE = 0x53;
    uint constant TRF_STATUS_INVALID_RECEIVER = 0x57;

    // mapping to store the documents details in the document
    mapping(bytes32 => Document) internal _documents;

    //EVENTS
    /**
     * @dev Event emitted when controller features will no longer be in use.
     */
    event FinalizedControllerFeature();

    //MODIFIER

    /**
     * @dev Modifier to restrict access to only the asset admin.
     * assetAdmin represents the issuer
     */
    modifier onlyassetAdmin() {
        require(msg.sender == assetAdmin || msg.sender == factory);
        _;
    }

    /**
     * @dev Modifier to restrict access to only the controller.
     */
    modifier onlyController() {
        require(msg.sender == controller);
        _;
    }

    /**
     * @dev Modifier to restrict access to only the factory.
     */
    modifier onlyFactory() {
        require(msg.sender == factory);
        _;
    }

    struct Document {
        bytes32 docHash; // Hash of the document
        uint256 lastModified; // Timestamp at which document details was last modified
        string uri; // URI of the document that exist off-chain
    }

    // Array use to store all the document name present in the contracts
    bytes32[] _docNames;

    // token issuance
    /**
     * @dev Get the issuance status of the asset.
     * @return a flag that repersents if the token can be issued or not.
     */
    function isIssuable() external view returns (bool) {
        return issuance;
    }

    /**
     * @dev Allows an asset admin to issues tokens to a token holder.
     * @param _tokenHolder The address of the token holder.
     * @param _value The amount of tokens to be issued.
     * @param _data Additional data associated with the issuance.
     */
    function issue(
        address _tokenHolder,
        uint256 _value,
        bytes calldata _data
    ) external onlyassetAdmin {
        _issue(_tokenHolder, _value, _data);
    }

    // token offering
    function tokenOffering(
        address _buyer,
        uint256 _value,
        bytes calldata _data
    ) external onlyFactory {
        _issue(_buyer, _value, _data);
    }

    // transfer functionalitites
    function canTransfer(
        address _to,
        uint256 _value,
        bytes calldata _data
    ) external view returns (bool, uint) {
        // Add a function to validate the `_data` parameter

        if (_to == address(0)) return (false, TRF_STATUS_INVALID_RECEIVER);

        uint256 senderBalance = balanceOf(msg.sender);

        if (senderBalance < _value)
            return (false, TRF_STATUS_INSUFFICIENT_BALANCE);

        uint256 receiverBalance = balanceOf(_to);

        (bool willAdd, ) = Math.tryAdd(receiverBalance, _value);

        if (!willAdd) return (false, TRF_STATUS_FAILURE);

        return (true, TRF_STATUS_SUCCESS);
    }

    /**
     * @dev Checks if a transfer can be made from a sender to a receiver.
     * @param _from The address of the sender.
     * @param _to The address of the receiver.
     * @param _value The amount of tokens to be transferred.
     * @param _data Additional data associated with the transfer.
     * @return A boolean indicating whether the transfer can be made and a status code.
     */
    function canTransferFrom(
        address _from,
        address _to,
        uint256 _value,
        bytes calldata _data
    ) external view returns (bool, uint) {
        // Add a function to validate the `_data` parameter

        if (_to == address(0)) return (false, TRF_STATUS_INVALID_RECEIVER);

        uint256 senderBalance = balanceOf(msg.sender);

        if (senderBalance < _value)
            return (false, TRF_STATUS_INSUFFICIENT_BALANCE);

        uint256 receiverBalance = balanceOf(_to);

        (bool willAdd, ) = Math.tryAdd(receiverBalance, _value);

        if (!willAdd) return (false, TRF_STATUS_FAILURE);

        uint256 spenderAllowance = allowance(_from, msg.sender);

        if (_value > spenderAllowance)
            return (false, TRF_STATUS_INSUFFICIENT_ALLOWANCE);

        return (true, TRF_STATUS_SUCCESS);
    }

    function transferWithData(
        address _to,
        uint256 _value,
        bytes calldata _data
    ) external {
        // Add a function to validate the `_data` parameter
        _transfer(msg.sender, _to, _value);
    }

    /**
     * @notice Implementation of the interchainTransfer method
     * @dev We chose to either pass `metadata` as raw data on a remote contract call, or, if no data is passed, just do a transfer.
     * A different implementation could have `metadata` that tells this function which function to use or that it is used for anything else as well.
     * @param destinationChain The destination chain identifier.
     * @param recipient The bytes representation of the address of the recipient.
     * @param amount The amount of token to be transfered.
     * @param metadata Either empty, to just facilitate an interchain transfer, or the data can be passed for an interchain contract call with transfer as per semantics defined by the token service.
     */
    function interchainTransfer(
        string calldata destinationChain,
        bytes calldata recipient,
        uint256 amount,
        bytes calldata metadata
    ) external payable onlyassetAdmin {
        address sender = msg.sender;

        tokenManager.transmitInterchainTransfer{value: msg.value}(
            sender,
            destinationChain,
            recipient,
            amount,
            metadata
        );
    }

    /**
     * @notice Implementation of the interchainTransferFrom method
     * @dev We chose to either pass `metadata` as raw data on a remote contract call, or, if no data is passed, just do a transfer.
     * A different implementation could have `metadata` that tells this function which function to use or that it is used for anything else as well.
     * @param sender the sender of the tokens. They need to have approved `msg.sender` before this is called.
     * @param destinationChain the string representation of the destination chain.
     * @param recipient the bytes representation of the address of the recipient.
     * @param amount the amount of token to be transfered.
     * @param metadata either empty, to just facilitate a cross-chain transfer, or the data to be passed to a cross-chain contract call and transfer.
     */
    function interchainTransferFrom(
        address sender,
        string calldata destinationChain,
        bytes calldata recipient,
        uint256 amount,
        bytes calldata metadata
    ) external payable onlyassetAdmin {
        uint256 _allowance = allowance(sender, msg.sender);

        if (_allowance != type(uint256).max) {
            _approve(sender, msg.sender, _allowance - amount);
        }

        tokenManager.transmitInterchainTransfer{value: msg.value}(
            sender,
            destinationChain,
            recipient,
            amount,
            metadata
        );
    }

    /**
     * @dev Transfers tokens from a sender to a recipient.
     * @param _from The address of the sender.
     * @param _to The address of the recipient.
     * @param _value The amount of tokens to be transferred.
     * @param _data Additional data associated with the transfer.
     */
    function transferFromWithData(
        address _from,
        address _to,
        uint256 _value,
        bytes calldata _data
    ) external {
        // Add a function to validate the `_data` parameter
        transferFrom(_from, _to, _value);
    }

    /**
     * @dev Redeems tokens from the sender's account.
     * @param _value The amount of tokens to be redeemed.
     * @param _data Additional data associated with the redemption.
     */
    function redeem(uint256 _value, bytes calldata _data) external {
        // Add a function to validate the `_data` parameter

        _burn(msg.sender, _value);

        emit Redeemed(address(0), msg.sender, _value, _data);
    }

    /**
     * @dev Redeems tokens from a specified token holder's account.
     * @param _tokenHolder The address of the token holder.
     * @param _value The amount of tokens to be redeemed.
     * @param _data Additional data associated with the redemption.
     */
    function redeemFrom(
        address _tokenHolder,
        uint256 _value,
        bytes calldata _data
    ) external {
        // Add a function to validate the `_data` parameter
        burnFrom(_tokenHolder, _value);

        emit Redeemed(msg.sender, _tokenHolder, _value, _data);
    }

    // document management

    /**
     * @dev Sets the details of a document.
     * @param _name The name of the document.
     * @param _uri The URI of the document.
     * @param _documentHash The hash of the document.
     */
    function setDocument(
        bytes32 _name,
        string calldata _uri,
        bytes32 _documentHash
    ) external onlyassetAdmin {
        require(_name != bytes32(0), "Zero value is not allowed");

        require(bytes(_uri).length > 0, "Should not be a empty uri");

        if (_documents[_name].lastModified == uint256(0)) {
            _docNames.push(_name);
        }

        _documents[_name] = Document(_documentHash, block.timestamp, _uri);

        emit DocumentUpdated(_name, _uri, _documentHash);
    }

    /**
     * @dev Removes a document.
     * @param _name The name of the document to be removed.
     */
    function removeDocument(bytes32 _name) external onlyassetAdmin {
        require(
            _documents[_name].lastModified != uint256(0),
            "Document should be existed"
        );

        delete _documents[_name];

        emit DocumentRemoved(
            _name,
            _documents[_name].uri,
            _documents[_name].docHash
        );
    }

    /**
     * @dev Retrieves the details of a document.
     * @param _name The name of the document.
     * @return The URI, document hash, and last modified timestamp of the document.
     */
    function getDocument(
        bytes32 _name
    ) external view returns (string memory, bytes32, uint256) {
        return (
            _documents[_name].uri,
            _documents[_name].docHash,
            _documents[_name].lastModified
        );
    }

    /**
     * @dev Retrieves all document names.
     * @return An array of document names.
     */
    function getAllDocuments() external view returns (bytes32[] memory) {
        return _docNames;
    }

    // asset control

    /**
     * @dev Checks if the token is controllable.
     * @return A boolean indicating whether the token is controllable.
     */
    function isControllable() external view returns (bool) {
        return controller != address(0);
    }

    /**
     * @dev Transfers tokens from a sender to a recipient using the controller.
     * @param _from The address of the sender.
     * @param _to The address of the recipient.
     * @param _value The amount of tokens to be transferred.
     * @param _data Additional data associated with the transfer.
     * @param _operatorData Additional data associated with the operator.
     */
    function controllerTransfer(
        address _from,
        address _to,
        uint256 _value,
        bytes calldata _data,
        bytes calldata _operatorData
    ) external onlyController {
        _transfer(_from, _to, _value);

        emit ControllerTransfer(
            msg.sender,
            _from,
            _to,
            _value,
            _data,
            _operatorData
        );
    }

    /**
     * @dev Redeems tokens from a specified token holder's account using the controller.
     * @param _tokenHolder The address of the token holder.
     * @param _value The amount of tokens to be redeemed.
     * @param _data Additional data associated with the redemption.
     * @param _operatorData Additional data associated with the operator.
     */
    function controllerRedeem(
        address _tokenHolder,
        uint256 _value,
        bytes calldata _data,
        bytes calldata _operatorData
    ) external onlyController {
        _burn(_tokenHolder, _value);

        emit ControllerRedemption(
            msg.sender,
            _tokenHolder,
            _value,
            _data,
            _operatorData
        );
    }

    // Admin controls
    /**
     * @dev Assigns a new controller.
     * @param _controller The address of the new controller.
     */
    function assignController(address _controller) external onlyassetAdmin {
        require(_controller != controller, "Current controller");

        controller = _controller;
    }

    /**
     * @dev Finalizes the controllable feature.
     */
    function finalizeControllable() external onlyassetAdmin {
        require(controller != address(0), "Already finalized");

        controller = address(0);

        emit FinalizedControllerFeature();
    }

    /**
     * @dev Initializes the contract.
     * @param _salt The salt value used for contract deployment.
     * @param _tokenName The name of the token.
     * @param _tokenSymbol The symbol of the token.
     * @param _assetAdmin The address of the asset admin.
     * @param _controller The address of the controller.
     * @param interchainTokenServiceAddress The address of the interchain token service.
     * @param _tokenOfferingPrice The token offering price.
     */
    function initialize(
        bytes32 _salt,
        string memory _tokenName,
        string memory _tokenSymbol,
        address _assetAdmin,
        address _controller,
        address interchainTokenServiceAddress,
        uint256 _tokenOfferingPrice
    ) public initializer {
        //Validate input
        assetAdmin = _assetAdmin;

        factory = msg.sender;

        __ERC20_init(_tokenName, _tokenSymbol);

        issuance = true;

        tokenOfferingPrice = _tokenOfferingPrice;

        controller = _controller;

        // service = IInterchainTokenService(interchainTokenServiceAddress);

        // deployTokenManager(_salt);
    }

    /**
     * @dev Set token manager for this contract.
     * @param _tokenManager The new value for the token manager address.
     */
    function setTokenManager(address _tokenManager) public onlyassetAdmin {
        tokenManager = ITokenManager(_tokenManager);
    }

    /**
     * @dev Internal function to issue tokens to a token holder.
     * @param _tokenHolder The address of the token holder.
     * @param _value The amount of tokens to be issued.
     * @param _data Additional data associated with the issuance.
     */
    function _issue(
        address _tokenHolder,
        uint256 _value,
        bytes calldata _data
    ) internal {
        // Add a function to validate the `_data` parameter
        require(issuance, "Issuance is closed");

        _mint(_tokenHolder, _value);

        emit Issued(msg.sender, _tokenHolder, _value, _data);
    }

    /*
     * @dev Deploys token manager for this contract.
     * @param _salt The salt value used for token manager contract deployment.
     */
    function deployTokenManager(bytes32 salt) internal {
        bytes memory params = service.getParamsMintBurn(
            abi.encodePacked(msg.sender),
            address(this)
        );

        bytes32 tokenId = service.deployCustomTokenManager(
            salt,
            ITokenManagerType.TokenManagerType.MINT_BURN,
            params
        );

        tokenManager = ITokenManager(service.getTokenManagerAddress(tokenId));
    }
}
