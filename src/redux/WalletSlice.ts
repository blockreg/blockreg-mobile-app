import { BigNumber } from "@ethersproject/bignumber";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ethers } from "ethers";

interface WalletScreenState {
	faceIdPermission: boolean,
	connectingWallet: boolean,
	mnemonic: string,
	publicKey: string,
	balance: string,
}

const initialState = {
	faceIdPermission: false,
	connectingWallet: false,
	mnemonic: "", 
	publicKey: "", 
	balance: "",
} as WalletScreenState;

export const WalletSlice = createSlice({
	name: 'Wallet',
	initialState,
	reducers: {
		setPublicKey: (state, action: PayloadAction<string>) => {
			state.publicKey = action.payload;
		},
		setMnemonic: (state, action: PayloadAction<string>) => {
			state.mnemonic = action.payload;
		},
		setBalance: (state, action: PayloadAction<string>) => {
			state.balance = ethers.utils.formatEther(BigNumber.from(action.payload).toString());
		},
		setFaceIdPermission: (state, action: PayloadAction<boolean>) => {
			state.faceIdPermission = action.payload;
		},
		setConnectingWallet: (state, action: PayloadAction<boolean>) => {
			state.connectingWallet = action.payload;
		},
	}
});

export const { setPublicKey, setMnemonic, setBalance, setFaceIdPermission, setConnectingWallet } = WalletSlice.actions;

export default WalletSlice.reducer;
