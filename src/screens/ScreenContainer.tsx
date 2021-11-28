import { JSXElement } from '@babel/types';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import * as React from 'react';
import { SafeAreaView, View, StyleSheet, Text, TouchableWithoutFeedback, ViewPropsAndroid } from 'react-native';
import { StackParams } from '../navigation/StackParams';
import {Colors, Layout} from '../styles';

type ScreenContainerProps = {
	children: React.ReactNode,
	centerContent?: boolean,
	onPress?: () => void,
}

const ScreenContainer: React.FC<ScreenContainerProps> = ({children, centerContent, onPress}) => {
	return (
		<TouchableWithoutFeedback onPress={(onPress) ? onPress : ()=>{}}>
			<View style={{
				..._styles.container, 
				...((centerContent) ? Layout.fullFlexCentered : Layout.flex.column)
			}}>
				{children}
			</View>
		</TouchableWithoutFeedback>
	);
} 

const _styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.black,
		...Layout.flex.column,
		...Layout.padding.screen,
	}
})

export default ScreenContainer;