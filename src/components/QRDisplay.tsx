import * as React from 'react';
import {Dimensions, StyleSheet, View, Text, TextInput, Pressable} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import QRCode from 'react-native-qrcode-svg';
import { Colors, Layout, Styles } from '../styles';
import ViewShot from "react-native-view-shot";
import Icon from 'react-native-remix-icon';
import { readable } from '../styles/typography';

type QRDisplayProps = {
	eventId?: number,
	registrationId?: number,
}


const QRDisplay:React.FC<QRDisplayProps> = ({eventId, registrationId}) => {
	const value = (eventId) ? `{"eventId":${eventId}}` : 
	(registrationId) ? `{"registrationId":${registrationId}}` : 
	"";
	const viewShot = React.useRef<ViewShot>({});
	const [saved, setSaved] = React.useState(false);
	const capture = () => {
		console.log(viewShot.current.capture);
		viewShot.current.capture().then((value) => {
			CameraRoll.save(value, {type:'photo'});
			setSaved(true);
		}, (e) => {
			console.log(e);
		});
	}
	return ( value ) ? (
		<View>
			<ViewShot ref={viewShot} style={_styles.container} options={{ format: "png", quality: 0.9 }}>
				<QRCode value={value} size={Dimensions.get('screen').width-100}/>
			</ViewShot>
			{(!saved) ? ( 
				<Pressable onPress={capture}><Text style={_styles.saveButton}><Icon name='download-2-line' color={Colors.primary}/> Save</Text></Pressable>
			) : (
				<Text style={readable}>Saved!</Text>
			)}
		</View>
	) : (
		<></>
	);
}

const _styles = StyleSheet.create({
	container: {
		width: '100%',
		borderRadius: 16,
		backgroundColor: Colors.white,
		alignItems: 'center',
		justifyContent: 'center',
		...Layout.padding.regular,
	}, 
	saveButton: {
		width: "100%",
		color: Colors.primary,
		justifyContent: 'flex-end',
		alignItems:'flex-end',
	}
})

export default QRDisplay;