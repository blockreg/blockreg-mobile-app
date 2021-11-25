import { ethers, BigNumber } from 'ethers';
import { BASE_IPFS_URL, CONTRACT_ADDRESSES } from '../Constants';
import { Blockreg } from '../types';
import {abi} from './abis/Events';

class EventsContract {
	_contract: ethers.Contract;

	constructor(providerOrSigner: ethers.Signer | ethers.providers.Provider) {
		this._contract = new ethers.Contract(CONTRACT_ADDRESSES.EVENTS, abi, providerOrSigner);
	}

	getEvent(eventId: number): Promise<Blockreg.Event> {
		return new Promise<Blockreg.Event>(async (resolve, reject) => {
			//Retrieve the on-chain data
			let result;
			try {
				result = await this._contract.getEvent(eventId);
			} catch (e) {
				reject("Error: No event found by that ID");
			}

			const event: Blockreg.Event = {
				id: eventId, 
				name: "",
				description: "",
				date: result[1].toNumber(), //Seconds to milliseconds 
				fee: result[2].toString(),
				maxAttendance: result[3],
				cid: result[4],
				hasRegistered: false,		
			}
			
			//Retrieve the CID data
			const response = await fetch(`${BASE_IPFS_URL}${event.cid}`);
			if ( !response.ok )
				return reject("Error: Event data couldn't be loaded. CID: "+`${event.cid}`);
				
			const data = await response.json();
			if ( parseInt(data.id) !== eventId ) 
				return reject("Error: event ID in CID and on-chain don't match.");

			event.name = data.name;
			event.description = data.description;
			resolve(event);
		});
	}
} 

export default EventsContract;