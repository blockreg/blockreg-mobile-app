import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {Text, StyleSheet, SafeAreaView} from 'react-native';
import { Colors, Layout, Typography } from '../styles';
import { StackParams } from '../navigation/StackParams';
import { BASE_IPFS_URL } from '../Constants';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type EventScreenProps = NativeStackScreenProps<StackParams, 'Event'>;

const EventScreen: React.FC<EventScreenProps> = ({route}) => {
	const [state, setState] = React.useState({event: {name: "", description: ""}});
	const {eventId, cid} = route.params;
	let message = "Loading...";
	let isLoaded = false;

	React.useEffect(() => {
		fetch(`${BASE_IPFS_URL}${cid}`).then(async (response) => {
			if ( !response.ok )
				return console.log("Event data couldn't be loaded. "+`${BASE_IPFS_URL}${cid}`);
			
			const event = await response.json();
			setState({event});
			isLoaded = true;
		}, (error) => {
			console.log("Failed to fetch", error);
		});
	}, []);

	return (
		<ScreenContainer>
			<SafeAreaView style={styles.container}>
				<Text style={Typography.labels.small}>Event</Text>
				<Text style={styles.name}>{state.event.name}</Text>
				
				<Text style={{...Typography.labels.small, ...Layout.verticalSpacing.regular}}>Description</Text>
				<Text style={Typography.readable}>Description {state.event.description}</Text>

			</SafeAreaView>
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
})
