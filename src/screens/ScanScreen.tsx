import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {View, Text, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import { NavigationProp } from '../navigation/StackParams';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { fullFlexCentered } from '../styles/layout';

const ScanScreen: React.FC<{navigation: NavigationProp }> = ({navigation}) => {

	type EventQRCode = {
		eventId: number,
		cid: string
	}
	const onSuccess = (event: BarCodeReadEvent) => {
		const qrData: EventQRCode = JSON.parse(event.data);
		if ( qrData.eventId && qrData.cid ) {
			navigation.navigate("Event", {eventId: qrData.eventId, cid: qrData.cid});
			setTimeout(() => this.scanner.reactivate(), 500);
		}
	};

	return (
		<View style={styles.section}>
			<QRCodeScanner
				ref={(node) => { this.scanner = node }}
				onRead={onSuccess}
			/>
		</View>
	);
}

const styles = {
	section: {
		...fullFlexCentered,
		backgroundColor: Colors.black
	}
}

export default ScanScreen;