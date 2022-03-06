import { useEffect, useState } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import { useEthereum } from '@decentology/hyperverse-ethereum';
import { usePfp } from '@decentology/hyperverse-ethereum-pfp';
import { toast } from 'react-toastify';
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

const Withdraw = () => {
	const { address } = useEthereum();
	const { Withdraw } = usePfp();
	const { mutate, error } = Withdraw();

	const [err, setErr] = useState('');

	const createNewInstance = async () => {
		try {
			const instanceData = {
			};

			mutate(instanceData);
		} catch (error) {
			console.log('e', error);
			throw error;

		}
	};

	useEffect(() => {
		if (error) {
			console.log(error);
			if (error instanceof Error) {
				toast.error(error.message, {
					position: toast.POSITION.BOTTOM_CENTER,
				});
			}
		}
	}, [err]);

	return (
		<Box>
			<h4>Withdraw</h4>
			<p>Only deployer can use it!</p>
			<Accordion.Root type="single" collapsible>
				<Item value="item-1">
					<TriggerContainer>
						<Trigger disabled={!address}>
							{!address ? 'Connect Wallet' : 'Withdraw'}
						</Trigger>
					</TriggerContainer>
					<Parameters>
						<Content>

							<Button onClick={createNewInstance}>
								{!address ? 'Connet Wallet' : 'Withdraw'}
							</Button>
						</Content>
					</Parameters>
				</Item>
			</Accordion.Root>
		</Box>
	);
};

export default Withdraw;
