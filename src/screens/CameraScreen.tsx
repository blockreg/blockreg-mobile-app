import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import { Text, StyleSheet, View, Pressable, TouchableOpacity } from 'react-native';
import { Colors, Layout, Typography } from '../styles';
import { useAppDispatch, useAppSelector } from '../hooks';
import { RNCamera, TakePictureOptions, TakePictureResponse } from 'react-native-camera';
import { addRegistrationData } from '../redux/RegistrationBuilderSlice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StackParams } from '../navigation/StackParams';
import ImageResizer from 'react-native-image-resizer';
type CameraProps = NativeStackScreenProps<StackParams, 'Camera'>;

const Camera: React.FC<CameraProps> = ({ navigation }) => {
	const dispatch = useAppDispatch();
	const camera = React.useRef<RNCamera>({} as RNCamera)
	const takePicture = async () => {
		if (camera.current) {
			const options = { quality: 0.9 };
			const data = await camera.current.takePictureAsync(options);

			upload(data).then(() => {
				navigation.navigate('RBSlide2');
			}, (e) => {

			});
		}
	};
	const upload = (data:TakePictureResponse): Promise<boolean> => {
		return new Promise<boolean>((resolve, reject) => { 
			const item = new FormData();
			item.append('file', { uri: data.uri, name: 'picture.png', type: 'image/png' });

			// Create the config object for the POST
			const config = {
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				method: 'POST',
				body: item
			};

			try {
				fetch('https://ipfs.infura.io:5001/api/v0/add', config).then((response)=> {
					response.json().then((file) => {
						dispatch(addRegistrationData({ imageCid: file.Hash }));
						resolve(true);
					});
				});
			} catch(e) {
				console.log(e);
				reject(false);
			}
		});
	}
	return (
		<View style={styles.container}>

			<RNCamera
				ref={ref => {
					camera.current = ref;
				}}
				style={styles.preview}
				type={RNCamera.Constants.Type.front}
				captureAudio={false}
			/>
			<View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
				<TouchableOpacity onPress={takePicture.bind(Camera)} style={styles.capture}>

				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'black',
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 100,
		padding: 40,
		width: "20%",
		paddingHorizontal: 20,
		alignSelf: 'center',
		margin: 20,
	},
});


export default Camera;