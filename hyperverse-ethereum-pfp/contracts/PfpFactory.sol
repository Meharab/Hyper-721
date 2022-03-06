// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
pragma experimental ABIEncoderV2;

import './hyperverse/CloneFactory.sol';
import './hyperverse/IHyperverseModule.sol';
import './Pfp.sol';

/**
 * @dev Clone Factory Implementation for ERC20 Token
 */

contract PfpFactory is CloneFactory {
	struct Tenant {
		Pfp module;
		address owner;
	}

	mapping(address => Tenant) public tenants;
	mapping(address => bool) public instance;

	address public immutable owner;
	address public immutable masterContract;
	address private hyperverseAdmin = 0xD847C7408c48b6b6720CCa75eB30a93acbF5163D;

	modifier isOwner(address _tenant) {
		require(
			tenants[_tenant].owner == msg.sender,
			'The calling address is not an owner of a tenant'
		);
		_;
	}

	modifier isAllowedToCreateInstance(address _tenant) {
		require(
			msg.sender == _tenant || msg.sender == hyperverseAdmin,
			'Please use a valid address to create an instance'
		);
		_;
	}

	constructor(address _masterContract, address _owner) {
		masterContract = _masterContract;
		owner = _owner;
	}

	/******************* TENANT FUNCTIONALITIES *******************/

	function createInstance(address _tenant) external isAllowedToCreateInstance(_tenant) {
		Pfp m = Pfp(createClone(masterContract));

		//initializing tenant state of clone
		m.init(msg.sender);

		//set Tenant data
		Tenant storage newTenant = tenants[_tenant];
		newTenant.module = m;
		newTenant.owner = _tenant;
		instance[_tenant] = true;
	}

	function getProxy(address _tenant) public view returns (Pfp) {
		return tenants[_tenant].module;
	}
}
