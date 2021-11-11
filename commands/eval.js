const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("eval")
        .setDescription("fricking")
        .addStringOption(option =>
            option
                .setName("js")
                .setDescription("The js code to be run")
                .setRequired(true)),
    async execute(interaction) {
        if (interaction.user != 533844679997784074)
            return
        
        try {
            interaction.reply(eval(interaction.options.get("js").value).toString())
        }
        catch(e) {
            console.log(e)
        }
    }
}