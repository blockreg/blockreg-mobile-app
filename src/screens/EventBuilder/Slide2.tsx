import * as React from 'react';
import ScreenContainer from '../ScreenContainer';
import { StackParams } from '../../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../hooks';
import FormTextInput from '../../components/FormTextInput';
import { addEventData } from '../../redux/EventBuilderSlice';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Styles } from '../../styles';
import { StyleSheet, Text, View } from 'react-native';
import { headlines } from '../../styles/typography';
import Icon from 'react-native-remix-icon';
import { Colors } from '../../styles';


type EventBuilderScreenProps = NativeStackScreenProps<StackParams, 'EventBuilder'>;

const Slide: React.FC<EventBuilderScreenProps> = ({navigation}) => {
	const dispatch = useAppDispatch();
	const event = useAppSelector((state) => state.eventBuilder);

	return (
		<ScreenContainer centerContent={true}>
			<View style={Styles.formGroup}>
				<Text style={headlines.h1}>Add a logo</Text>
				<Text style={headlines.sub1}>This will be used on your listing and conference badges.</Text>
				<Icon style={styles.cameraIcon} name="camera-lens-line" size={"60%"} color={Colors.darkGray}/>
				{/* <SmallButton /> */}
				<FormTextInput 
					label="Badge Color" 
					initialValue={event.badgeColor}
					smallLabel="Hex, Optional" 
					changeAction={(text) => dispatch(addEventData({badgeColor: text}))}
					keyboardType='numbers-and-punctuation'
					returnKeyType='done'
				/>
			</View>
			<PrimaryButton label="Next" action={()=>{navigation.navigate('EBSlide3')}}></PrimaryButton>
		</ScreenContainer>
	);
};

const styles = StyleSheet.create({
	cameraIcon: {
		marginRight: 'auto',
		marginLeft: 'auto',
	}
})

export default Slide;