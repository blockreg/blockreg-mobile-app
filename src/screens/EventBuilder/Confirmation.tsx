import * as React from 'react';
import ScreenContainer from '../ScreenContainer';
import { StackParams } from '../../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppSelector } from '../../hooks';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Colors, Layout, Styles, Typography } from '../../styles';
import { StyleSheet, Text, View } from 'react-native';
import EventsContract from '../../contracts/EventsContract';
import { getWeb3Provider } from '../../Utils';
import { ethers, Wallet } from 'ethers';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../Constants';
import * as Keychain from 'react-native-keychain';
import { bottomSpacing } from '../../styles/layout';
import { headlines } from '../../styles/typography';
import { ScrollView } from 'react-native-gesture-handler';
import EventCard from '../../components/EventCard';


type EventScreenProps = NativeStackScreenProps<StackParams, 'EventBuilder'>;

const Slide: React.FC<EventScreenProps> = ({navigation}) => {
	const event = useAppSelector((state) => state.eventBuilder);
	const [gas, setGas] = React.useState("");
	const [submitted, setSubmitted] = React.useState(false);

	React.useEffect(() => {
		const contract = new EventsContract(getWeb3Provider());
		contract.createEvent(event, true).then((result) => {
			setGas(result.toString());
		}, (e) => {
			setGas("Could not estimate gas");
		});
	}, []);

	const submitToContract = async () => {
		const publicKey = await AsyncStorage.getItem(STORAGE_KEYS.WALLET_PUBLIC_KEY);
		if ( !publicKey )
			return navigation.navigate('Wallet');

		const credentials = await Keychain.getGenericPassword();
		if ( credentials ) {
			const wallet = new Wallet(credentials.password, getWeb3Provider());
			const contract = new EventsContract(wallet);

			contract.createEvent(event).then(async (tx: ethers.ContractTransaction) => {
				setSubmitted(true);
				await tx.wait();
				AsyncStorage.getItem(STORAGE_KEYS.HOSTED_EVENTS);
				console.log("SUCCESS", tx);
				const events = await contract.getHostedEvents();
				console.log(events);
				const newEvent = events.pop();
				navigation.navigate('EBSuccess', {event: newEvent});
			}, (e) => {
				console.log(e);
				setSubmitted(false);
			})
		} 
	}

	return (!submitted) ? (
		<View style={_styles.container}>
			<ScrollView>
				<View style={{...Styles.formGroup, ...Layout.padding.screen}}>
					<Text style={[headlines.h1]}>Confirm details</Text>
					<Text style={[Styles.smallLabel,bottomSpacing.wide]}>{(gas) ? `Estimated gas ${gas}` : ""}</Text>
				</View>
				<EventCard event={event} />
				<View style={{...Styles.formGroup, ...Layout.padding.screen}}>
					<Text style={Styles.smallLabel}>Description</Text>
					<Text style={Typography.readable}>
						{event.description}
					</Text>
				</View>
				
			</ScrollView>
			<PrimaryButton label="Create It" action={submitToContract}></PrimaryButton>
		</View>
	) : (
		<ScreenContainer centerContent={true}>
			<Text style={headlines.h2}>Building your event</Text>
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
})

export default Slide;