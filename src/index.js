const {Client, GatewayIntentBits, Collection} = require('discord.js');
const logger = require('./libs/logger')
const {discordToken} = require('./libs/config');
const {ready, interactionCreate, messageCreate, guildCreate, guildDelete} = require('./libs/events');
const initializeInteractions = require('./libs/interactions/init/initializeInteractions');
const {loadRuleData} = require('./libs/interactions/init/initializeRuleData');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.commands = new Collection();

(async () => {
    logger.info(`Bot beginning startup`);

    logger.info('Loading command data and caching it');
    await loadRuleData();
    logger.info('Completed caching role data');

    const commands = await initializeInteractions();
    commands.forEach(command => {
        client.commands.set(command.data.name, command);
    });

    client.on('ready', ready);
    client.on('interactionCreate', interactionCreate);
    client.on('messageCreate', messageCreate);
    client.on('guildCreate', guildCreate);
    client.on('guildDelete', guildDelete);
    
    logger.info('Authenticating with Discord');
    await client.login(discordToken);
    logger.info('Completed Discord authentication');
})();