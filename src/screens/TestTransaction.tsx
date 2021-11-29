import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import { StackParams } from '../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../hooks';
import { PrimaryButton } from '../components/PrimaryButton';
import { Colors, Styles, Typography } from '../styles';
import { Pressable, Text, View } from 'react-native';
import EventsContract from '../contracts/EventsContract';
import { getWeb3Provider } from '../Utils';
import { BigNumber } from '@ethersproject/bignumber';
import { ethers, Wallet } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../Constants';
import * as Keychain from 'react-native-keychain';
import { TouchableOpacity } from 'react-native-gesture-handler';

type TestTransactionProps = NativeStackScreenProps<StackParams, 'TestTransaction'>;

const TestTransaction: React.FC<TestTransactionProps> = ({route}) => {
	React.useEffect(() => {
		const contract = new EventsContract(getWeb3Provider());
		contract.createEvent({}, true).then((result) => {
			console.log(result.toString());
		}, (e) => {
			console.log('failed', e);
		});
	}, []);

	const submitToContract = async () => {
		const publicKey = await AsyncStorage.getItem(STORAGE_KEYS.WALLET_PUBLIC_KEY);

		const credentials = await Keychain.getGenericPassword();
		if ( credentials ) {
			const wallet = new Wallet(credentials.password, getWeb3Provider());
			console.log('isSigner', wallet._isSigner);
			const contract = new EventsContract(wallet);
			console.log("Calling...");
			contract.createEvent({}).then(async (tx: ethers.ContractTransaction) => {
				console.log(tx);
				await tx.wait();
				console.log("HOLY FUCKING SHIT IT WORKED");
			}, (e) => {
				console.log(e);
				console.log("it failed again.");
			})
		}

	}

	return (
		<ScreenContainer>
		<PrimaryButton label="Go" action={submitToContract} />
		</ScreenContainer>
	) 
}

export default TestTransaction;
