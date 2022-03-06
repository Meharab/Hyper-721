import { useState, useEffect, useCallback, useMemo } from 'react';
import { useQuery, useMutation, UseMutationOptions } from 'react-query';
import { ethers } from 'ethers';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { FACTORY_ABI, PFP_ABI, FACTORY_ADDRESS, PFP_ADDRESS } from './constants';
import { createContainer, useContainer } from '@decentology/unstated-next';

type ContractState = ethers.Contract;

function PfpState(initialState: { tenantId: string } = { tenantId: '' }) {
	const { tenantId } = initialState;
	const { address, web3Provider, provider } = useEthereum();
	const [factoryContract, setFactoryContract] = useState<ContractState>(
		new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, provider) as ContractState
	);
	const [proxyContract, setProxyContract] = useState<ContractState>();

	const signer = useMemo(async () => {
		return web3Provider?.getSigner();
	}, [web3Provider]);

	useEffect(() => {
		const fetchContract = async () => {
			const proxyAddress = await factoryContract.getProxy(tenantId);
			const proxyCtr = new ethers.Contract(proxyAddress, PFP_ABI, provider);
			const accountSigner = await signer;
			if (accountSigner) {
				setProxyContract(proxyCtr.connect(accountSigner));
			} else {
				setProxyContract(proxyCtr);
			}
		};
		fetchContract();
	}, [factoryContract, tenantId, provider, signer]);

	const setup = useCallback(async () => {
		const accountSigner = await signer;
		if (accountSigner) {
			const ctr = factoryContract.connect(accountSigner) as ContractState;
			setFactoryContract(ctr);
		}
		// We have a defualt contract that has no signer. Which will work for read-only operations.
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [signer]);


	const errors = (err: any) => {
		if (!factoryContract?.signer) {
			throw new Error('Please connect your wallet!');
		}

		if (err.code === 4001) {
			throw new Error('You rejected the transaction!');
		}

		throw err;
	};

	useEffect(() => {
		if (web3Provider) {
			setup();
		}
	}, [web3Provider]);

	const checkInstance = useCallback(
		async (account: any) => {
			try {
				const instance = await factoryContract.instance(account);
				return instance;
			} catch (err) {
				return false;
			}
		},
		[factoryContract]
	);

	const createInstance = useCallback(async () => {
		try {
			const createTxn = await factoryContract.createInstance();
			return createTxn.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	}, [factoryContract]);

	const getProxy = async (account: string | null) => {
		try {
			const proxyAccount = await factoryContract.getProxy(account);
			return proxyAccount;
		} catch (err) {
			errors(err);
			throw err;
		}
	};


	const tokensOfOwner = async (_owner: string) => {
		try {
			const tokensOfOwner = await proxyContract?.tokensOfOwner(_owner);
			return tokensOfOwner;
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const mintNFTs = async (count: number) => {
		try {
			const mint = await proxyContract?.mintNFTs(count);
			return mint.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const reserveNFTs = async () => {
		try {
			const mint = await proxyContract?.reserveNFTs();
			return mint.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	const withdraw = async () => {
		try {
			const mint = await proxyContract?.withdraw();
			return mint.wait();
		} catch (err) {
			errors(err);
			throw err;
		}
	};

	return {
		tenantId,
		factoryContract,
		proxyContract,
		CheckInstance: () =>
			useQuery(['checkInstance', address, factoryContract?.address], () => checkInstance(address), {
				enabled: !!address && !!factoryContract?.address,
			}),
		NewInstance: (
			options?: Omit<UseMutationOptions<unknown, unknown, void, unknown>, 'mutationFn'>
		) => useMutation(createInstance, options),

		Proxy: () =>
			useQuery(['getProxy', address, factoryContract?.address], () => getProxy(address), {
				enabled: !!address && !!factoryContract?.address,
			}),

		TokensOfOwner: (owner: string) =>
			useQuery(['tokensOfOwner', address, { owner }], () => tokensOfOwner(owner), {
				enabled: !!proxyContract?.signer && !!address,
			}),

		MintNFTs: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{ count: number },
					unknown
				>,
				'mutationFn'
			>
		) => useMutation(({ count }) => mintNFTs(count), options),

		ReserveNFTs: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{  },
					unknown
				>,
				'mutationFn'
			>
		) => useMutation(({  }) => reserveNFTs(), options),

		Withdraw: (
			options?: Omit<
				UseMutationOptions<
					unknown,
					unknown,
					{  },
					unknown
				>,
				'mutationFn'
			>
		) => useMutation(({  }) => withdraw(), options),

	}
}

export const Pfp = createContainer(PfpState);

export function usePfp() {
	return useContainer(Pfp);
}
