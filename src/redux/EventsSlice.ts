import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blockreg } from "../types";

interface EventsState {
	scanned: Record<number, Blockreg.Event>
}

const initialState = {
	scanned: {},
} as EventsState;

export const EventsSlice = createSlice({
	name: 'Events',
	initialState,
	reducers: {
		addEvent: (state, action: PayloadAction<Blockreg.Event>) => {
			state.scanned[action.payload.id] = action.payload;
		},
	}
});

export const { addEvent } = EventsSlice.actions;

export default EventsSlice.reducer;
