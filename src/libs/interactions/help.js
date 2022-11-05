const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
    data: new SlashCommandBuilder()
                    .setName('help')
                    .setDescription('Returns a list of commands and what they do.'),
    async execute(interaction, user){

    }
}