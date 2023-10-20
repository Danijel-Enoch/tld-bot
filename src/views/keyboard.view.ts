import { InlineKeyboard } from "grammy";

export const verifyKeyboard = () => {
	const keyboard = new InlineKeyboard();
	keyboard.text("Verify", "verify");

	return keyboard;
};
