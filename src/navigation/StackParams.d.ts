import { RouteProp } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

export type StackParams = {
	'Home': undefined,
	'Scan': undefined,
	'Event': undefined,
	'Host': undefined,
	'Fund': undefined,
}

type NavigationProp = BottomTabNavigationProp<StackParams>;
type NavRouteProp = RouteProp<StackParams>;

type NavProps = {
	navigation: NavigationProp,
	route: NavRouteProp,
}
