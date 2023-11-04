import { EncryptedData } from "../types/EncryptedData";
import { getTokenMetadataUrl, publishMedicalRecords } from "./blockchain";
import { fetchMetadataFromIPFS, uploadMedicalRecordsToIPFS } from "./ipfs";
import { decryptDataKey, decryptFile } from "./libcrypto";

export async function uploadMedicalRecords(
	patientWalletAddress: string,
	file: File
) {
	const metdataFileUrl = await uploadMedicalRecordsToIPFS(file);
	await publishMedicalRecords(patientWalletAddress, metdataFileUrl);
}

export async function downloadAndDecryptMedicalRecords(
	patientWalletAddress: string,
	hospitalAddress: string
): Promise<Buffer> {
	const metadataUrl = await getTokenMetadataUrl(patientWalletAddress);
	const metadata: EncryptedData = await fetchMetadataFromIPFS(metadataUrl);
	const encryptedDataKey = metadata.encryptedDataKeys[hospitalAddress];
	const dataKey = decryptDataKey(encryptedDataKey);
	const encryptedFile = metadata.encryptedFile;
	const decryptedFile = decryptFile(
		Buffer.from(encryptedFile, "base64"),
		dataKey
	);
	return decryptedFile;
}
