import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blockreg } from "../types";

const initialState = {
	//Slide 1
	name: "",
	date: "",
	maxAttendance: 0,

	//Slide 2
	logo: "",
	badgeColor: "",

	// Slide 3
	description: "",
	
	//Slide 4
	fee: "",
	serviceFee: "",
} as Blockreg.Event;

export const EventBuilderSlice = createSlice({
	name: 'Events',
	initialState,
	reducers: {
		addEventData: (state, action: PayloadAction<Partial<Blockreg.Event>>) => {
			for(let key of Object.keys(action.payload)) {
				// Because of typechecking, can't do this in a dynamic way
				switch(key){ 
					case 'name':
						state.name = action.payload['name'] || state.name;
						break;
					case 'date':
						state.date = action.payload['date'] || state.date;
						break;
					case 'maxAttendance':
						state.maxAttendance = action.payload['maxAttendance'] ?? state.maxAttendance;
						break;
					case 'logo':
						state.logo = action.payload['logo'] || state.logo;
						break;
					case 'badgeColor':
						state.badgeColor = action.payload['badgeColor'] || state.badgeColor;
						break;
					case 'description':
						state.description = action.payload['description'] || state.description;
						break;
					case 'fee':
						state.fee = action.payload['fee'] || state.fee;
						break;
					case 'serviceFee':
						state.serviceFee = action.payload['serviceFee'] || state.serviceFee;
						break;
				}
			}
		},
	}
});

export const { addEventData } = EventBuilderSlice.actions;

export default EventBuilderSlice.reducer;
