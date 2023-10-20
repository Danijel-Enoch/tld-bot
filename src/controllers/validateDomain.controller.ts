import { domainNameBuyers } from "../web3/graphCalls";
import { TLDContract } from "../web3/web3Call";

export const ValidateUserTGWithDomain = async (tgUsername: string) => {
	const buyers: any[] = await domainNameBuyers();
	let userTgNameExists: boolean = false;
	if (buyers.length > 0) {
		for (let index = 0; index < buyers.length; index++) {
			const item = buyers[index];
			const buyersAddress = item.to.toString();
			const domain = await TLDContract.getDomain(buyersAddress);
			const data: any = await TLDContract.getData(domain);
			if (data) {
				const parseData = JSON.parse(data);
				if (parseData.hasOwnProperty("telegram")) {
					if (parseData.telegram === tgUsername) {
						console.log({ parseData });
						return (userTgNameExists = true);
					}
				}
			}
		}
	}
	return userTgNameExists;
};
