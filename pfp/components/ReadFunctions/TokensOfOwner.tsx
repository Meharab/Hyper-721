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

const TokensOfOwner = () => {
	const { address } = useEthereum();
	const { TokensOfOwner } = usePfp();
	const [owner, setOwner] = useState('');
	const [spender, setSpender] = useState('');
	const { data, refetch } = TokensOfOwner(owner!);
	const [hidden, setHidden] = useState(false);

	return (
		<Box>
			<h4>Tokens Of Owner</h4>
			<p>Checks the amount of tokens that an owner have</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Tokens Of Owner'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>
							<Input
								placeholder="Owner "
								onChange={(e) => setOwner(e.target.value)}
							/>

							<Button
								onClick={() => {
									refetch();
									setHidden((p) => !p);
								}}
							>
								{!address ? 'Connect Wallet' : !hidden ? 'Tokens Of Owner' : data}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default TokensOfOwner;
