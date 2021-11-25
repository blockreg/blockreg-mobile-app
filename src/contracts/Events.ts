import { ethers, BigNumber } from 'ethers';
import { BASE_IPFS_URL } from '../Constants';
import {abi} from './abis/Events';

class Events {
	_contract: ethers.Contract;
	id: number;
	name: string;
	description: string;
	date: Date;
	fee: BigNumber;
	maxAttendance: number;
	cid: string;

	constructor(providerOrSigner: ethers.Signer | ethers.providers.Provider) {
		this._contract = new ethers.Contract("0x347bFC536255915C74A2474786870F1ed0663B0F", abi, providerOrSigner);
		this.id = 0;
		this.name = "";
		this.description = "";
		this.date = new Date();
		this.fee = BigNumber.from(0);
		this.maxAttendance = -1;
		this.cid = "";
	}

	getEvent(eventId: number): Promise<this> {
		return new Promise<this>(async (resolve, reject) => {
			//Retrieve the on-chain data
			let result;
			try {
				result = await this._contract.getEvent(eventId);
			} catch (e) {
				reject("Error: No event found by that ID");
			}
			this.id = result[0].toNumber(); //BigNumber
			this.date = new Date(result[1].toNumber() * 1000); //Seconds to milliseconds 
			this.fee = result[2];
			this.maxAttendance = result[3];
			this.cid = result[4];			
			
			//Retrieve the CID data
			const response = await fetch(`${BASE_IPFS_URL}${this.cid}`);
			if ( !response.ok )
				return reject("Error: Event data couldn't be loaded. CID: "+`${this.cid}`);
				
			const data = await response.json();
			if ( parseInt(data.id) !== eventId ) 
				return reject("Error: event ID in CID and on-chain don't match.");

			this.name = data.name;
			this.description = data.description;
			resolve(this);
		});
	}
}

export default Events;