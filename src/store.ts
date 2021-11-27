import { configureStore } from "@reduxjs/toolkit";
import eventsReducer from './redux/EventsSlice';
import WalletReducer from './redux/WalletSlice';

export const store = configureStore({
	reducer: {
		events: eventsReducer,
		wallet: WalletReducer,
	}
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;