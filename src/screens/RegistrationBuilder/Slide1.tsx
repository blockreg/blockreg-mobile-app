import * as React from 'react';
import ScreenContainer from '../ScreenContainer';
import { StackParams } from '../../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FormTextInput from '../../components/FormTextInput';
import { addRegistrationData } from '../../redux/RegistrationBuilderSlice';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Styles } from '../../styles';
import { View } from 'react-native';

type RegistrationBuilderProps = NativeStackScreenProps<StackParams, 'RBSlide1'>;

const Slide: React.FC<RegistrationBuilderProps> = ({navigation, route}) => {
	const dispatch = useAppDispatch();
	const registration = useAppSelector((state) => state.registrationBuilder);
	const [errors, setErrors] = React.useState<string[]>([]);

	React.useEffect(() => {
		dispatch(addRegistrationData({'eventId': route.params.eventId}));
	}, [])

	const validate = () => {
		let _errors = false;
		setErrors([]);
		if ( !registration.name ) {
			_errors = true
			setErrors([...errors, "name"]);
		}
		if ( !registration.company ) {
			_errors = true
			setErrors([...errors, "company"]);
		}
		if ( !registration.email ) {
			_errors = true
			setErrors([...errors, "email"]);
		}
		if(!_errors)
			navigation.navigate('RBSlide2');
	}

	return (
		<ScreenContainer centerContent={true}>
			<View style={Styles.formGroup}>
				<FormTextInput 
					label="Full Name" 
					initialValue={registration.name}
					changeAction={(text) => dispatch(addRegistrationData({name: text}))}
					returnKeyType='done'
					error={errors.includes('name')}
					/>
				<FormTextInput 
					label="Company" 
					initialValue={registration.company} 
					changeAction={(text) => dispatch(addRegistrationData({company: text}))}
					returnKeyType='done'
					error={errors.includes('company')}
					/>
				<FormTextInput 
					label="Email" 
					initialValue={registration.email}
					smallLabel="Encrypted" 
					changeAction={(text) => dispatch(addRegistrationData({email: text}))}
					keyboardType='email-address'
					returnKeyType='done'
					error={errors.includes('email')}
					/>
			</View>
			<PrimaryButton label="Next" action={()=>{validate()}}></PrimaryButton>
		</ScreenContainer>
	);
};

export default Slide;