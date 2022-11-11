const axios = require('axios');
const {apiUrl} = require('../config');
const logger = require('../logger');

exports.getRuleList = async () => {
  logger.info('Getting rule list with axios get');
  const rules = await axios.get(`${apiUrl}/rule/list`);

  return rules.data;
}