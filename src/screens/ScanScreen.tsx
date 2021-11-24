import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {View, Text, Alert} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const ScanScreen: React.FC<{}> = () => {

	const onSuccess = () => {
		Alert.alert("It scanned!");	
	};

	return (
		<ScreenContainer>
			<QRCodeScanner
				onRead={onSuccess}
			/>
		</ScreenContainer>
	);
}

export default ScanScreen;