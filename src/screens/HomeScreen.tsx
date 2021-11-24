import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {View, Text, StyleSheet} from 'react-native';
import { Colors, Typography } from '../styles';
import { color } from 'react-native-reanimated';

const HomeScreen: React.FC<{}> = () => {
	return (
		<ScreenContainer>
			<Text style={styles.headline}>Looks like you're new in town.</Text>
			<Text style={styles.subheadline}>Scan an event QR code to get started.</Text>
		</ScreenContainer>
	);
}

const styles = StyleSheet.create({
	headline: {
		color: Colors.secondary,
		...Typography.text.xlarge,
	},
	subheadline: {
		color: Colors.white,
		...Typography.text.small
	}
})


export default HomeScreen;