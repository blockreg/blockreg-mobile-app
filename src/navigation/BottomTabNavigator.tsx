import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabStackParams } from './StackParams';
import Screens from '../screens';
import {Colors, Layout} from '../styles';
import Icon from 'react-native-remix-icon';
import EthereumLine from '../custom-icons/EthereumLine';
import { Text } from "react-native-svg";
import { Pressable } from "react-native";

const Tabs = createBottomTabNavigator<BottomTabStackParams>(); 

const BottomTabNavigator: React.FC<{}> = () => {
	return (
		<Tabs.Navigator initialRouteName="Home" screenOptions={{
			headerStyle: {
				backgroundColor: Colors.black,
			},
			headerTintColor: Colors.white,
			headerShadowVisible: false,
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
				options={({navigation}) => ({
					title: "Host an Event",
					tabBarLabel: 'Host',
					tabBarIcon: ({ color, size, }) => (
						<Icon name="calendar-event-fill" size={size} color={color} />
					),
					headerRight: () => (
						<Pressable style={{...Layout.padding.screen}} onPress={() => navigation.navigate('EBSlide1')}>
							<Icon name='add-circle-line' color={Colors.primary}></Icon><Text>HEYY</Text>
						</Pressable>
					),
				})}
			/>
			<Tabs.Screen
				component={Screens.Wallet}
				name="Wallet"
				options={{
					tabBarLabel: 'Wallet',
					tabBarIcon: ({ color, size }) => (
						<EthereumLine  color={color} size={28}/>
					),
				}}
			/>
		</Tabs.Navigator>
	);
}

export default BottomTabNavigator;