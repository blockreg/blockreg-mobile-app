import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import { Colors, Layout, Typography } from '../styles';
import { useAppSelector } from '../hooks';
import { Blockreg } from '../types';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationProp } from '../navigation/StackParams';

const HomeScreen: React.FC<{navigation: NavigationProp}> = ({navigation}) => {
	const events = useAppSelector((state) => state.events.scanned);
	const length = Object.keys(events).length;

	const date = new Date();
	const upcomingEvents: Blockreg.Event[] = Object.values(events).filter((event) => event.date*1000 > date);

	const renderSnippet = ({item}) => (
		<Pressable  onPress={() => navigation.navigate("Event", {eventId: item.id}) }>
			<View style={{backgroundColor: Colors.darkGray, borderRadius: 15, ...Layout.padding.wide}}>
				<Text>{item.name}</Text>
				<Text>{new Date(item.date * 1000).toString()}</Text>
			</View>
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