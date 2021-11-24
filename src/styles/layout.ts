import { FlexStyle, ViewStyle } from "react-native";
import { ScreenReplaceTypes } from "react-native-screens";

type Padding = "regular" | "wide";
export const padding: Record<Padding, ViewStyle> = {
	regular: {
		paddingLeft: 16,
		paddingRight: 16,
	},
	wide: {
		paddingLeft: 30,
		paddingRight: 30,
	}
}

type FlexStyle = "column" | "row" | "both";
export const flex: Record<FlexStyle, ViewStyle> = {
	column: {
		flex: 1,
		flexDirection: "column",
	},
	row: {
		flex: 1,
		flexDirection: "row",
	}
}

type VerticalSpacing = "tight" | "regular" | "wide";
export const verticalSpacing: Record<VerticalSpacing, ViewStyle> = {
	tight: {
		marginTop: 5
	},
	regular: {
		marginTop: 10
	},
	wide: {
		marginTop: 25
	}
}

export const fullFlexCentered: ViewStyle = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
}
