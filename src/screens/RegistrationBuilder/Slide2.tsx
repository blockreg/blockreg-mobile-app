import * as React from 'react';
import ScreenContainer from '../ScreenContainer';
import { StackParams } from '../../navigation/StackParams';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { addRegistrationData } from '../../redux/RegistrationBuilderSlice';
import { PrimaryButton } from '../../components/PrimaryButton';
import { Colors, Layout, Styles } from '../../styles';
import { StyleSheet, Text, View, Image } from 'react-native';
import Icon from 'react-native-remix-icon';
import { headlines } from '../../styles/typography';
import { RNCamera, FaceDetector } from 'react-native-camera';
import { SmallButton } from '../../components/SmallButton';
import { BASE_IPFS_URL } from '../../Constants';

type RegistrationBuilderProps = NativeStackScreenProps<StackParams>;

const Slide: React.FC<RegistrationBuilderProps> = ({navigation}) => {
	const dispatch = useAppDispatch();
	const registration = useAppSelector((state) => state.registrationBuilder);
	

	const uploadAndGo = () => {
		navigation.navigate('RBConfirmation');
	}
	return (
		<ScreenContainer centerContent={true}>
			<View style={_styles.container}>
				<Text style={headlines.h1}>Take a selfie</Text>
				<Text style={[headlines.sub1, Layout.bottomSpacing.wide]}>This will be used on your conference badge.</Text>
				{
					(registration.imageCid) ? (
						<Image source={{uri: `${BASE_IPFS_URL}${registration.imageCid}`}} style={_styles.image} />
					) : (
						<Icon style={_styles.cameraIcon} name="camera-lens-line" size={"60%"} color={Colors.darkGray}/>
					)
				}
				<SmallButton label="Take Selfie" action={() => navigation.navigate('Camera')} />
			</View>
			<PrimaryButton disabled={!registration.imageCid} label="Next" action={uploadAndGo}></PrimaryButton>
		</ScreenContainer>
	);
};

const _styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	cameraIcon: {
		marginRight: 'auto',
		marginLeft: 'auto',
	},
	image: {
		width: 160,
		height: 220,
		borderRadius: 100,
		...Layout.bottomSpacing.wide,
	}
})
	
export default Slide;