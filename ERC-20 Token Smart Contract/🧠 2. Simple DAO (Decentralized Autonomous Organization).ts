// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract BrightDAO {
    struct Proposal {
        string description;
        uint voteCount;
    }

    address public owner;
    mapping(address => bool) public members;
    Proposal[] public proposals;

    modifier onlyOwner() {
        require(msg.sender == owner, "Not DAO owner");
        _;
    }

    modifier onlyMember() {
        require(members[msg.sender], "Not a DAO member");
        _;
    }

    constructor() {
        owner = msg.sender;
        members[msg.sender] = true;
    }

    function addMember(address _member) public onlyOwner {
        members[_member] = true;
    }

    function createProposal(string memory _description) public onlyMember {
        proposals.push(Proposal({ description: _description, voteCount: 0 }));
    }

    function vote(uint _proposalIndex) public onlyMember {
        proposals[_proposalIndex].voteCount++;
    }

    function getProposalCount() public view returns (uint) {
        return proposals.length;
    }
}