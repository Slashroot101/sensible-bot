const axios = require('axios');
const {apiUrl} = require('../config');
const logger = require('../logger');

exports.createTier = async (props) => {
  logger.info(`Creating new rule for [discordGuildRuleId=${props.discordGuildRuleId}]`);
  const createdTier = await axios.post(`${apiUrl}/action-tier/`, props);

  return createdTier.data;
}

exports.patchTier = async (tierId, props) => {
  logger.info(`Patching tier [tierId=${tierId}]`);
  const patchedTier = await axios.patch(`${apiUrl}/action-tier/${tierId}`, props);

  return patchedTier.data;
};

exports.getTier = async (actionId, guildRuleId) => {
  logger.info(`Getting tier with [actionId=${actionId}]/[guildRuleId=${guildRuleId}]`);
  const tier = await axios.get(`${apiUrl}/action-tier/guild-rule/${guildRuleId}/action/${actionId}`);

  return tier.data;
};