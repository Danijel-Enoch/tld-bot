import { ethers } from "ethers";
import { FlexiPunkTLD, FlexiPunkTLD__factory } from "../types/contracts";

const contractAddress = "0xc2db399ba81304556bfc0b563892032434f5ab53";
const rpc = "https://goerli.infura.io/v3/4823ee0845bb40b18e00f11ba7ac1b8b";
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
		return await this.TLDContract.getDomainData(domain);
	}
	async getDomain(address: string) {
		return await this.TLDContract.defaultNames(address);
	}
}

export const TLDContract = new TLDCallClass(contractAddress, rpc);
