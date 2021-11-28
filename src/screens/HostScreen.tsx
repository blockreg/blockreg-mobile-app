import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {View, Text, Pressable} from 'react-native';
import EventCard from '../components/EventCard';
import { STORAGE_KEYS } from '../Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Keychain from 'react-native-keychain';
import { Wallet } from '@ethersproject/wallet';
import { getWeb3Provider } from '../Utils';
import EventsContract from '../contracts/EventsContract';
import { Blockreg } from '../types';
import { useAppDispatch, useAppSelector } from '../hooks';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabStackParams } from '../navigation/StackParams';
import { Colors, Layout } from '../styles';
import { addHostedEvent } from '../redux/EventsSlice';

type HostScreenProps = NativeStackScreenProps<BottomTabStackParams, 'Host'>;

const HostScreen: React.FC<HostScreenProps> = ({navigation}) => {
	const dispatch = useAppDispatch();
	const events = useAppSelector((state) => state.events);

	const loadEvents = async () => {
		const publicKey = await AsyncStorage.getItem(STORAGE_KEYS.WALLET_PUBLIC_KEY);
		if ( publicKey ) {
			const credentials = await Keychain.getGenericPassword();
			if ( credentials ) {
				const wallet = new Wallet(credentials.password, getWeb3Provider());
				const contract = new EventsContract(wallet);
				const _events: Blockreg.Event[] = []; 
				try {
					for(let _event of await contract.getHostedEvents()) {
						if ( _event[0].toNumber() == 0 ) continue;
						dispatch(addHostedEvent(await contract.getEvent(_event[0].toNumber())));
					}
				} catch (e) {
					console.log(e)
				}
			}
		}
	}

	React.useEffect(() => {
		loadEvents();
	}, []);

	const renderSnippet = ({item}) => (
		<Pressable style={Layout.bottomSpacing.wide} onPress={() => navigation.navigate("Event", {eventId: item.id}) }>
			<EventCard event={item} />
		</Pressable >
	);

	return (
		<ScreenContainer>
			<SafeAreaView>
				<FlatList
					data={Object.values(events.hosted)}
					renderItem={renderSnippet}
					keyExtractor={(item) => item.id}
				/>
			</SafeAreaView>
		</ScreenContainer>
	);
}

export default HostScreen;
