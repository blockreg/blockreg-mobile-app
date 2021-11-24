import { JSXElement } from '@babel/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { SafeAreaView, View, StyleSheet, Text } from 'react-native';
import { StackParams } from '../navigation/StackParams';
import {Colors, Layout} from '../styles';

type ScreenContainerProps = {
	children: React.ReactNode,
	centerContent?: boolean,
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({children, centerContent}) => {
	return (
		<View style={{
			...styles.container, 
			...((centerContent) ? Layout.fullFlexCentered : Layout.flex.column)
		}}>
			{children}
		</View>
	);
} 

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.black,
		...Layout.flex.column,
		...Layout.padding.regular,
	}
})

export default ScreenContainer;