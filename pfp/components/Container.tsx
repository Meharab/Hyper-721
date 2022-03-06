import { styled } from '../stitches.config';
import ReadComponent from './ReadComponent';
import TokensOfOwner from './ReadFunctions/TokensOfOwner';
import CreateInstance from './WriteFunctions/CreateInstance';
import Withdraw from './WriteFunctions/Withdraw';
import MintNFTs from './WriteFunctions/MintNFTs';
import ReserveNFTs from './WriteFunctions/ReserveNFTs';
import { usePfp } from '@decentology/hyperverse-ethereum-pfp';

const Container = () => {

	const { Proxy } = usePfp();

	return (
		<Box>
			<h3>Token Factory Functions</h3>
			<Section>
				<CreateInstance />
				<ReadComponent
					hook={Proxy()}
					header="Get Proxy"
					description="Get your proxy contract address"
					buttonText={'Get Instance'}
					isAddress={true}
				/>
			</Section>

			<h3>Token Functions</h3>
			<Section>
				<MintNFTs />
			</Section>

			<h3>Tenant Owner Functions</h3>
			<Section>
				<TokensOfOwner />
				<ReserveNFTs />
				<Withdraw />
			</Section>
		</Box>
	);
};

export default Container;

const Box = styled('div', {
	display: 'flex',
	overflowY: 'scroll',
	flexDirection: 'column',
	marginTop: '1rem',
	borderRadius: '10px',
	backgroundColor: '$gray100',
	height: '70vh',
	padding: '0 2rem 2rem',
	color: '$blue500',
	'& h3': {
		marginTop: '2rem',
	},
});

const Section = styled('div', {
	marginTop: '1rem',
	display: 'grid',
	gridTemplateColumns: '270px 270px 270px 257px',
	gridGap: '10px',
});
