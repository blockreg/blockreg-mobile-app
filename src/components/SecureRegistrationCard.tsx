import * as React from 'react';
import {StyleSheet, Text, View } from 'react-native';
import { Colors, Layout, Styles } from '../styles';
import { headlines } from '../styles/typography';
import { Blockreg } from '../types';
import Icon from 'react-native-remix-icon';


type SecureRegistrationCardProps = {
	registration: Blockreg.Registration,
	event: Blockreg.Event
}

const SecureRegistrationCard:React.FC<SecureRegistrationCardProps> = ({registration, event}) => {	
	return (
		<View style={{backgroundColor: Colors.primary}}>
				<View style={_styles.columns}>
					<View style={_styles.leftColumn}>
						<Icon name="qr-code-line" size={100} color={Colors.black}/>
					</View>
					<View style={_styles.rightColumn}>
						<View style={Layout.padding.screen}>
							<Text style={Styles.smallLabel}>Event</Text>
							<Text style={{...headlines.h2, color:Colors.darkGray}}>
								{registration.name}
							</Text>
							<Text style={Styles.smallLabel}>Company</Text>
							<Text style={{...headlines.h2, color:Colors.darkGray}}>
								{registration.company}
							</Text>
						</View>
					</View>
				</View>
		</View>
	);
}

export default SecureRegistrationCard;

const _styles = StyleSheet.create({
	columns: {
		width: '100%',
		flexDirection: 'row',
	},
	leftColumn: {
		width: "40%",
		backgroundColor: "#FFFFFF",
		alignItems: 'center',
		justifyContent: 'center',
	},
	image: {
		width: 160,
		height: 220,
	},
	rightColumn: {
		width: "60%",
		justifyContent: 'flex-start',
	}
})