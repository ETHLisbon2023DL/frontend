import { NFTStorage, File } from "nft.storage";
import {
	encryptFile,
	generateRandomDataKey,
	getEncryptedDataKeys,
} from "./libcrypto";
import { EncryptedData } from "../types/EncryptedData";

function fileToBuffer(file: File): Promise<Buffer> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onloadend = () => resolve(new Buffer(reader.result as ArrayBuffer));
		reader.onerror = reject;
		reader.readAsArrayBuffer(file);
	});
}

function getCIDFromIPFSURL(ipfsUrl: string): string {
	const cid = ipfsUrl.replace("ipfs://", "");
	return cid;
}

function getIPFSGatewayUrl(ipfsUrl: string): string {
	const cid = getCIDFromIPFSURL(ipfsUrl);
	return `https://gateway.ipfs.io/ipfs/${cid}`;
}

async function fetchEncryptedFileAndDataKeys(
	metadata: any
): Promise<EncryptedData> {
	const response = await fetch(metadata.url);
	const data = await response.json();

	const encryptedFile = data.image;
	const encryptedDataKeys = JSON.parse(data.properties.encryptedDataKeys);

	return { encryptedFile, encryptedDataKeys };
}

export async function fetchMetadataFromIPFS(
	ipfsUrl: string
): Promise<EncryptedData> {
	const httpGatewayUrl = getIPFSGatewayUrl(ipfsUrl);
	const response = await fetch(httpGatewayUrl);
	const metadata = await response.json();

	const { encryptedFile, encryptedDataKeys } =
		await fetchEncryptedFileAndDataKeys(metadata);
	return { encryptedFile, encryptedDataKeys };
}

export async function uploadMedicalRecordsToIPFS(file: File): Promise<string> {
	const dataKey: string = generateRandomDataKey();
	const encryptedDataKeys = await getEncryptedDataKeys(dataKey);
	const buffer = await fileToBuffer(file);
	const encryptedFile = encryptFile(buffer, dataKey);

	const client = new NFTStorage({ token: "your-nft-storage-api-key" });

	const fileToUpload = new File([encryptedFile], "encryptedFile");
	const metadata = await client.store({
		name: "encryptedFile",
		description: "Encrypted Medical Record",
		image: fileToUpload,
		properties: {
			encryptedDataKeys: new File(
				[JSON.stringify(encryptedDataKeys)],
				"encryptedDataKeys"
			),
		},
	});

	return metadata.ipnft;
}
