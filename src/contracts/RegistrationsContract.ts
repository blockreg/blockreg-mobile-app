import { ethers, BigNumber } from 'ethers';
import { BASE_IPFS_URL, CONTRACT_ADDRESSES } from '../Constants';
import {abi} from './abis/Registrations';

class RegistrationsContract {
	_contract: ethers.Contract;

	constructor(providerOrSigner: ethers.Signer | ethers.providers.Provider) {
		this._contract = new ethers.Contract(CONTRACT_ADDRESSES.REGISTRATIONS, abi, providerOrSigner);
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
} 

export default RegistrationsContract;