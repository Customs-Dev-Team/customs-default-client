const { readdirSync, existsSync } = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { SlashCommandBuilder } = require("@discordjs/builders");
module.exports = (client) => {
  const rest = new REST({ version: "9" }).setToken(client.config.token);

  rest.put(Routes.applicationCommands(client.user.id), {
    body: client.commands.map((command) => command.data.toJSON()),
  });
};
