import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import { Text, View} from 'react-native';
import { Layout, Styles, Typography } from '../styles';
import { getWeb3Provider, isFaceIdAvailable, requestFaceId } from '../Utils';
import { headlines } from '../styles/typography';
import { TextInput } from 'react-native-gesture-handler';
import { PrimaryButton } from '../components/PrimaryButton';
import { Wallet } from '@ethersproject/wallet';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import { STORAGE_KEYS } from '../Constants';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setBalance, setConnectingWallet, setFaceIdPermission, setMnemonic, setPublicKey } from '../redux/WalletSlice';
import SvgEthereumLine from '../custom-icons/EthereumLine';
import { Colors } from '../styles';



const WalletScreen: React.FC<{}> = () => {
	const state = useAppSelector((state) => state.wallet);
	const dispatch = useAppDispatch();

	const initFaceId = async (): Promise<boolean> => {
		const available = await isFaceIdAvailable();

		if ( !available ) {
			const granted = await requestFaceId(); 
			return granted;
		};

		return true;
	}

	const initWallet = async() => {
		const isFaceIdAvailable = await initFaceId();
		dispatch(setFaceIdPermission(isFaceIdAvailable));

		if ( isFaceIdAvailable ) {
			AsyncStorage.getItem(STORAGE_KEYS.WALLET_PUBLIC_KEY).then(async (key) => {
				if ( key ) {
					const credentials = await Keychain.getGenericPassword();
					if ( credentials ) {
						dispatch(setPublicKey(key));
						const wallet = new Wallet(credentials.password, getWeb3Provider());
						const balance = await wallet.getBalance();
						dispatch(setBalance(balance.toString()));
					}
				}
			});
		}
	}

	React.useEffect( () => {
		initWallet();
	}, []);

	const createWallet = async () => {
		dispatch(setConnectingWallet(true));
		setTimeout(() => {
			try {
				const wallet = Wallet.fromMnemonic(state.mnemonic);
				Keychain.setGenericPassword(state.mnemonic, wallet.privateKey, {accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET});
				AsyncStorage.setItem(STORAGE_KEYS.WALLET_PUBLIC_KEY, wallet.publicKey);
				initWallet();
			} catch (e) {
				dispatch(setConnectingWallet(false));
			}
		});
	}

	if (state.faceIdPermission) {
		return (!state.publicKey) ? (
			<ScreenContainer>
				{
				(state.connectingWallet) ? (
					<View style={{...Layout.fullFlexCentered}}>
						<Text style={{...headlines.h2}}>Connecting wallet...</Text>
					</View>
				) : (
					<>
						<View style={{...Styles.formGroup}}>
							<Text style={{...Typography.readable}}>Enter your wallet's 12-word mnemonic to enable transactions in the app.</Text>
							<Text style={Styles.smallLabel}>Mnemonic</Text>
							<TextInput 
								value={state.mnemonic}
								style={Styles.formTextInput} 
								onChange={({nativeEvent:{text}}) => dispatch(setMnemonic(text))} 
								autoCapitalize="none"
								autoCorrect={false}
								autoFocus={true}
								onSubmitEditing={createWallet}
								returnKeyType={'send'}
							/>
						</View>
						<PrimaryButton label="Add wallet" action={createWallet}></PrimaryButton>
					</>
				)}
			</ScreenContainer>
		) : (
			<ScreenContainer>
				<View style={{...Layout.fullFlexCentered}}>
					<Text style={{...headlines.h1}}>
					<SvgEthereumLine color={Colors.white} size={28}/> {state.balance}
					</Text>
					<Text style={{...headlines.h3}}>
						 Eth Balance
					</Text>
				</View>
			</ScreenContainer>
		)
	} else {
		return (
			<ScreenContainer centerContent={true}>
				<Text style={{...headlines.h2}}>FaceID is required to use this app.</Text>
				<Text style={{...headlines.sub2}}>Go to Settings > FaceID & Passcode > Other Apps</Text>
			</ScreenContainer>
		);
	}
}


export default WalletScreen;