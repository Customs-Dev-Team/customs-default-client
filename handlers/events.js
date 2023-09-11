const { readdirSync, existsSync } = require("node:fs");
const path = require("node:path");
module.exports = (client) => {
  const plugins = readdirSync("plugins");

  for (const plugin of plugins) {
    if (existsSync(`plugins/${plugin}/events`)) {
      const pluginEventFiles = readdirSync(`plugins/${plugin}/events`);

      for (const event of pluginEventFiles) {
        const eve = require(`../plugins/${plugin}/events/${event}`);
        client.on(eve.name, eve.run.bind(null, client));
      }
    }
  }
};
