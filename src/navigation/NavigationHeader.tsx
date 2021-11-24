import * as React from "react";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { SafeAreaView, Text, StyleSheet } from 'react-native';

const NavigationHeader: React.FC<BottomTabHeaderProps> = ({route}): JSX.Element => {
	return (
		<SafeAreaView>
			<Text>{route.name}</Text>
		</SafeAreaView>
	);
}

const styles=StyleSheet.create({
});

export default NavigationHeader;