import * as React from 'react';
import { Keyboard, Pressable, Text } from 'react-native';
import { Buttons } from '../styles';

type SmallButtonProps = {
	label: string,
	action: () => void,
	disabled?: boolean,
}
export const SmallButton: React.FC<SmallButtonProps> = ({label, action, disabled}) => {
	return (
		<Pressable disabled={disabled} style={
			({pressed}) => { 
				return disabled ? 
					{...Buttons.small.containerDisabled} :
					pressed == true ? 
					{...Buttons.small.containerPressed} :
					{...Buttons.small.container} 
			}
		} onTouchEnd={action}>
			<Text style={Buttons.small.label}>{label}</Text>
		</Pressable>
	);
}

