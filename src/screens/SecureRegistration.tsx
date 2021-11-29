import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import { StackParams } from '../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../hooks';
import FormTextInput from '../components/FormTextInput';
import { addEventData } from '../redux/EventBuilderSlice';
import { PrimaryButton } from '../components/PrimaryButton';
import { Layout, Styles } from '../styles';
import { StyleSheet, Text, View } from 'react-native';
import { headlines, text } from '../styles/typography';
import Icon from 'react-native-remix-icon';
import { Colors } from '../styles';
import QRDisplay from '../components/QRDisplay';


type EventBuilderScreenProps = NativeStackScreenProps<StackParams, 'SecureRegistration'>;

const Slide: React.FC<EventBuilderScreenProps> = ({navigation, route}) => {
	const dispatch = useAppDispatch();
	const {registration, event} = route.params;

	return (
		<View style={_styles.container}>
			<QRDisplay registrationId={route.params.registration.id} eventId={route.params.event.id} showSave={false}/>
			<Text style={_styles.label}>Name</Text>
			<Text style={_styles.value}>{registration.name}</Text>
			<Text style={_styles.label}>Event</Text>
			<Text style={_styles.value}>{event.name}</Text>
			{/* <Text style={_styles.label}>Registration #</Text>
			<Text style={_styles.value}>{registration.id}</Text> */}
		</View>
	);
};

const _styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems:'center',
		flex: 1,
	},
	label: {
		...text.medium,
		...Layout.topSpacing.wide,
		color: Colors.darkGray,
	},
	value: {
		...text.xxlarge,
		...Layout.bottomSpacing.wide,
		color: Colors.white,
	}

})

export default Slide;