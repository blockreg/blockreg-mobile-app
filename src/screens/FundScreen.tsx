import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {View, Text} from 'react-native';
import { ethers, Wallet } from "ethers";
import { BigNumber } from '@ethersproject/bignumber';
import { Colors } from '../styles';
import { TransactionResponse } from "@ethersproject/abstract-provider";


let sending = false;
// const createTransaction = async (): Promise<TransactionResponse> => {
// 	if ( sending ) return {} as TransactionResponse;
// 	sending = true;

// 	const mnemonic = don't commit your menmonic dummy;
// 	const wallet = Wallet.fromMnemonic(mnemonic);

// 	console.log("address", wallet.address);

// 	const network = "kovan";
// 	const provider = ethers.getDefaultProvider(network, {
// 		infura: "",
// 	});
// 	const signer = wallet.connect(provider);

// 	const gas = await provider.getGasPrice();
// 	console.log(gas.toString());

// 	const tx = {
// 		to: "0x356f10568FD75d77407Df29c8C4e833d095A2905",
// 		value: ethers.utils.parseEther("0.01"),
// 		nonce: await provider.getTransactionCount(wallet.address, "latest"),
// 	}
// 	console.log(tx);

// 	return signer.sendTransaction(tx);
// }

const FundScreen: React.FC<{}> = () => {
	const [state, setState] = React.useState(BigNumber.from(0));

	React.useEffect( () => {
		// createTransaction().then((complete: TransactionResponse) => {
		// 	console.log(complete);
		// });
	}, []);

	return (
		<ScreenContainer>
			<Text style={{color: Colors.white}}>Balance: {state.toString()}</Text>
		</ScreenContainer>
	);
}

export default FundScreen;