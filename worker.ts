import { BotWorker } from "@grammyjs/runner";
import { Context } from "grammy";
import { ValidateUserTGWithDomain } from "./src/controllers/validateDomain.controller";
import { verifyKeyboard } from "./src/views/keyboard.view";

const bot = new BotWorker<Context>(process.env.BOT_TOKEN || "not bot token");

bot.command("start", (ctx) => {
	ctx.reply(
		"Welcome! EAV Private Group Dashboard. \n Click on Verify to Validate your domain and join the Private Group",
		{ reply_markup: verifyKeyboard() }
	);
	console.log(bot.botInfo.id);
});
bot.on("callback_query:data", async (ctx) => {
	const data = ctx.callbackQuery.data;
	console.log("Unknown button event with payload", data);
	await ctx.answerCallbackQuery();
	if (data === "verify") {
		const username = ctx.update.callback_query.from.username;
		const domainDataIsValidated = await ValidateUserTGWithDomain(
			username,
			ctx
		);
		ctx.deleteMessage();
		if (domainDataIsValidated) {
			console.log("user has Domain");
			ctx.reply(
				"Welcome to this Ens Art Vault Private Group \n https://t.me/+9KI3RD6q2ztmM2Vk"
			);
		} else {
			console.log("user does not  Domain");
			ctx.reply(
				"You currently do not have the .EAV domain name \n Go to  https://www.ensartvault.com  Buy a domain here \n Go to profile and add your Telegram username to the  .eav domain name \n Then Head back to group to join"
			);
		}
	}
});
