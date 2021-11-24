import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StackParams } from './StackParams';
import Screens from '../screens';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BottomTabNavigator from "./BottomTabNavigator";
import { Colors } from "../styles";

const RootStack = createNativeStackNavigator<StackParams>(); 

const Navigation: React.FC<{}> = () => {
	return (
		<NavigationContainer>
			<RootStack.Navigator initialRouteName="Tabs" screenOptions={{
			headerStyle: {
				backgroundColor: Colors.black,
			},
			headerShadowVisible: false,
			headerTintColor: Colors.white,
		}}>
				<RootStack.Screen
					name="Tabs"
					component={BottomTabNavigator}
					options={{headerShown: false}}
				/> 
				<RootStack.Screen
					name="Event"
					component={Screens.Event}
					options={{
						headerTitle: "", 
						headerBackVisible: true, 
					}}
					initialParams={{eventId: 1, cid: "QmVe5MHFFMtkMJ9wsEXEuEdukR4MHLaYGx7iVKPu5czvJd"}}
				/> 
			</RootStack.Navigator>
		</NavigationContainer>
	);
}

export default Navigation;