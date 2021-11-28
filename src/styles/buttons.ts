import * as Colors from './colors';
import * as Typography from './typography';
import * as Layout from './layout';
import { TextStyle, ViewStyle } from "react-native";

const baseContainerStyle: ViewStyle = {
	width: "100%",
	alignSelf: 'stretch',
	justifyContent: 'center',
	alignItems: 'center',
	borderRadius: 15,
	marginTop: 'auto',
	marginLeft: 'auto',
	marginRight: 'auto',
	...Layout.bottomSpacing.wide,
	...Layout.padding.small
}

type PrimaryComponents = "container" | "label" | "containerPressed";
export const primary: Record<PrimaryComponents, ViewStyle | TextStyle> = {
	container: {
		backgroundColor: Colors.primary,
		...baseContainerStyle
	}, 
	label: {
		color: Colors.white,
		...Typography.text.large,
		lineHeight: 48,
	},
	containerPressed: {
		backgroundColor: Colors.primaryPressed,
		...baseContainerStyle
	}
}