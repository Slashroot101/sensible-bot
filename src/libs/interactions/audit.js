const { SlashCommandBuilder } = require("@discordjs/builders");
const { EmbedBuilder } = require('discord.js');
const { queryWarnings } = require('../api/warnings');
const getOrCreateUser = require('../businessLogic/getOrCreateUser');

module.exports = {
    data: new SlashCommandBuilder()
                            .setName('audit')
                            .setDescription('Audits a user for behavior')
                            .addStringOption(opt => opt.setName('user').setDescription('The user to audit').setRequired(true)),
    async execute(interaction, user){
        const targetUser = interaction.options.get('user').value;
        const discordUser = interaction.client.users.cache.get(targetUser);
        const savedUser = await getOrCreateUser(targetUser);
        const warnings = await queryWarnings({discordUserId: savedUser.id});
        const fields = warnings.map(warning => {
           return { name: warning.DiscordGuildRule.Rule.name, value: `Expunged: ${warning.expunged}`, inline: true };
        });

        const embed = new EmbedBuilder()
            .setColor(0x0099FF)
            .setAuthor({name: `${discordUser.username}`, iconUrl: discordUser.avatarURL({dynamic: true})})
            .setDescription(`User has received: ${warnings.length} warnings. Last 10 infractions:`)
            .addFields(fields.splice(0, 10));

        await interaction.reply({content: 'Here is the user report: ', embeds: [embed]});
    }
}