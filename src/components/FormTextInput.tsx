import * as React from 'react';
import { StyleSheet, Text, View, TextInputProps, TextStyle } from 'react-native';
import { Colors, Layout, Styles, Typography } from '../styles';
import { TextInput } from 'react-native-gesture-handler';

type FormTextInput = TextInputProps & {
	label: string,
	initialValue?: string,
	changeAction: (text: string) => void,
	smallLabel?: string,
	error?:boolean,
}

const FormTextInput: React.FC<FormTextInput> = (props) => {
	const [value, setValue] = React.useState(props.initialValue??"");
	const _update = (text: string) => {
		setValue(text);
		props.changeAction(text);
	};

	return (
		<View style={[Layout.fullWidth, Layout.bottomSpacing.wide]}>
			<View style={_styles.labelGroup}>
				<Text style={{...Typography.labels.regular}}>{props.label}</Text>
				<Text style={Styles.smallLabel}>{props.smallLabel}</Text>
			</View>
			<TextInput 
				{...props}
				value={value}
				style={[
					Styles.formTextInput, 
					(props.multiline) ? _styles.tall : {},
					(props.error) ? _styles.error : {},
				]} 
				onChange={({nativeEvent:{text}}) => _update(text)} 
			/>
		</View>
	);	
}

const _styles = StyleSheet.create({
	labelGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	tall: {
		height: "80%",
	},
	error: {
		borderWidth: 1,
		borderColor: Colors.error,
	}

});


export default FormTextInput;