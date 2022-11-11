const axios = require('axios');
const {apiUrl} = require('../config');
const logger = require('../logger');


exports.getRuleActions = async () => {
  logger.info('Getting rule actions with Axios get');
  const ruleActions = await axios.get(`${apiUrl}/rule-action/list`);

  return {ruleActions: ruleActions.map(x => x.get())};
}