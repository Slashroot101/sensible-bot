const axios = require('axios');
const {apiUrl} = require('../config');
const logger = require('../logger');

exports.patchConfigStore = async (guildId, ruleId, props) => {
    logger.info(`Creating patch request to configStore for discordGuildId=${guildId} and props ${props}`);
    const request = await axios.patch(`${apiUrl}/config-store/discord-guild/${guildId}/rule/${ruleId}`, {rule: props});

    return request.data;
};

exports.getDiscordRuleByRuleAction = async (ruleId, actionId) => {
    logger.info(`Fetching discord guild rules for [ruleId=${ruleId}]/[actionId=${actionId}]`);
    const request = await axios.get(`${apiUrl}/config-store/rule/${ruleId}/action/${actionId}`);

    return request.data;
};