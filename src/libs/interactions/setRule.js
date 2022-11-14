const { SlashCommandBuilder } = require("discord.js");
const { patchConfigStore } = require("../api/configStore");
const logger = require("../logger");
const {getRuleData} = require('../interactions/init/initializeRuleData')

module.exports = {
    data: new SlashCommandBuilder()
                        .setName('setrule')
                        .setDescription('Sets a rule on/off for the server')
                        .addStringOption(opt => {
                            const {rules} = getRuleData();
                            return opt
                                    .setName('name')
                                    .setDescription('Rule name to patch')
                                    .setRequired(true)
                                    .addChoices(...rules.map(x => {return {name: x.name, value: x.id.toString()}}));
                        }) 
                        .addStringOption(opt => {
                            const {ruleActions} = getRuleData();
                            return opt
                                .setName('action')
                                .setDescription('What action should occur if this rule is broken')
                                .setRequired(true)
                                .addChoices(...ruleActions.map(x => {return {name: x.name, value: x.id.toString()}}));
                        })
                        .addBooleanOption(opt => opt.setName('enabled').setDescription('Whether or not the rule is enabled').setRequired(true)),
    async execute(interaction, user, guild) {
        logger.info(`Processing command /setrule for user [discordSnowflake=${interaction.user.id}]`);
        const ruleName = interaction.options.get('name').value;
        const ruleAction = interaction.options.get('action').value;
        const enabled = interaction.options.get('enabled').value;
        console.log(ruleAction)
        await patchConfigStore(guild.id, ruleName, {ruleActionId: ruleAction, enabled, discordGuild: interaction.guild.id, ruleId: ruleName,});
        await interaction.reply('Succesfully updated the rule!');
    }
}