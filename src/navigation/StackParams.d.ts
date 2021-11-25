import { RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Events from "../contracts/Events";

export type EventScreenParams = {eventId: number}

export type StackParams = {
	'Tabs': BottomTabNavigationProp<BottomTabStackParams>,
	'Event': EventScreenParams,
}
export type BottomTabStackParams = {
	'Home': undefined,
	'Scan': undefined,
	'Host': undefined,
	'Fund': undefined,
}

export type NavigationProp = NativeStackNavigationProp<StackParams>;
export type NavRouteProp = RouteProp<StackParams>;
