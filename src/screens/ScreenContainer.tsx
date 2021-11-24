import { JSXElement } from '@babel/types';
import * as React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import {Colors} from '../styles';

const ScreenContainer: React.FC<{children: JSX.Element | JSX.Element[]}> = ({children}) => {
	return (
		<View style={styles.container}>
			{children}
		</View>
	);
} 

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.black,
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
})

export default ScreenContainer;