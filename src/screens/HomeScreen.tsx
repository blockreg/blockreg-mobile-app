import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {Text, StyleSheet} from 'react-native';
import { Colors, Typography } from '../styles';

const HomeScreen: React.FC<{}> = () => {
	return (
		<ScreenContainer centerContent={true}>
			<Text style={Typography.headlines.h1Secondary}>Looks like you're new in town.</Text>
			<Text style={Typography.headlines.h3}>Scan an event QR code to get started.</Text>
		</ScreenContainer>
	);
}

export default HomeScreen;