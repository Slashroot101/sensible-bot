const {getRuleList} = require('../../api/rule');
const {getRuleActions} = require('../../api/ruleAction');

let data = {
  rules: [],
  ruleActions: [],
}

async function loadRuleData(){
  const rules = await getRuleList();
  const ruleActions = await getRuleActions();
  data.rules = rules.rules;
  data.ruleActions = ruleActions.ruleActions;
}

function getRuleData(){
  return data;
}

module.exports = {loadRuleData, getRuleData};


