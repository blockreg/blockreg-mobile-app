import { RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Blockreg } from "../types";

export type EventScreenParams = {eventId: number};
export type EBSuccessParams = {event: Blockreg.Event};

export type StackParams = {
	'Tabs': BottomTabNavigationProp<BottomTabStackParams>,
	'EventBuilder': NativeStackNavigationProp<EventBuilderParams>,
	'Event': EventScreenParams,
	'TestTransaction': undefined,
	'EBSlide1': undefined,
	'EBSlide2': undefined,
	'EBSlide3': undefined,
	'EBSlide4': undefined,
	'EBConfirmation': undefined,
	'EBSuccess': EBSuccessParams,
}
export type BottomTabStackParams = {
	'Home': undefined,
	'Scan': undefined,
	'Host': undefined,
	'Wallet': undefined,
}

export type NavigationProp = NativeStackNavigationProp<StackParams>;
export type NavRouteProp = RouteProp<StackParams>;
