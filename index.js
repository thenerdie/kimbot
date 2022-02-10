const fs = require("fs")
const config = require("./config.json")

const { Client, Collection, Intents } = require('discord.js');

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection()

const puppeteer = require('puppeteer')

async function launch() {
  let browser = await puppeteer.launch({
    executablePath: config.browserDirectory
  })

  fs.readdirSync("./commands").filter(name => name.endsWith(".js")).forEach(name => {
      const command = require(`./commands/${name}`)
      client.commands.set(command.data.name, command)
  })

  client.on('ready', () => {
      console.log(`Logged in as ${client.user.tag}!`);
  });

  client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    client.commands.get(interaction.commandName).execute(interaction, browser)
  });

  client.login(config.token);
}

launch()
