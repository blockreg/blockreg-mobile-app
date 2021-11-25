import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {Text, StyleSheet, SafeAreaView, View} from 'react-native';
import { Colors, Layout, Styles, Typography } from '../styles';
import { StackParams } from '../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Events from '../contracts/Events';
import { getWeb3Provider } from './Utils';

type EventScreenProps = NativeStackScreenProps<StackParams, 'Event'>;

const EventScreen: React.FC<EventScreenProps> = ({route}) => {
	const initState: Events = {} as Events;
	const [event, setEvent] = React.useState(initState);
	const [isLoaded, setIsLoaded] = React.useState(false);

	React.useEffect(() => {
		const events = new Events(getWeb3Provider());
		events.getEvent(route.params.eventId).then((event) => {
			setEvent(event);
			setIsLoaded(true);
		})
	}, []);

	return (isLoaded) ? (
		<ScreenContainer>
			<SafeAreaView>
				<Text style={Styles.smallLabel}>Event</Text>
				<Text style={styles.name}>{event.name}</Text>
				
				<Text style={Styles.smallLabel}>Description</Text>
				<Text style={Typography.readable}>{event.description}</Text>

				<Text style={Styles.smallLabel}>Date</Text>
				<Text style={Typography.readable}>{event.date.toString()}</Text>

				<Text style={Styles.smallLabel}>Fee</Text>
				<Text style={Typography.readable}>{event.fee.toString()}</Text>
			</SafeAreaView>
		</ScreenContainer>
	) : (
		<ScreenContainer centerContent={true}>
			<Text>
				Loading...
			</Text>
		</ScreenContainer>
	);
}

export default EventScreen;

const styles = StyleSheet.create({
	name: {
		color: Colors.secondary,
		...Typography.headlines.h1,
	},
	description: {
		color: Colors.white,
		...Typography.text.small
	}
});
