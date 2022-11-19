const axios = require('axios');
const {apiUrl} = require('../config');
const logger = require('../logger');

exports.queryWarnings = async (props) => {
    logger.info(`Querying for user warnings for user [discordSnowflake=${props.discordSnowflake}]`);
    const warnings = await axios.get(`${apiUrl}/rule-warning/`, {params: props});

    return warnings.data.warnings;
}