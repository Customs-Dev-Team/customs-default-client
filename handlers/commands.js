const { readdirSync, existsSync } = require("node:fs");
const path = require("node:path");
module.exports = (client) => {
  const plugins = readdirSync("plugins");

  for (const plugin of plugins) {
    if (existsSync(`plugins/${plugin}/commands`)) {
      const pluginCommandFiles = readdirSync(`plugins/${plugin}/commands`);

      for (const commandFile of pluginCommandFiles) {
        if (commandFile.includes(".js")) {
          const cmd = require(`../plugins/${plugin}/commands/${commandFile}`);
          client.commands.set(cmd.data.name, cmd);
        } else {
          const pluginCommandCategoryFiles = readdirSync(
            `plugins/${plugin}/commands/${commandFile}`
          );
          for (const command of pluginCommandCategoryFiles) {
            const cmd = require(`../plugins/${plugin}/commands/${commandFile}/${command}`);
            client.commands.set(cmd.data.name, cmd);
          }
        }
      }
    }
  }
};
