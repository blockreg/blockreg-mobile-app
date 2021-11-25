import * as React from 'react';
import {View, Text, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import { NavigationProp } from '../navigation/StackParams';
import { fullFlexCentered } from '../styles/layout';
import EventsContract from '../contracts/Events';
import { getWeb3Provider } from './Utils';
import * as Colors from '../styles/colors';
import { text } from '../styles/typography';
import { addEvent } from '../redux/EventsSlice';
import { useAppDispatch } from '../hooks';

const ScanScreen: React.FC<{navigation: NavigationProp }> = ({navigation}) => {
	const dispatch = useAppDispatch();
	const [scanMessage, setScanMessage] = React.useState("Scan an event or attendee QR code");

	type EventQRCode = {
		eventId: number,
		cid: string,
	}
	
	const onSuccess = async (event: BarCodeReadEvent) => {
		const qrData: EventQRCode = JSON.parse(event.data);
		if ( qrData.eventId ) {
			const contract = new EventsContract(getWeb3Provider());
			try {
				setScanMessage("Loading...");
				const event = await contract.getEvent(qrData.eventId);
				dispatch(addEvent(event));
				navigation.navigate("Event", {eventId: qrData.eventId});
				setTimeout(() => this.scanner.reactivate(), 1000);
			} catch (e) {
				console.log(e);
				const origMessage = scanMessage;
				setScanMessage("That event isn't available.");
				setTimeout(() => {
					this.scanner.reactivate();
					setScanMessage(origMessage);
				}, 3000);
			}
		}
	};

	return (
		<View style={styles.section}>
			<QRCodeScanner
				ref={(node) => { this.scanner = node }}
				onRead={onSuccess}
				bottomContent={(
					<View><Text style={styles.message}>{scanMessage}</Text></View>
				)}
			/>
		</View>
	);
}

const styles = {
	section: {
		...fullFlexCentered,
		backgroundColor: Colors.black
	},
	message: {
		color: Colors.white,
		...text.medium,
	}

}

export default ScanScreen;