import * as React from 'react';
import ScreenContainer from './ScreenContainer';
import {View, Text} from 'react-native';

const HostScreen: React.FC<{}> = () => {
	return (
		<ScreenContainer>
			<Text>Host Screen</Text>
		</ScreenContainer>
	);
}

export default HostScreen;
