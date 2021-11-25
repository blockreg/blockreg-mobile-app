import { BigNumber } from "@ethersproject/bignumber";

declare namespace Blockreg {
	export interface Event {	
		id: number,
		name: string,
		description: "",
		date: Date,
		fee: BigNumber,
		cid: string, 
		maxAttendance: number,
		hasRegistered: boolean,
		logo?: string,
		color?: string,
	}
}