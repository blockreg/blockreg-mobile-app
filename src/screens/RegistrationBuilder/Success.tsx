import * as React from 'react';
import ScreenContainer from '../ScreenContainer';
import { StackParams } from '../../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FormTextInput from '../../components/FormTextInput';
import { addRegistrationData } from '../../redux/RegistrationBuilderSlice';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Layout, Styles } from '../../styles';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import RegistrationCard from '../../components/RegistrationCard';
import { headlines, readable, text } from '../../styles/typography';
import SecureRegistrationCard from '../../components/SecureRegistrationCard';

type RegistrationBuilderProps = NativeStackScreenProps<StackParams, 'RBSlide1'>;

const Slide: React.FC<RegistrationBuilderProps> = ({navigation, route}) => {
	return (
		<ScreenContainer>
			<Text style={[headlines.h1Secondary, text.xxlarge, Layout.bottomSpacing.wide, Layout.topSpacing.wide]}>You're in! 🎉</Text>
			<RegistrationCard event={route.params.event} registration={route.params.registration} />
			<View style={_styles.info} >
				<Text style={headlines.h2}>Secure registration</Text>
				<Text style={readable}>Your ticket to the event. Allowing people to scan this gives them
access to any private information you provided during registration. </Text>
			
			</View>
			<Pressable onPress={() => navigation.navigate('SecureRegistration', {registration: route.params.registration, event: route.params.event})}>
				<SecureRegistrationCard registration={route.params.registration} event={route.params.event}/>
			</Pressable>
			<Pressable onPress={() => navigation.navigate('Home')}>
				<Text>Close</Text>
			</Pressable>
		</ScreenContainer>
	);
};

const _styles = StyleSheet.create({
	info: {
		justifyContent: 'flex-start',
		alignSelf: 'stretch',
		...Layout.topSpacing.wide,
		...Layout.bottomSpacing.wide
	},
})

export default Slide;