import * as Colors from './colors';
import * as Typography from './typography';
import * as Layout from './layout';
import * as Buttons from './buttons';
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
	smallLabel: {
		color: Colors.lightGray,
		...Typography.text.tiny,
		...Layout.topSpacing.regular
	},
	formGroup: {
		marginTop: "auto",
		width: "100%",
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	formLabel: {
		color: Colors.white,
		...Typography.text.small,
		...Layout.topSpacing.regular
	},
	formTextInput: {
		borderWidth: 1,
		borderColor: Colors.lightGray,
		color: Colors.white,
		alignSelf: 'stretch',
		...Typography.text.medium,
		...Layout.padding.small,
	}
});

export { Colors, Typography, Layout, Buttons, Styles };