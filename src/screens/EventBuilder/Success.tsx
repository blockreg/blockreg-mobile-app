import * as React from 'react';
import ScreenContainer from '../ScreenContainer';
import { StackParams } from '../../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import QRCode from 'react-native-qrcode-svg';
import { useAppSelector } from '../../hooks';
import EventsContract from '../../contracts/EventsContract';
import { getWeb3Provider } from '../../Utils';
import { headlines } from '../../styles/typography';
import EventCard from '../../components/EventCard';
import QRDisplay from '../../components/QRDisplay';

type SuccessScreenProps = NativeStackScreenProps<StackParams, 'EBSuccess'>;

const Slide: React.FC<SuccessScreenProps> = ({navigation, event}) => {
	return (
		<ScreenContainer>
			<Text style={headlines.h1Secondary}>Success!</Text>
			<EventCard event={event} />
			<Text style={headlines.h2}>Event QR Code</Text>
			<Text style={headlines.sub1}>Your attendees will need this to register.</Text>
			<QRDisplay eventId={event.id} />
		</ScreenContainer>
	);
};

const _styles = StyleSheet.create({
	container: {
		width: "100%",
		backgroundColor: Colors.black, 
		flex: 1, 
		alignItems: 'flex-start', 
		justifyContent: 'flex-start',
	}
});

export default Slide;