import * as React from "react";
import { Colors } from "../styles";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParams } from './StackParams';
import { NavigationContainer } from "@react-navigation/native";
import BottomTabNavigator from "./BottomTabNavigator";
import Screens from '../screens';
import EBScreens from '../screens/EventBuilder';
import RBScreens from '../screens/RegistrationBuilder';

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
					name="Event"
					component={Screens.Event}
					options={{
						headerTitle: "", 
						headerBackVisible: true, 
					}}
					initialParams={{eventId: 1}}
				/> 
				<RootStack.Screen
					name="Tabs"
					component={BottomTabNavigator}
					options={{headerShown: false}}
				/> 
				<RootStack.Screen
					name="EBSlide1"
					component={EBScreens.Slide1}
					options={{
						headerTitle: "", 
					}}
				/> 
				<RootStack.Screen
					name="EBSlide2"
					component={EBScreens.Slide2}
					options={{
						headerTitle: "", 
					}}
				/>
				<RootStack.Screen
					name="EBSlide3"
					component={EBScreens.Slide3}
					options={{
						headerTitle: "", 
					}}
				/>
				<RootStack.Screen
					name="EBSlide4"
					component={EBScreens.Slide4}
					options={{
						headerTitle: "", 
					}}
				/>
				<RootStack.Screen
					name="EBConfirmation"
					component={EBScreens.Confirmation}
					options={{
						headerTitle: "", 
					}}
				/> 
				<RootStack.Screen
					name="EBSuccess"
					component={EBScreens.Success}
					options={{
						headerTitle: "", 
					}}
				/> 

				<RootStack.Screen
					name="RBSlide1"
					component={RBScreens.Slide1}
					options={{
						headerTitle: "", 
					}}
					initialParams={{eventId: 1}}
				/> 

				<RootStack.Screen
					name="RBSlide2"
					component={RBScreens.Slide2}
					options={{
						headerTitle: "", 
					}}
				/> 

				<RootStack.Screen
					name="RBConfirmation"
					component={RBScreens.Confirmation}
					options={{
						headerTitle: "", 
					}}
				/> 

				<RootStack.Screen
					name="RBSuccess"
					component={RBScreens.Success}
					options={{
						headerTitle: "", 
					}}
				/> 

				<RootStack.Screen
					name="Camera"
					component={Screens.Camera}
					options={{
						headerTitle: "", 
					}}
				/>

				<RootStack.Screen
					name="SecureRegistration"
					component={Screens.SecureRegistration}
					options={{
						headerTitle: "", 
					}}
				/>
			</RootStack.Navigator>
		</NavigationContainer>
	);
}

export default Navigation;