import { configureStore } from "@reduxjs/toolkit";
import EventBuilderReducer from "./redux/EventBuilderSlice";
import RegistrationBuilderReducer from './redux/RegistrationBuilderSlice';
import EventsReducer from './redux/EventsSlice';
import WalletReducer from './redux/WalletSlice';

export const store = configureStore({
	reducer: {
		events: EventsReducer,
		eventBuilder: EventBuilderReducer,
		registrationBuilder: RegistrationBuilderReducer,
		wallet: WalletReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;