import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blockreg } from "../types";

interface EventsState {
	scanned: Record<number, Blockreg.Event>,
	hosted: Record<number, Blockreg.Event>,
}

const initialState = {
	scanned: {},
	hosted: {},
} as EventsState;

export const EventsSlice = createSlice({
	name: 'Events',
	initialState,
	reducers: {
		addScannedEvent: (state, action: PayloadAction<Blockreg.Event>) => {
			state.scanned[action.payload.id] = action.payload;
		},
		addHostedEvent: (state, action: PayloadAction<Blockreg.Event>) => {
			state.hosted[action.payload.id] = action.payload;
		},
	}
});

export const { addScannedEvent, addHostedEvent } = EventsSlice.actions;

export default EventsSlice.reducer;
