const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("deez")
        .setDescription("fricking"),
    async execute(interaction) {
        interaction.reply("nuts")
    }
}