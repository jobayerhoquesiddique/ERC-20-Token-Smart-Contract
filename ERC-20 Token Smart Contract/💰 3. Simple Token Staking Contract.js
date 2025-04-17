// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IERC20 {
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);
    function transfer(address recipient, uint256 amount) external returns (bool);
}

contract BrightStaking {
    IERC20 public token;
    mapping(address => uint256) public stakingBalance;
    mapping(address => uint256) public stakingTimestamp;

    constructor(address _tokenAddress) {
        token = IERC20(_tokenAddress);
    }

    function stake(uint256 _amount) public {
        require(_amount > 0, "Amount must be > 0");
        token.transferFrom(msg.sender, address(this), _amount);
        stakingBalance[msg.sender] += _amount;
        stakingTimestamp[msg.sender] = block.timestamp;
    }

    function withdraw() public {
        uint256 balance = stakingBalance[msg.sender];
        require(balance > 0, "Nothing to withdraw");

        // Optional: Simple interest reward logic
        uint256 timeStaked = block.timestamp - stakingTimestamp[msg.sender];
        uint256 reward = (balance * timeStaked) / 1 weeks; // Very basic reward calc

        token.transfer(msg.sender, balance + reward);
        stakingBalance[msg.sender] = 0;
    }
}