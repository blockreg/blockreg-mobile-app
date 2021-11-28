import * as React from 'react';
import ScreenContainer from '../ScreenContainer';
import { StackParams } from '../../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FormTextInput from '../../components/FormTextInput';
import { addEventData } from '../../redux/EventBuilderSlice';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Typography, Styles, Colors } from '../../styles';
import { View, Text, StyleSheet } from 'react-native';
import SvgEthereumLine from '../../custom-icons/EthereumLine';
import { fonts, labels, readable } from '../../styles/typography';
import { getWeb3Provider } from '../../Utils';
import RegistrationsContract from '../../contracts/RegistrationsContract';
import { ethers } from 'ethers';
import { bottomSpacing } from '../../styles/layout';

type EventScreenProps = NativeStackScreenProps<StackParams, 'EventBuilder'>;

const Slide: React.FC<EventScreenProps> = ({navigation}) => {
	const dispatch = useAppDispatch();
	const event = useAppSelector((state) => state.eventBuilder);

	React.useEffect(() => {
		const registrations = new RegistrationsContract(getWeb3Provider());
		registrations.getServiceFee().then((_fee) => {
			dispatch(addEventData({serviceFee: ethers.utils.formatEther(_fee.toString())}));
		})
	}, [])
	
	return (
		<ScreenContainer centerContent={true}>
			<View style={Styles.formGroup}>
				<FormTextInput
					label="Fee" 
					smallLabel="Eth"
					initialValue={event.fee}
					changeAction={(text) => dispatch(addEventData({fee: text}))}
					returnKeyType='done'
					keyboardType='numbers-and-punctuation'
					/>
				<Text style={labels.regular}>
					Service Fee
				</Text>
				<Text style={_styles.fixedText}>
					{event.serviceFee}
				</Text>
				<Text style={{...labels.regular, color: Colors.primary}}>
					Total
				</Text>
				<Text style={_styles.fixedText}>
					<SvgEthereumLine size={28} color={Colors.white} /> {parseFloat(event.serviceFee) + parseFloat(event.fee)}
				</Text>
			</View>
			<PrimaryButton label="Next" action={()=>{navigation.navigate('EBConfirmation')}}></PrimaryButton>
		</ScreenContainer>
	);
};

const _styles = StyleSheet.create({
	fixedText: {
		...Typography.text.large, 
		...fonts.nunito, 
		...bottomSpacing.regular
	}
});

export default Slide;