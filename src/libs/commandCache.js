const {readdirSync} = require('fs');
const path = require('path');

const logger = require('./logger');
const commands = [];
const commandFiles = readdirSync(path.resolve(process.cwd(), './src/libs/interactions')).filter(file => file.endsWith('.js'));


for(const file of commandFiles){
  logger.info(`Loading interaction ./src/libs/interactions/${file}`)
  const command = require(`./interactions/${file}`);
  commands.push(command);
  logger.info(`Finished loading interactions`);
}

module.exports = commands;