import { Bot, Context } from "grammy";
import validate from "./src/validation/config.validation";
import { ValidateUserTGWithDomain } from "./src/controllers/validateDomain.controller";
import { distribute, run, sequentialize } from "@grammyjs/runner";
import { verifyKeyboard } from "./src/views/keyboard.view";
// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(process.env.BOT_TOKEN!); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

validate();
// Handle the /start command.
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
				"Click the link below to join  the Ens Art Vault Private Group \n https://t.me/+9KI3RD6q2ztmM2Vk"
			);
		} else {
			console.log("user does not  Domain");
			ctx.reply(
				"You currently do not have the .EAV domain name \n Go to  https://www.ensartvault.com  Buy a domain here \n Go to profile and add your Telegram username to the  .eav domain name \n Then Head back to group to join"
			);
		}
	}
});
// Handle other messages.

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

bot.use(distribute(__dirname + "./worker", { count: 3 }));
run(bot);
