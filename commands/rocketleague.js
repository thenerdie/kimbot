// https://api.tracker.gg/api/v2/rocket-league/standard/profile/epic/real%20thicc%20shady

const axios = require("axios")

const { MessageEmbed } = require('discord.js');
const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("rlstats")
        .setDescription("Query the Rocket League tracker")
        .addStringOption(option => 
            option
                .setName("query")
                .setDescription("The username of the user to query")),
    async execute(interaction) {
        const user = interaction.options.get("query").value

        try {
            const { data: { data } } = await axios.get(encodeURI(`https://api.tracker.gg/api/v2/rocket-league/standard/profile/epic/${user}`))
            
            const embed = new MessageEmbed()
                .setTitle(`Stats for **${user}**`)
                .setDescription("")
                .setURL(encodeURI(`https://rocketleague.tracker.network/rocket-league/profile/epic/${user}/overview`))

            const playlists = data.segments.filter(segment => segment.type == "playlist")

            let highest

            playlists.forEach(element => {
                embed.addField(element.metadata.name, `${element.stats.tier.metadata.name} ${element.stats.division.metadata.name} | ${element.stats.rating.value.toString()} MMR` + (element.stats.tier.metadata.estimated == true ? " (estimated)" : ""))

                if (element.metadata.name.startsWith("Ranked")) {
                    const mmr = element.stats.rating.value

                    if (highest ? mmr > highest.mmr : true) {
                        highest = { mmr: mmr, icon: element.stats.tier.metadata.iconUrl }
                    }
                }
            });

            embed.setImage(highest.icon)

            await interaction.reply({ embeds: [embed] })
        } catch {
            interaction.reply("User could not be found!")
            return
        }
    }
}