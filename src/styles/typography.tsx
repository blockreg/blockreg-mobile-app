import { LabelPosition } from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import { TextStyle } from 'react-native';
import * as Colors from './colors';

type FontSizes = "tiny" | "small" | "medium" | "large" | "xlarge" | "xxlarge";
export const fontSize: Record<FontSizes, TextStyle> = {
	"tiny": { 
		fontSize: 10
	},
	"small": { 
		fontSize: 14,
	},
	"medium": { 
		fontSize: 16,
	},
	"large": { 
		fontSize: 18,
	},
	"xlarge": { 
		fontSize: 22,
	},
	"xxlarge": { 
		fontSize: 32,
	}
}

export const lineHeight: Record<FontSizes, TextStyle> = {
	"tiny": { 
		lineHeight: 16
	},
	"small": { 
		lineHeight: 18,
	},
	"medium": { 
		lineHeight: 20,
	},
	"large": { 
		lineHeight: 25,
	},
	"xlarge": { 
		lineHeight: 30,
	},
	"xxlarge": { 
		lineHeight: 40,
	}
}

export const text: Record<FontSizes, TextStyle> = {
	"tiny": { 
		...fontSize.tiny,
		...lineHeight.tiny,
	},
	"small": { 
		...fontSize.small,
		...lineHeight.small,
	},
	"medium": { 
		...fontSize.medium,
		...lineHeight.medium,
	},
	"large": { 
		...fontSize.large,
		...lineHeight.large,
	},
	"xlarge": { 
		...fontSize.xlarge,
		...lineHeight.xlarge,
	},
	"xxlarge": { 
		...fontSize.xxlarge,
		...lineHeight.xxlarge,
	}
}

export type Headlines = "h1" | "h1Secondary" | "h2" | "h3" | "sub1" | "sub2";
export const headlines: Record<Headlines, TextStyle> = {
	h1: {
		color: Colors.white,
		fontFamily: 'Inter-Bold',
		...text.xlarge,
	},
	h1Secondary: {
		color: Colors.secondary, 
		...text.xlarge,
	},
	h2: {
		color: Colors.white,
		...text.large
	},
	h3: {
		color: Colors.white,
		...text.medium
	},
	sub1: {
		color: Colors.white,
		...text.small
	},
	sub2: {
		color: Colors.lightGray,
		...text.small
	}
}

export type Labels = "small" | "regular";
export const labels: Record<Labels, TextStyle> = {
	small: {
		...text.tiny,
		color: Colors.lightGray,
	},
	regular: {
		...text.medium,
		color: Colors.lightGray
	}
}

export type Fonts = "inter" | "nunito";
export const fonts: Record<Fonts, TextStyle> = {
	inter: {
		fontFamily: 'Inter-Regular',
	},
	nunito: {
		fontFamily: 'Nunito-Regular',
	}
}

export const readable: TextStyle = {
	color: Colors.white,
	...text.small,
	...fonts.nunito,
}