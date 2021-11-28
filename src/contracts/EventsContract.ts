import dayjs from 'dayjs';
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
				dateReadable: dayjs.unix(result[1].toNumber()).format("MMM D, YYYY H:mm"), //Seconds to milliseconds 
				fee: result[2].toString(),
				feeReadable: ethers.utils.formatEther(result[2].toString()),
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

			event.name = decodeURI(data.name);
			event.description = decodeURI(data.description);
			resolve(event);
		});
	}

	async getGasPrice() {
		const gas = await this._contract.getGasPrice();
		return gas.toString();
	}

	async createEvent(event: Blockreg.Event, estimateGas?: boolean) {
		const data = {
			name: encodeURI(event.name),
			description: encodeURI(event.description),
			badgeColor: event?.badgeColor,
			logoCid: event.logo,
			date: dayjs(event.date).unix(),
			fee: ethers.utils.parseEther(event.fee).toString(),
			maxAttendance: event.maxAttendance ?? -1,
		}
		const overrides = {
			gasLimit: 12500000,
		}
		if ( estimateGas ) {
			return await this._contract.estimateGas.createEvent(data.name, data.description, data.badgeColor, data.logoCid, data.date, data.fee, data.maxAttendance, overrides);
		} else {
			return await this._contract.createEvent(data.name, data.description, data.badgeColor, data.logoCid, data.date, data.fee, data.maxAttendance, overrides);
		}
	}

	async getHostedEvents(): Promise<Blockreg.EventResponse[]> {
		return await this._contract.getHostedEvents();
	}
} 

export default EventsContract;