import { ethers, BigNumber } from 'ethers';
import { BASE_IPFS_URL, CONTRACT_ADDRESSES } from '../Constants';
import { Blockreg } from '../types';
import {abi} from './abis/Registrations';

class RegistrationsContract {
	_contract: ethers.Contract;

	constructor(providerOrSigner: ethers.Signer | ethers.providers.Provider) {
		this._contract = new ethers.Contract(CONTRACT_ADDRESSES.REGISTRATIONS, abi, providerOrSigner);
	}

	async register(registration: Blockreg.Registration, fee: BigNumber, estimateGas?: boolean ) {
		const data = {
			name: encodeURI(registration.name),
			company: encodeURI(registration.company),
			email: encodeURI(registration.email),
		};
		const overrides = {
			gasLimit: 12500000,
			value: fee,
		}
		if ( estimateGas ) {
			return await this._contract.estimateGas.register(registration.eventId, data.name, data.company, data.email, overrides);
		} else {
			return await this._contract.register(registration.eventId, data.name, data.company, data.email, overrides);
		}
	}

	getServiceFee(): Promise<BigNumber> {
		return new Promise<BigNumber>(async (resolve, reject) => {
			//Retrieve the on-chain data
			let result;
			try {
				result = await this._contract.getServiceFee();
			} catch (e) {
				reject("Error: No event found by that ID");
			}

			resolve(result);
		});
	}

	async getAccountRegistrations(): Promise<Blockreg.RegistrationResponse[]> {
		return await this._contract.getAccountRegistrations();
	}

	async getRegistrationFee(eventId: number): Promise<BigNumber> {
		return await this._contract.getRegistrationFee(eventId);
	}

	async getEventRegistrations(eventId: number): Promise<Blockreg.Registration[]> {
		return new Promise<Blockreg.Registration[]>(async (resolve, reject) => {
			const _registrations = await this._contract.getEventRegistrations(eventId);
			const registrations = [];
			for(let reg of _registrations) {
				let registration = {
					id: reg[0].toNumber(),
					fee: ethers.utils.formatEther(reg[2].toString()),
					dataCid: reg[4]
				} as Blockreg.Registration;
				
				const response = await fetch(`${BASE_IPFS_URL}${registration.dataCid}`);
				if ( !response.ok )
					continue;
					
				const data = await response.json();
				if ( parseInt(data.id) !== eventId ) 
					return reject("Error: registration ID in CID and on-chain don't match.");

				registration.name = decodeURI(data.name);
				registration.company = decodeURI(data.company);
				registrations.push(registration);
			}
			resolve(registrations);
		})
	}
} 

export default RegistrationsContract;