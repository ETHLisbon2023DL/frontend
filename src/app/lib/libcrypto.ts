import crypto from "crypto";
import { getAllPublicKeys } from "./blockchain";

export function encryptFile(file: Buffer, dataKey: string): Buffer {
	const iv = crypto.randomBytes(16);
	const cipher = crypto.createCipheriv(
		"aes-256-cbc",
		crypto.createHash("sha256").update(dataKey).digest(),
		iv
	);
	const encryptedData = Buffer.concat([cipher.update(file), cipher.final()]);
	return Buffer.concat([iv, encryptedData]);
}

export function encryptDataKey(dataKey: string, userPublicKey: string): string {
	const bufferDataKey = Buffer.from(dataKey, "utf8");
	const encryptedDataKey = crypto.publicEncrypt(userPublicKey, bufferDataKey);
	return encryptedDataKey.toString("base64");
}

export function decryptDataKey(encryptedDataKey: string): string {
	const userPrivateKey = "retrieve from wallet";
	const bufferEncryptedDataKey = Buffer.from(encryptedDataKey, "base64");
	const decryptedDataKey = crypto.privateDecrypt(
		userPrivateKey,
		bufferEncryptedDataKey
	);
	return decryptedDataKey.toString("utf8");
}

export function decryptFile(
	encryptedFileWithIv: Buffer,
	dataKey: string
): Buffer {
	const iv = encryptedFileWithIv.subarray(0, 16);
	const encryptedFile = encryptedFileWithIv.subarray(16);
	const decipher = crypto.createDecipheriv(
		"aes-256-cbc",
		crypto.createHash("sha256").update(dataKey).digest(),
		iv
	);
	return Buffer.concat([decipher.update(encryptedFile), decipher.final()]);
}

export async function getEncryptedDataKeys(dataKey: string): Promise<string[]> {
	const allPublicKeys: string[] = await getAllPublicKeys();
	let encryptedDataKeys: string[] = allPublicKeys.map((key: string) =>
		encryptDataKey(dataKey, key)
	);
	return encryptedDataKeys;
}

export function generateRandomDataKey(): string {
	return crypto.randomBytes(32).toString("hex");
}
