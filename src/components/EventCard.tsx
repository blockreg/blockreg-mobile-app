import { ethers } from 'ethers';
import * as React from 'react';
import { StyleSheet, Text, View, TextInputProps } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors, Layout, Styles, Typography } from '../styles';
import { headlines, labels } from '../styles/typography';
import { Blockreg } from '../types';

type EventCardProps = {
	event: Blockreg.Event
}

const EventCard:React.FC<EventCardProps> = ({event}) => {	
	return (
		<View style={{backgroundColor: event.badgeColor || Colors.darkGray}}>
			<View style={_styles.columns}>
				<View style={_styles.leftColumn}>
					<Text>Logo goes here</Text>
				</View>
				<View style={_styles.rightColumn}>
					<View style={Layout.padding.screen}>
						<Text style={Styles.smallLabel}>Event</Text>
						<Text style={headlines.h2}>
							{event.name}
						</Text>
						<Text style={Styles.smallLabel}>Date</Text>
						<Text style={headlines.h2}>
							{event.dateReadable}
						</Text>
						<Text style={Styles.smallLabel}>Max Attendance</Text>
						<Text style={headlines.h2}>
							{event.maxAttendance}
						</Text>
						<Text style={Styles.smallLabel}>Fee</Text>
						<Text style={headlines.h2}>
							{event.feeReadable}
						</Text>
					</View>
				</View>
			</View>	
		</View>
	);
}

export default EventCard;

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
	rightColumn: {
		width: "60%",
		justifyContent: 'flex-start',
	}
})