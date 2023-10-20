require("dotenv").config();
import { error } from "console";

async function validate() {
	const supabaseUrl = process.env.SUPABASE_URL;
	const supabaseKey = process.env.SUPABASE_KEY;
	const botToken = process.env.BOT_TOKEN;
	const rpc = process.env.RPC;
	if (!botToken || !supabaseKey || !supabaseUrl || !rpc) {
		throw error("Configurations are missing");
	} else {
		console.info("Configurations Files are Saved");
		console.log(`This is the SUPABASE_URL: ${supabaseUrl}`);
	}
}

export default validate;
