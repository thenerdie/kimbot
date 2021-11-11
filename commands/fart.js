const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("fart")
        .setDescription("disruptively fart in the chat"),
    async execute(interaction) {
        interaction.reply("https://akm-img-a-in.tosshub.com/indiatoday/images/story/201412/fart_story_650_121414044341.jpg?size=1200:675")
    }
}