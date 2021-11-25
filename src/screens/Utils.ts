import { ethers } from "ethers";

export function getWeb3Provider() {
	const network = "kovan";
	return ethers.getDefaultProvider(network, {
		infura: "d4ce2acc4c8d4df3aa13791fa8caf9d3",
	});
}