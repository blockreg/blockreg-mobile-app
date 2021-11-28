import * as React from 'react';
import { Keyboard, Pressable, Text } from 'react-native';
import { Buttons } from '../styles';

type PrimaryButtonProps = {
	label: string,
	action: () => void,
}
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({label, action}) => {
	return (
		<Pressable style={
			({pressed}) => { 
				return pressed == true ? 
					{...Buttons.primary.containerPressed} :
					{...Buttons.primary.container} 
			}
		} onTouchEnd={action}>
			<Text style={Buttons.primary.label}>{label}</Text>
		</Pressable>
	);
}

