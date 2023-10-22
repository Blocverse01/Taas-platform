// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./assetTokenFactory.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";

contract PlatformEntryPoint {
    address public tokenFactoryImplementation;
    address public tokenImplementation;

    event FactoryCreated(address contractAddress);

    modifier onlyFactoryOwner(AssetTokenFactory factory) {
        require(msg.sender == factory.owner());
        _;
    }

    modifier onlyFactoryAssetAdmin(AssetTokenFactory factory) {
        require(msg.sender == factory.assetAdmin());
        _;
    }

    constructor(
        address _tokenFactoryImplementation,
        address _tokenImplementation
    ) {
        tokenFactoryImplementation = _tokenFactoryImplementation;
        tokenImplementation = _tokenImplementation;
    }

    function createTokenFactory(
        address _assetAdmin,
        address _tokenController,
        address _treasury
    ) external {
        address clone = Clones.clone(tokenFactoryImplementation);
        AssetTokenFactory factory = AssetTokenFactory(clone);
        factory.initialize(
            _assetAdmin,
            tokenImplementation,
            _tokenController,
            _treasury,
            msg.sender
        );
        emit FactoryCreated(clone);
    }

    function createToken(
        AssetTokenFactory factory,
        bytes32 _salt,
        address _interchainTokenServiceAddress,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _tokenOfferingPrice
    ) external onlyFactoryOwner(factory) {
        factory.createToken(
            _salt,
            _interchainTokenServiceAddress,
            _tokenName,
            _tokenSymbol,
            _tokenOfferingPrice
        );
    }

    function issueToken(
        AssetTokenFactory factory,
        address token,
        address destinationWallet,
        uint256 amount,
        bytes calldata _data
    ) external onlyFactoryAssetAdmin(factory) {
        factory.issueToken(token, destinationWallet, amount, _data);
    }

    function addERC20PaymentMethod(
        AssetTokenFactory factory,
        address implementation,
        string memory symbol
    ) external onlyFactoryOwner(factory) {
        factory.addERC20PaymentMethod(implementation, symbol);
    }

    function removeERC20PaymentMethod(
        AssetTokenFactory factory,
        address implementation
    ) external onlyFactoryOwner(factory) {
        factory.removeERC20PaymentMethod(implementation);
    }
}
