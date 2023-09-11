const { readdirSync } = require("node:fs");
const path = require("node:path");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const config = require("./config");

const client = new Client({
  intents: Object.keys(GatewayIntentBits).map((a) => {
    return GatewayIntentBits[a];
  }),
});
client.commands = new Collection();
client.config = config;

client.login(config.token);

require("./handlers/commands")(client);
require("./handlers/events")(client);

if (config.refrehCMDS) {
  client.on("ready", () => {
    require("./handlers/register-commands")(client);
  });
}
