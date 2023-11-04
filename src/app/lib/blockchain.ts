import { KeyInfo } from "../types/KeyInfo";
import { BigNumber, ethers } from "ethers";
import publicKeyRegisterAbi from "../abi/publicKeyRegisterAbi.json";
import { fetchMetadataFromIPFS } from "./ipfs";
import { EncryptedData } from "../types/EncryptedData";

const publicKeyRegisterAddress = "0x...";
const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");

const publicKeyRegisterContract = new ethers.Contract(
	publicKeyRegisterAddress,
	publicKeyRegisterAbi,
	provider
);

export async function getAllPublicKeys(): Promise<string[]> {
	const allKeys: KeyInfo[] = await publicKeyRegisterContract.getAllKeys();
	const allPublicKeys: string[] = allKeys.map((key: KeyInfo) => key.publicKey);
	return allPublicKeys;
}

export async function publishMedicalRecords(
	patientWalletAddress: string,
	ipfsUrl: string
): Promise<void> {
	await publicKeyRegisterContract.publishMedicalRecord(
		patientWalletAddress,
		ipfsUrl
	);
}

export async function getTokenMetadataUrl(
	patientWalletAddress: string
): Promise<string> {
	const tokenIds: BigNumber[] =
		await publicKeyRegisterContract.getHistoryOfMedicalRecordsForPatient(
			patientWalletAddress
		);
	const tokenId = tokenIds[tokenIds.length - 1];
	const tokenUri: string = await publicKeyRegisterContract.tokenURI(tokenId);
	return tokenUri;
}
