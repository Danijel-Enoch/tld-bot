import { Bot, Context } from "grammy";
import validate from "./src/validation/config.validation";
import { ValidateUserTGWithDomain } from "./src/controllers/validateDomain.controller";
// Create an instance of the `Bot` class and pass your bot token to it.
const bot = new Bot(process.env.BOT_TOKEN!); // <-- put your bot token between the ""

// You can now register listeners on your bot object `bot`.
// grammY will call the listeners when users send messages to your bot.

validate();
// Handle the /start command.
bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
// Handle other messages.

bot.on(":new_chat_members", async (ctx: Context) => {
	// const chatId = ctx.msg?.chat.id;
	const newChatMembers = ctx.msg?.new_chat_members[0];
	const domainDataIsValidated = await ValidateUserTGWithDomain(
		newChatMembers.username
	);
	if (newChatMembers.id !== bot.botInfo.id) {
		if (domainDataIsValidated) {
			ctx.reply("Welcome to this Ens Art Vault Private Group");
		} else {
			ctx.reply(
				"You currently do not have the .EAV domain name \n Go to  https://www.ensartvault.com  Buy a domain here \n Go to profile and add your Telegram username to the  .eav domain name \n Then Head back to group to join"
			);
			ctx.api.unbanChatMember(ctx.chat.id, newChatMembers.id);
		}
	}
});

// Now that you specified how to handle messages, you can start your bot.
// This will connect to the Telegram servers and wait for messages.

// Start the bot.
bot.start();
