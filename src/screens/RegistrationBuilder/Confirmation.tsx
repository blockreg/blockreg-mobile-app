import * as React from 'react';
import ScreenContainer from '../ScreenContainer';
import { StackParams } from '../../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Colors, Layout, Styles } from '../../styles';
import Icon from 'react-native-remix-icon';
import { Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { headlines, labels } from '../../styles/typography';
import RegistrationCard from '../../components/RegistrationCard';
import { fullFlexCentered, padding, topSpacing } from '../../styles/layout';
import { ethers, Wallet, BigNumber } from 'ethers';
import RegistrationsContract from '../../contracts/RegistrationsContract';
import { getWeb3Provider } from '../../Utils';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../../Constants';
import * as Keychain from 'react-native-keychain';



type RegistrationBuilderProps = NativeStackScreenProps<StackParams, 'RBSlide1'>;

const Slide: React.FC<RegistrationBuilderProps> = ({navigation}) => {
	const dispatch = useAppDispatch();
	const registration = useAppSelector((state) => state.registrationBuilder);
	const scanned = useAppSelector((state) => state.events.scanned);
	const event = scanned[registration.eventId];
	const [serviceFee, setServiceFee] = React.useState("");
	const [gas, setGas] = React.useState("");
	const [totalFee, setTotalFee] = React.useState(""); 
	const [submitted, setSubmitted] = React.useState(false);


	React.useEffect(() => {
		const registrations = new RegistrationsContract(getWeb3Provider());
		registrations.getServiceFee().then((_fee) => {
			setServiceFee(ethers.utils.formatEther(_fee.toString()));
		});
	}, []);

	const submitToContract = async () => {
		const publicKey = await AsyncStorage.getItem(STORAGE_KEYS.WALLET_PUBLIC_KEY);
		if ( !publicKey )
			return navigation.navigate('Wallet');

		const credentials = await Keychain.getGenericPassword();
		if ( credentials ) {
			const wallet = new Wallet(credentials.password, getWeb3Provider());
			const contract = new RegistrationsContract(wallet);

			const fee = await contract.getRegistrationFee(event.id);
			contract.register(registration, fee).then(async (tx: ethers.ContractTransaction) => {
				setSubmitted(true);
				navigation.navigate('RBSuccess', {registration, event});
				await tx.wait();
				AsyncStorage.getItem(STORAGE_KEYS.HOSTED_EVENTS);
				console.log("SUCCESS", tx);
				const acctRegistrations = await contract.getAccountRegistrations();
				console.log(acctRegistrations);
				const newRegistration = acctRegistrations[acctRegistrations.length - 1];
				navigation.navigate('RBSuccess', {registration, event});
			}, (e) => {
				console.log(e);
				setSubmitted(false);
			})
		} 
	}

	return (!submitted) ? (
		<ScreenContainer centerContent={true}>
			<View style={_styles.container}>
				<Text style={[headlines.h1, Layout.bottomSpacing.wide]}>Confirm your registration</Text>
				<RegistrationCard registration={registration} event={event}/>
				<View style={_styles.feeContainer}>
					<View>
						<Text style={Styles.smallLabel}>Fee</Text>
						<Text style={headlines.h2}>{event.feeReadable}</Text>
					</View>
					<View>
						<Text style={Styles.smallLabel}>Service Fee</Text>
						<Text style={headlines.h2}>{serviceFee}</Text>
					</View>
					<View>
						<Text style={[Styles.smallLabel,{color:Colors.primary}]}>Total</Text>
						<Text style={headlines.h2}>{parseFloat(serviceFee)+parseFloat(event.feeReadable)}</Text>
					</View>
				</View>
			</View>
			<PrimaryButton disabled={!registration.imageCid} label="Register" action={submitToContract}></PrimaryButton>
		</ScreenContainer>
	) : (
		<ScreenContainer centerContent={true}>
			<Text style={headlines.h2}>Getting you signed up...</Text>
		</ScreenContainer>
	);
};

const _styles = StyleSheet.create({
	container: {
		...fullFlexCentered,
	},
	cameraIcon: {
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	feeContainer: {
		alignSelf:'stretch',
		justifyContent: 'space-evenly',
		flexDirection: 'row',
		borderRadius: 16,
		...topSpacing.wide,
		...padding.wide
	},
	image: {
		width: 160,
		height: 220,
		borderRadius: 100,
		...Layout.bottomSpacing.wide,
	}
})

export default Slide;