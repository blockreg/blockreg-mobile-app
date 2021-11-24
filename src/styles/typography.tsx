import { TextStyle } from 'react-native';

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
		lineHeight: 12
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