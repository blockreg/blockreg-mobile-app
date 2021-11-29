import { ethers } from "ethers";
import ReactNativeBiometrics from 'react-native-biometrics';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

export function getWeb3Provider() {
	const network = "kovan";
	return new ethers.providers.InfuraProvider(network, "d4ce2acc4c8d4df3aa13791fa8caf9d3");
	// return ethers.getDefaultProvider(network, {
	// 	infura: "d4ce2acc4c8d4df3aa13791fa8caf9d3",
	// });
}

export async function isFaceIdAvailable(): Promise<boolean> {
	try {
		const { biometryType } = await ReactNativeBiometrics.isSensorAvailable();
	
		if (biometryType === ReactNativeBiometrics.FaceID) {
			const checkPermission = await check(PERMISSIONS.IOS.FACE_ID);
			if ( checkPermission == RESULTS.GRANTED)
				return true;
		}
	} catch (e) {
		return false;
	}

	return false;
}

export async function requestFaceId(): Promise<boolean> {
	const result = await request(PERMISSIONS.IOS.FACE_ID, {
		title: "FaceID Required",
		message: "To protect your digital assets, we require FaceID authentication.",
		buttonPositive: "Protect Me",
	});

	return await isFaceIdAvailable();
}