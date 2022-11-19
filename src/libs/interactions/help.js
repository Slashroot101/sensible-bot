const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder} = require('discord.js');
const { queryWarnings } = require('../api/warnings');

module.exports = {
    data: new SlashCommandBuilder()
                    .setName('help')
                    .setDescription('Returns a list of commands and what they do.'),
    async execute(interaction, user){

    }
}