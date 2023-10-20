import { Context } from "grammy";
import { domainNameBuyers } from "../web3/graphCalls";
import { TLDContract } from "../web3/web3Call";

export const ValidateUserTGWithDomain = async (
	tgUsername: string,
	ctx: Context
) => {
	ctx.reply("Validating Telegram Account ..... \n *PLS* *WAIT*");
	const buyers: any[] = await domainNameBuyers();
	let userTgNameExists: boolean = false;
	if (buyers.length > 0) {
		for (let index = 0; index < buyers.length; index++) {
			const item = buyers[index];
			const buyersAddress = item.to.toString();
			const domain = await TLDContract.getDomain(buyersAddress);
			const data: any = await TLDContract.getData(domain);
			console.log({ data, domain });
			if (data) {
				const parseData = JSON.parse(data);
				if (parseData.hasOwnProperty("telegram")) {
					if (
						parseData.telegram === tgUsername ||
						parseData.telegram === "@" + tgUsername ||
						parseData.telegram === "@ " + tgUsername
					) {
						// console.log(first)
						console.log({ parseData });
						return (userTgNameExists = true);
					}
				}
			}
		}
	}
	return userTgNameExists;
};
