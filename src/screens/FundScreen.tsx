import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {View, Text} from 'react-native';
import { ethers, Wallet } from "ethers";
import { BigNumber } from '@ethersproject/bignumber';
import { Colors } from '../styles';
import { TransactionResponse } from "@ethersproject/abstract-provider";




const FundScreen: React.FC<{}> = () => {
	const [state, setState] = React.useState(BigNumber.from(0));

	React.useEffect( () => {
		// createTransaction().then((complete: TransactionResponse) => {
		// 	console.log("Result", complete);
		// });
	}, []);

	return (
		<ScreenContainer>
			<Text style={{color: Colors.white}}>Balance: {state.toString()}</Text>
		</ScreenContainer>
	);
}

export default FundScreen;