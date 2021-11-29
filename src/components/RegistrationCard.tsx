import * as React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { BASE_IPFS_URL } from '../Constants';
import { Colors, Layout, Styles } from '../styles';
import { headlines, labels } from '../styles/typography';
import { Blockreg } from '../types';

type RegistrationCardProps = {
	registration: Blockreg.Registration,
	event: Blockreg.Event
}

const RegistrationCard:React.FC<RegistrationCardProps> = ({registration, event}) => {	
	return (
		<View style={{backgroundColor: event.badgeColor || Colors.darkGray}}>
			<View style={_styles.columns}>
				<View style={_styles.leftColumn}>
					<Image source={{uri: `${BASE_IPFS_URL}${registration.imageCid}`}} style={_styles.image} />
				</View>
				<View style={_styles.rightColumn}>
					<View style={Layout.padding.screen}>
						<Text style={Styles.smallLabel}>Event</Text>
						<Text style={headlines.h2}>
							{registration.name}
						</Text>
						<Text style={Styles.smallLabel}>Company</Text>
						<Text style={headlines.h2}>
							{registration.company}
						</Text>
						<Text style={Styles.smallLabel}>Event</Text>
						<Text style={headlines.h2}>
							{event.name}
						</Text>
					</View>
				</View>
			</View>	
		</View>
	);
}

export default RegistrationCard;

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