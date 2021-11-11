const fs = require("fs")

const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');

const config = require("./config.json")

const rest = new REST({ version: '9' }).setToken(config.token);

(async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        const commands = fs.readdirSync("./commands").filter(name => name.endsWith(".js")).map(element => {
            return require(`./commands/${element}`).data.toJSON()
        })

        await rest.put(
            Routes.applicationGuildCommands(config.appId, config.guildId),
            { body: commands },
        );

        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
})();