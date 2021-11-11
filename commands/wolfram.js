const axios = require("axios")

const { MessageAttachment } = require("discord.js")
const { SlashCommandBuilder } = require("@discordjs/builders")

const config = require("../config.json")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("wolfram")
        .setDescription("Query Wolfram")
        .addStringOption(option => 
            option
                .setName("query")
                .setDescription("The text to send to Wolfram for analysis")),
    async execute(interaction) {
        const attachment = new MessageAttachment(encodeURI(`http://api.wolframalpha.com/v1/simple?appid=${config.wolframAppId}&i=${interaction.options.get("query").value}`), 'interaction.png')

        interaction.reply("Loading...")

        interaction.channel.send({
            files: [attachment]
        })
    }
}