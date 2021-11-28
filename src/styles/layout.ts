import { TextStyle, View, ViewStyle } from "react-native";

type Padding = "small" | "regular" | "wide" | "screen";
export const padding: Record<Padding, ViewStyle> = {
	small: {
		padding: 5
	},
	regular: {
		padding: 16,
	},
	wide: {
		padding: 30,
	},
	screen: {
		paddingLeft: 16,
		paddingRight: 16,
	}
}

type FlexStyle = "column" | "row";
export const flex: Record<FlexStyle, ViewStyle> = {
	column: {
		flex: 1,
		flexDirection: "column",
	},
	row: {
		flex: 1,
		flexDirection: "row",
		flexGrow: 1,
	}
}

type VerticalSpacing = "tight" | "regular" | "wide";
export const topSpacing: Record<VerticalSpacing, ViewStyle> = {
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

export const bottomSpacing: Record<VerticalSpacing, ViewStyle> = {
	tight: {
		marginBottom: 5
	},
	regular: {
		marginBottom: 10
	},
	wide: {
		marginBottom: 25
	}
}

export const fullFlexCentered: ViewStyle = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center',
}

export const fullWidth: ViewStyle | TextStyle = {
	width: "100%",
}
