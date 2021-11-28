import { BigNumber } from "@ethersproject/bignumber";

declare namespace Blockreg {
	export interface Event {	
		id: number,
		name: string,
		description: string,
		date: string,
		dateReadable?: string,
		fee: string,
		feeReadable?: string,
		cid: string, 
		maxAttendance: number,
		serviceFee?: string,
		hasRegistered?: boolean,
		logo?: string,
		badgeColor?: string,
	}

	export type EventResponse = [
		BigNumber, 	// Event Id
		BigNumber, 	// Date
		BigNumber, 	// Fee
		number,		// Max Attendance
		string,		// Data CID
	]

	export type StorageEvents = Record<number, Event>;

	export interface Registration {
		id: number,
		name: string,
		company: string,
		email: string,
		eventId: number,
		dataCid: string,
		imageCid: string,
		fee: string,
		serviceFee: string,
	}
}