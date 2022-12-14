const { SlashCommandBuilder } = require("discord.js");
const logger = require("../logger");
const {getRuleData} = require('../interactions/init/initializeRuleData')
const {createTier, getTier, patchTier} = require('../api/tier');
const {getDiscordRuleByRuleAction, patchConfigStore} = require('../api/configStore');

module.exports = {
  data: new SlashCommandBuilder()
                          .setName('tier')
                          .setDescription('Add/updates your tier based punishments')
                          .addStringOption(opt => {
                            const {rules} = getRuleData();
                            return opt
                                    .setName('name')
                                    .setDescription('what rule to apply this tier to')
                                    .setRequired(true)
                                    .addChoices(...rules.map(x => {return {name: x.name, value: x.id.toString()}}));
                        }) 
                        .addStringOption(opt => {
                            const {ruleActions} = getRuleData();
                            return opt
                                .setName('action')
                                .setDescription('what action should occur when the threshold is reached')
                                .setRequired(true)
                                .addChoices(...ruleActions.filter(x => x.name !== 'tiered').map(x => {return {name: x.name, value: x.id.toString()}}));
                        })
                        .addNumberOption(opt => opt.setName('maxoffenses').setDescription('The max offenses before this tier is executed').setRequired(true)),
  async execute(interaction, user, guild){
    logger.info(`Processing command /tier for user [discordSnowflake=${interaction.user.id}]`);
    const ruleId = interaction.options.get('name').value;
    const actionId = interaction.options.get('action').value;
    const maxOffenses = interaction.options.get('maxoffenses').value;

    let discordRule = await getDiscordRuleByRuleAction(ruleId, actionId);

    if(!discordRule.rule){
      logger.info(`Creating discord rule because it does not exist [ruleId=${ruleId}]/[actionId=${actionId}]/[guildId=${guild.id}]`);
      discordRule = await patchConfigStore(guild.id, ruleId, {enabled: true, discordGuildId: guild.id, ruleId: ruleId,});
    }
    console.log(discordRule)
    const tier = await getTier(actionId, discordRule.DiscordGuildRule.id);
    if(tier.tier){
      await patchTier(tier.tier.id, {tier: {maxOffenses, discordGuildRuleId: discordRule.DiscordGuildRule.id, ruleActionId: actionId}});
      await interaction.reply(`Succesfully updated the tier!`);
    } else {
      await createTier({tier: {discordGuildRuleId: discordRule.DiscordGuildRule.id, maxOffenses, ruleActionId: actionId}});
      await interaction.reply(`Succesfully added the tier!`);
    }
  }
};
