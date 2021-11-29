import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import { Colors, Layout, Typography } from '../styles';
import { useAppDispatch, useAppSelector } from '../hooks';
import { Blockreg } from '../types';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '../navigation/StackParams';
import EventCard from '../components/EventCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../Constants';
import { addScannedEvent } from '../redux/EventsSlice';

const HomeScreen: React.FC<{navigation: NavigationProp}> = ({navigation}) => {
	const dispatch = useAppDispatch();
	const events = useAppSelector((state) => state.events.scanned);
	const length = 0; Object.keys(events).length;

	const date = Date.now();
	const upcomingEvents: Blockreg.Event[] = [];//Object.values(events).filter((event) => parseInt(event.date) * 1000 > date);

	const loadScannedEvents = async () => {
		const jsonStr = await AsyncStorage.getItem(STORAGE_KEYS.SCANNED_EVENTS) || '{}';
		const events = JSON.parse(jsonStr);
		Object.keys(events).map(key => dispatch(addScannedEvent(events[key])));
	}

	React.useEffect(() => {
		loadScannedEvents();
	}, [])

	const renderSnippet = ({item}) => (
		<Pressable style={Layout.bottomSpacing.wide} onPress={() => navigation.navigate("Event", {eventId: item.id}) }>
			<EventCard event={item} />
		</Pressable >
	);

	return !length ? (
		<ScreenContainer centerContent={true}>
			<Text style={Typography.headlines.h1Secondary}>Looks like you're new in town.</Text>
			<Text style={Typography.headlines.h3}>Scan an event QR code to get started.</Text>
		</ScreenContainer>
	) : (
		<ScreenContainer>
			<SafeAreaView>
				<Text style={[Layout.bottomSpacing.wide, Layout.topSpacing.wide, Typography.headlines.h1]}>Upcoming Events</Text>
				<FlatList
					data={upcomingEvents}
					renderItem={renderSnippet}
					keyExtractor={(item) => item.id}
				/>
			</SafeAreaView>
		</ScreenContainer>
	);
}

export default HomeScreen;