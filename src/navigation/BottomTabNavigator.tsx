import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabStackParams } from './StackParams';
import Screens from '../screens';
import {Colors} from '../styles';
import Icon from 'react-native-remix-icon';
import EthereumLine from '../custom-icons/EthereumLine';

const Tabs = createBottomTabNavigator<BottomTabStackParams>(); 

const BottomTabNavigator: React.FC<{}> = () => {
	return (
		<Tabs.Navigator initialRouteName="Home" screenOptions={{
			headerStyle: {
				backgroundColor: Colors.black,
			},
			headerTintColor: Colors.white,
			tabBarStyle: {
				backgroundColor: Colors.darkGray,
				borderTopWidth: 0,
			},
			tabBarInactiveTintColor: Colors.lightGray,
			tabBarActiveTintColor: Colors.primary,
		}}>
			<Tabs.Screen 
				name="Home"
				component={Screens.Home}
				options={{
					tabBarLabel: 'Home',
					tabBarIcon: ({ color, size }) => (
						<Icon name="home-line" size={size} color={color} />
					),
					headerShown: false,
				}}
			/>
			<Tabs.Screen 
				component={Screens.Scan}
				name="Scan"
				options={{
					headerShown: false,
					tabBarLabel: 'Scan',
					tabBarIcon: ({ color, size }) => (
						<Icon name="qr-code-line" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen 
				component={Screens.Host}
				name="Host"
				options={{
					tabBarLabel: 'Host',
					tabBarIcon: ({ color, size }) => (
						<Icon name="calendar-event-fill" size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen 
				component={Screens.Fund}
				name="Fund"
				options={{
					tabBarLabel: 'Fund',
					tabBarIcon: ({ color, size }) => (
						<EthereumLine  color={color} size={28}/>
					),
				}}
			/>
		</Tabs.Navigator>
	);
}

export default BottomTabNavigator;