import * as React from 'react';
import {View, Text, Alert} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { BarCodeReadEvent, RNCamera } from 'react-native-camera';
import { NavigationProp } from '../navigation/StackParams';
import { fullFlexCentered } from '../styles/layout';
import EventsContract from '../contracts/EventsContract';
import { getWeb3Provider } from '../Utils';
import * as Colors from '../styles/colors';
import { text } from '../styles/typography';
import { addScannedEvent } from '../redux/EventsSlice';
import { useAppDispatch } from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../Constants';
import { Blockreg } from '../types';


const ScanScreen: React.FC<{navigation: NavigationProp }> = ({navigation}) => {
	const dispatch = useAppDispatch();
	const [scanMessage, setScanMessage] = React.useState("Scan an event or attendee QR code");

	type EventQRCode = {
		eventId: number,
		cid: string,
	}

	const _storeEventLocally = async (event: Blockreg.Event) => {
		const str = await AsyncStorage.getItem(STORAGE_KEYS.SCANNED_EVENTS) || '{}';
		let items = JSON.parse(str);
		items[event.id] = event;
		AsyncStorage.setItem(STORAGE_KEYS.SCANNED_EVENTS, JSON.stringify(items));
	}
	
	const onSuccess = async (event: BarCodeReadEvent) => {
		const qrData: EventQRCode = JSON.parse(event.data);
		if ( qrData.eventId ) {
			const contract = new EventsContract(getWeb3Provider());
			try {
				setScanMessage("Loading...");
				const event = await contract.getEvent(qrData.eventId);
				dispatch(addScannedEvent(event));
				navigation.navigate("Event", {eventId: qrData.eventId});

				// TODO: Make this generic someplace else
				_storeEventLocally(event);
				
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