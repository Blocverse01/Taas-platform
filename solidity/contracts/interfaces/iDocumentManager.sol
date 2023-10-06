// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IDocumentManager {
    // Document Management
    function getDocument(
        bytes32 _name
    ) external view returns (string calldata, bytes32, uint256);

    function setDocument(
        bytes32 _name,
        string calldata _uri,
        bytes32 _documentHash
    ) external;

    function removeDocument(bytes32 _name) external;

    function getAllDocuments() external view returns (bytes32[] calldata);

    // Document Events
    event DocumentRemoved(
        bytes32 indexed _name,
        string _uri,
        bytes32 _documentHash
    );
    event DocumentUpdated(
        bytes32 indexed _name,
        string _uri,
        bytes32 _documentHash
    );
}