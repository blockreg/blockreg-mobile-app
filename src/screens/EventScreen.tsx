import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {Text, StyleSheet, SafeAreaView, View} from 'react-native';
import { Colors, Layout, Styles, Typography } from '../styles';
import { StackParams } from '../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '../hooks';
import QRDisplay from '../components/QRDisplay';
import { ScrollView } from 'react-native-gesture-handler';


type EventScreenProps = NativeStackScreenProps<StackParams, 'Event'>;

const EventScreen: React.FC<EventScreenProps> = ({route}) => {
	const event = useAppSelector((state) => {
		return (state.events.hosted[route.params.eventId]) ? 
		state.events.hosted[route.params.eventId]
		: state.events.scanned[route.params.eventId];
	});
	const [isLoaded, setIsLoaded] = React.useState(false);

	React.useEffect(() => {
		if ( event ) {
			setIsLoaded(true);
		}
	}, []);

	return (isLoaded) ? (
			<ScrollView style={_styles.container}>
				<Text style={Styles.smallLabel}>Event</Text>
				<Text style={_styles.name}>{event.name}</Text>
				
				<Text style={Styles.smallLabel}>Description</Text>
				<Text style={Typography.readable}>{event.description}</Text>

				<Text style={Styles.smallLabel}>Date</Text>
				<Text style={Typography.readable}>{event.dateReadable}</Text>

				<Text style={Styles.smallLabel}>Fee</Text>
				<Text style={Typography.readable}>{event.feeReadable}</Text>

				<Text style={Styles.smallLabel}>Event QR Code</Text>
				<QRDisplay eventId={event.id} />
			</ScrollView>
	) : (
		<ScreenContainer centerContent={true}>
			<Text>
				Loading...
			</Text>
		</ScreenContainer>
	);
}

export default EventScreen;

const _styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.black,
		...Layout.flex.column,
		...Layout.padding.screen,
	},
	name: {
		color: Colors.secondary,
		...Typography.headlines.h1,
	},
	description: {
		color: Colors.white,
		...Typography.text.small
	}
});
