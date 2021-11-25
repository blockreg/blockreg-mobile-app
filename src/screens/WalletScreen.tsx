import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {StyleSheet, Text, View} from 'react-native';
import { Colors, Styles, Typography } from '../styles';
import { isFaceIdAvailable, requestFaceId } from './Utils';
import { headlines } from '../styles/typography';
import { TextInput } from 'react-native-gesture-handler';
import { PrimaryButton } from '../components/PrimaryButton';
import ReactNativeBiometrics from 'react-native-biometrics';
import { Wallet } from '@ethersproject/wallet';
import * as Keychain from 'react-native-keychain';


const WalletScreen: React.FC<{}> = () => {
	const [faceIdPermission, setFaceIdPermission] = React.useState(false);
	const [mnemonic, setMnemonic] = React.useState("");

	const initFaceId = async () => {
		const available = await isFaceIdAvailable();
		setFaceIdPermission(available);

		if ( !available ) {
			const granted = await requestFaceId(); 
			setFaceIdPermission(granted);
		};
	}

	React.useEffect( () => {
		initFaceId();
	}, []);

	const createWallet = async () => {
		const _mnemonic = mnemonic;
		setMnemonic(""); // Reset the text field

		await Keychain.setGenericPassword("mnemonic", _mnemonic, {accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_CURRENT_SET});

		// const credentials = await Keychain.getGenericPassword();

	}

	return (true) ? (
		<ScreenContainer>
			<View style={{...Styles.formGroup}}>
				<Text style={{...Typography.readable}}>Enter your wallet's 12-word mnemonic to enable transactions in the app.</Text>
				<Text style={Styles.smallLabel}>Mnemonic</Text>
				<TextInput 
					value={mnemonic}
					style={Styles.formTextInput} 
					onChange={({nativeEvent:{text}}) => setMnemonic(text)} 
					autoCapitalize="none"
					autoCorrect={false}
				/>
			</View>
			<PrimaryButton label="Add wallet" action={createWallet}></PrimaryButton>
		</ScreenContainer>
	) : (
		<ScreenContainer centerContent={true}>
			<Text style={{...headlines.h2}}>FaceID is required to use this app.</Text>
			<Text style={{...headlines.sub2}}>Go to Settings > FaceID & Passcode > Other Apps</Text>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({

});

export default WalletScreen;