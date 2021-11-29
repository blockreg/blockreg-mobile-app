import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Blockreg } from "../types";

const initialState = {
	//Slide 1
	name: "",
	company: "",
	email: "",

	//Slide 2
	imageCid: "",

	//Slide 4
	fee: "",
	serviceFee: "",
} as Blockreg.Registration;

export const RegistrationBuilderSlice = createSlice({
	name: 'registrationBuilder',
	initialState,
	reducers: {
		addRegistrationData: (state, action: PayloadAction<Partial<Blockreg.Registration>>) => {
			for(let key of Object.keys(action.payload)) {
				// Because of typechecking, can't do this in a dynamic way
				switch(key){ 
					case 'name':
						state.name = action.payload['name'] || state.name;
						break;
					case 'company':
						state.company = action.payload['company'] || state.company;
						break;
					case 'email':
						state.email = action.payload['email'] || state.email;
						break;
					case 'imageCid':
						state.imageCid = action.payload['imageCid'] || state.imageCid;
						break;
					case 'fee':
						state.fee = action.payload['fee'] || state.fee;
						break;
					case 'serviceFee':
						state.serviceFee = action.payload['serviceFee'] || state.serviceFee;
						break;
					case 'eventId':
						state.eventId = action.payload['eventId'] || state.eventId;
						break;
				}
			}
		},
	}
});

export const { addRegistrationData } = RegistrationBuilderSlice.actions;

export default RegistrationBuilderSlice.reducer;
