import { useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { usePfp } from '@decentology/hyperverse-ethereum-pfp';
import {
	Box,
	Item,
	TriggerContainer,
	Trigger,
	Parameters,
	Input,
	Content,
	Button,
} from '../ComponentStyles';

const ReserveNFTs = () => {
	const { address } = useEthereum();
	const { ReserveNFTs } = usePfp();
	const { mutate } = ReserveNFTs();

	const approve = async () => {
		try {
			const instanceData = {
			};

			mutate(instanceData);
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Reserve NFTs</h4>
			<p> Only deployer can use it</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Reserve NFTs'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Button onClick={approve}>
								{!address ? 'Connet Wallet' : 'Reserve NFTs'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default ReserveNFTs;
