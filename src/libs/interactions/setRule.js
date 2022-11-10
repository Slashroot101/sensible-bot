const { SlashCommandBuilder } = require("discord.js");
const { patchConfigStore } = require("../api/configStore");
const logger = require("../logger");

module.exports = {
    data: new SlashCommandBuilder()
                        .setName('setrule')
                        .setDescription('Sets a rule on/off for the server')
                        .addStringOption(opt => opt.setName('name').setDescription('Rule name to patch').setRequired(true))
                        .addBooleanOption(opt => opt.setName('enabled').setDescription('Whether or not the rule is enabled').setRequired(true)),
    async execute(interaction, user) {
        logger.info(`Processing command /setrule for user [discordSnowflake=${interaction.user.id}]`);
        const ruleName = interaction.options.get('name').value;
        const enabled = interaction.options.get('enabled').value;

        await patchConfigStore(interaction.guild.id, {ruleAction, enabled, discordGuild: interaction.guild.id});
    }
}