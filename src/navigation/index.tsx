import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackParams } from './StackParams';
import Screens from '../screens';
import {Colors} from '../styles';

const Tabs = createBottomTabNavigator<StackParams>(); 

const Navigation: React.FC<{}> = () => {
	return (
		<NavigationContainer>
			<Tabs.Navigator initialRouteName="Home" screenOptions={{
				headerStyle: {
					backgroundColor: Colors.black,
				},
				headerTintColor: Colors.white,
				tabBarStyle: {
					backgroundColor: Colors.darkGray,
					borderTopWidth: 0,
				},
				tabBarInactiveTintColor: Colors.white,
				tabBarActiveTintColor: Colors.primary,
			}}>
				<Tabs.Screen 
					name="Home"
					component={Screens.Home}
					options={{
						tabBarLabel: 'Home',
						tabBarIcon: ({ color, size }) => (
							// <MaterialCommunityIcons name="home" color={color} size={size} />
							<></>
						),
						headerShown: false,
					}}
				/>
				<Tabs.Screen 
					component={Screens.Scan}
					name="Scan"
					options={{
						tabBarLabel: 'Scan',
						tabBarIcon: ({ color, size }) => (
							// <MaterialCommunityIcons name="home" color={color} size={size} />
							<></>
						),
					}}
				/>
				<Tabs.Screen 
					component={Screens.Host}
					name="Host"
					options={{
						tabBarLabel: 'Host',
						tabBarIcon: ({ color, size }) => (
							// <MaterialCommunityIcons name="home" color={color} size={size} />
							<></>
						),
					}}
				/>
				<Tabs.Screen 
					component={Screens.Fund}
					name="Fund"
					options={{
						tabBarLabel: 'Fund',
						tabBarIcon: ({ color, size }) => (
							// <MaterialCommunityIcons name="home" color={color} size={size} />
							<></>
						),
					}}
				/>
			</Tabs.Navigator>
		</NavigationContainer>
	);
}

export default Navigation;