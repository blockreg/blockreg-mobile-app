import * as React from 'react';
import ScreenContainer from '../ScreenContainer';
import { StackParams } from '../../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FormTextInput from '../../components/FormTextInput';
import { addEventData } from '../../redux/EventBuilderSlice';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Styles } from '../../styles';
import { View, Keyboard} from 'react-native';

type EventScreenProps = NativeStackScreenProps<StackParams, 'EventBuilder'>;

const Slide: React.FC<EventScreenProps> = ({navigation}) => {
	const dispatch = useAppDispatch();
	const event = useAppSelector((state) => state.eventBuilder);

	return (
		<ScreenContainer centerContent={true} onPress={Keyboard.dismiss}>
			<View style={Styles.formGroup}>
				
					<FormTextInput
						style={{height: "80%"}}
						label="Description" 
						initialValue={event.description}
						changeAction={(text) => dispatch(addEventData({description: text}))}
						multiline={true}
						returnKeyType='done'
						/>
			</View>
			<PrimaryButton label="Next" action={()=>{navigation.navigate('EBSlide4')}} />
		</ScreenContainer>
	);
};

export default Slide;