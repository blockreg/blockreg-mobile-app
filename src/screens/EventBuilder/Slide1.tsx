import * as React from 'react';
import ScreenContainer from '../ScreenContainer';
import { StackParams } from '../../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FormTextInput from '../../components/FormTextInput';
import { addEventData } from '../../redux/EventBuilderSlice';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Styles } from '../../styles';
import { View } from 'react-native';
import dayjs from 'dayjs';

type EventScreenProps = NativeStackScreenProps<StackParams, 'EventBuilder'>;

const Slide: React.FC<EventScreenProps> = ({navigation}) => {
	const dispatch = useAppDispatch();
	const event = useAppSelector((state) => state.eventBuilder);
	const [errors, setErrors] = React.useState<string[]>([]);

	const validate = () => {
		let _errors = false;
		const validDate = dayjs(event.date).format("YYYY-MM-DD");
		setErrors([]);
		if (validDate !== event.date || dayjs(event.date).isBefore(dayjs())) {
			_errors = true;
			setErrors(["date"]);
		}
		if ( !event.name ) {
			_errors = true
			setErrors([...errors, "name"]);
		}
		console.log(errors)
		if(!_errors)
			navigation.navigate('EBSlide2');
	}

	return (
		<ScreenContainer centerContent={true}>
			<View style={Styles.formGroup}>
				<FormTextInput 
					label="Name" 
					initialValue={event.name}
					changeAction={(text) => dispatch(addEventData({name: text}))}
					returnKeyType='done'
					error={errors.includes('name')}
					/>
				<FormTextInput 
					label="Date" 
					initialValue={event.date}
					smallLabel="YYYY-mm-dd" 
					changeAction={(text) => dispatch(addEventData({date: text}))}
					keyboardType='numbers-and-punctuation'
					returnKeyType='done'
					error={errors.includes('date')}
					/>
				<FormTextInput 
					label="Max Attendance" 
					initialValue={(event.maxAttendance > 0) ? event?.maxAttendance.toString() : ""}
					smallLabel="Optional" 
					changeAction={(text) => dispatch(addEventData({maxAttendance: parseInt(text)}))}
					keyboardType='numbers-and-punctuation'
					returnKeyType='done'
				/>
			</View>
			<PrimaryButton label="Next" action={()=>{validate()}}></PrimaryButton>
		</ScreenContainer>
	);
};

export default Slide;