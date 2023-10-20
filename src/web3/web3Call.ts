import { ethers } from "ethers";
import { FlexiPunkTLD, FlexiPunkTLD__factory } from "../types/contracts";

const contractAddress = "0x5d608c48EFE54a19dfb3c77d78863587f797eFAE";
const rpc = "https://mainnet.infura.io/v3/4823ee0845bb40b18e00f11ba7ac1b8b";
export class TLDCallClass {
	TLDContract: FlexiPunkTLD;
	constructor(contractAddress: string, rpc: string) {
		const Provider = new ethers.JsonRpcProvider(rpc);
		this.TLDContract = FlexiPunkTLD__factory.connect(
			contractAddress,
			Provider
		);
	}

	async getData(domain: string) {
		console.log("==>getting data");
		return await this.TLDContract.getDomainData(domain);
	}
	async getDomain(address: string) {
		console.log("==>getting Domaine Data");
		return await this.TLDContract.defaultNames(address);
	}
}

export const TLDContract = new TLDCallClass(contractAddress, rpc);
