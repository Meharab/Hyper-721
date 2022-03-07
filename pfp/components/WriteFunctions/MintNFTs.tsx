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

const MintNFTs = () => {
	const { address } = useEthereum();
	const { MintNFTs } = usePfp();
	const { mutate } = MintNFTs();
	const [count, setCount] = useState(0);

	const mint = async () => {
		try {
			const instanceData = {
        count: count,
			};

			mutate(instanceData);
		} catch (error) {
			throw error;
		}
	};

	return (
		<Box>
			<h4>Mint</h4>
			<p>Get your PFP NFT</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Mint NFTs'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								type="number"
								min="0"
								placeholder="Count"
								onChange={(e) => setCount(e.currentTarget.valueAsNumber)}
							/>
							<Button onClick={MintNFTs}>
								{!address ? 'Connet Wallet' : 'Mint NFTs'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default MintNFTs;
