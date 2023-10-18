// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/proxy/Clones.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/interfaces/IERC20.sol";
import "./assetToken.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";

contract AssetTokenFactory is
    Initializable,
    OwnableUpgradeable,
    ReentrancyGuardUpgradeable
{
    address public assetAdmin;
    address public tokenImplementation;
    address public defaultTokenController;
    address public treasury;
    address factory;

    AssetToken[] internal tokens;

    mapping(address => ERC20PaymentMethod) erc20PaymentMethods;

    struct ERC20PaymentMethod {
        IERC20 implementation;
        string symbol;
    }

    event TokenCreated(address contractAddress);

    modifier onlyAuthorized() {
        require(msg.sender == factory || msg.sender == owner());
        _;
    }

    function initialize(
        address _assetAdmin,
        address _tokenClone,
        address _tokenController,
        address _treasury,
        address _owner
    ) public initializer {
        assetAdmin = _assetAdmin;
        tokenImplementation = _tokenClone;
        defaultTokenController = _tokenController;
        treasury = _treasury;
        factory = msg.sender;
        __Ownable_init(msg.sender);
        transferOwnership(_owner);
    }

    function createToken(
        bytes32 _salt,
        address _interchainTokenServiceAddress,
        string memory _tokenName,
        string memory _tokenSymbol,
        uint256 _tokenOfferingPrice
    ) external onlyAuthorized {
        address clone = Clones.clone(tokenImplementation);
        AssetToken token = AssetToken(clone);
        token.initialize(
            _salt,
            _tokenName,
            _tokenSymbol,
            assetAdmin,
            defaultTokenController,
            _interchainTokenServiceAddress,
            _tokenOfferingPrice
        );
        tokens.push(token);
        emit TokenCreated(clone);
    }

    function issueToken(
        address _token,
        address _tokenHolder,
        uint256 _value,
        bytes calldata _data
    ) external {
        require(msg.sender == factory);
        AssetToken token = AssetToken(_token);
        token.issue(_tokenHolder, _value, _data);
    }

    function tokenOffering(
        uint256 _tokenAmount,
        AssetToken _token,
        address _paymentMethod
    ) external nonReentrant {
        ERC20PaymentMethod memory paymentMethod = erc20PaymentMethods[
            _paymentMethod
        ];

        if (address(paymentMethod.implementation) == address(0))
            revert("ERR_INVALID_PAYMENT_METHOD");

        IERC20 erc20PaymentToken = paymentMethod.implementation;

        uint256 cost = _tokenAmount * _token.tokenOfferingPrice();
        uint256 userBalance = erc20PaymentToken.balanceOf(msg.sender);
        require(userBalance >= cost, "ERR_INSUFFICIENT_FUNDS");

        transferERC20(erc20PaymentToken, treasury, cost);
        _token.tokenOffering(msg.sender, _tokenAmount, "");
    }

    function transferERC20(
        IERC20 token,
        address to,
        uint256 amount
    ) public nonReentrant {
        address from = msg.sender;
        token.transferFrom(from, to, amount);
    }

    function addERC20PaymentMethod(
        address implementation,
        string memory symbol
    ) external onlyAuthorized {
        erc20PaymentMethods[implementation] = ERC20PaymentMethod(
            IERC20(implementation),
            symbol
        );
    }

    function removeERC20PaymentMethod(
        address implementation
    ) external onlyAuthorized {
        delete erc20PaymentMethods[implementation];
    }
}
