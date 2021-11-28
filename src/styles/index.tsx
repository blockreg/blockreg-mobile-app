import * as Colors from './colors';
import * as Typography from './typography';
import * as Layout from './layout';
import * as Buttons from './buttons';
import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
	smallLabel: {
		...Typography.text.tiny,
		...Layout.topSpacing.regular,
		color: Colors.lightGray,
	},
	formGroup: {
		marginTop: 'auto',
		width: "100%",
		alignItems: 'flex-start',
		justifyContent: 'center',
	},
	formLabel: {
		...Typography.text.small,
		...Layout.topSpacing.regular,
		color: Colors.white,
	},
	formTextInput: {
		...Typography.text.medium,
		...Layout.padding.small,
		borderWidth: 1,
		borderColor: Colors.lightGray,
		color: Colors.white,
		alignSelf: 'stretch',
		width: "100%",
	}
});

export { Colors, Typography, Layout, Buttons, Styles };