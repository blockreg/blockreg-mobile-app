import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {Text, StyleSheet, SafeAreaView, View, Dimensions, TextInput, Pressable} from 'react-native';
import { Colors, Layout, Styles, Typography } from '../styles';
import { StackParams } from '../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '../hooks';
import QRDisplay from '../components/QRDisplay';
import { ScrollView } from 'react-native-gesture-handler';
import { PrimaryButton } from '../components/PrimaryButton';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../Constants';
import * as Keychain from 'react-native-keychain';
import EventsContract from '../contracts/EventsContract';
import { getWeb3Provider } from '../Utils';
import { Blockreg } from '../types';
import RegistrationsContract from '../contracts/RegistrationsContract';
import { Wallet } from '@ethersproject/wallet';



type EventScreenProps = NativeStackScreenProps<StackParams, 'Event'>;
enum EventScreenTabs {
	Description,
	QRCode,
	Registrations,
}
const EventScreen: React.FC<EventScreenProps> = ({navigation, route}) => {
	const event = useAppSelector((state) => {
		return (state.events.hosted[route.params.eventId]) ? 
		state.events.hosted[route.params.eventId]
		: state.events.scanned[route.params.eventId];
	});
	const [isLoaded, setIsLoaded] = React.useState(false);
	const [tab, setTab] = React.useState(EventScreenTabs.Description);
	const [isOwnedBy, setIsOwnedBy] = React.useState(false);
	const [registrations, setRegistrations] = React.useState<Blockreg.Registration[]>([]);
	const [hasRegistered, setHasRegistered] = React.useState(false);

	const checkOwnership = async () => {
		const contract = new EventsContract(getWeb3Provider());
		const address = await AsyncStorage.getItem(STORAGE_KEYS.WALLET_ADDRESS) || '';
		contract.isEventOwner(event.id, address).then(async (owner: boolean) => {
			if ( owner ) {
				const credentials = await Keychain.getGenericPassword();
				if ( credentials ) {
					const wallet = new Wallet(credentials.password, getWeb3Provider());
					const contract = new RegistrationsContract(wallet);

					contract.getEventRegistrations(event.id);
				}
			}
			setIsOwnedBy(owner);
		});
	}

	const isRegistered = async () => {
	const contract = new RegistrationsContract(getWeb3Provider());
		//TODO: Allow people who are registered to recall their credentials
	}

	React.useEffect(() => {
		if ( event ) {
			checkOwnership();
			setIsLoaded(true);
		}
	}, []);


	return (isLoaded) ? (
			<><ScrollView style={_styles.container}>
				
				<Text style={Styles.smallLabel}>Event</Text>
				<Text style={_styles.name}>{event.name}</Text>

				<View style={_styles.tabs}>
					<Pressable style={( tab == EventScreenTabs.Description ) ? _styles.selected : _styles.tab} onPress={() => setTab(EventScreenTabs.Description)}>
						<Text style={ _styles.tabText}>Description</Text>
					</Pressable>
					<Pressable style={( tab == EventScreenTabs.QRCode ) ? _styles.selected : _styles.tab} onPress={() => setTab(EventScreenTabs.QRCode)}>
						<Text style={ _styles.tabText}>QR Code</Text>
					</Pressable>
					{(isOwnedBy) ? (
						<Pressable style={( tab == EventScreenTabs.Registrations ) ? _styles.selected : _styles.tab} onPress={() => setTab(EventScreenTabs.Registrations)}>
							<Text style={ _styles.tabText}>Registrations</Text>
						</Pressable>
					): (<></>)}
					
				</View>
				
				{
					(tab == EventScreenTabs.Description) ? (
						<><Text style={Styles.smallLabel}>Description</Text>
						<Text style={Typography.readable}>{event.description}</Text>

						<Text style={Styles.smallLabel}>Date</Text>
						<Text style={Typography.readable}>{event.dateReadable}</Text>

						<Text style={Styles.smallLabel}>Fee</Text>
						<Text style={Typography.readable}>{event.feeReadable}</Text></>
					) : (tab == EventScreenTabs.QRCode) ? (
						<><Text style={Styles.smallLabel}>Event QR Code</Text>
						<QRDisplay eventId={event.id} /></>
					) : (isOwnedBy && tab == EventScreenTabs.Registrations) ? ( 
						<>
							
						</>
					) : ( 
						<></>
					)
				}
				

				
				<View style={{marginBottom: 150}} />
			</ScrollView>
			<View style={_styles.cta}>

				<PrimaryButton action={()=>navigation.navigate("RBSlide1", {eventId: event.id})} label="Register"></PrimaryButton>
			</View></>
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
	tabs: {
		flexDirection: 'row',
		justifyContent: 'flex-start',
		...Layout.topSpacing.regular,
		...Layout.bottomSpacing.regular,
	},
	tabText: {
		color: Colors.white,
		...Typography.headlines.h3
	},
	tab: {
		marginRight: 16,
	},
	selected: {
		marginRight: 16,
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary,
	},
	cta: {
		backgroundColor: Colors.black,
		width: Dimensions.get('screen').width,
		position: 'absolute',
		bottom: 0,
		paddingBottom: 30,
		
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
