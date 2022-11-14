const logger = require("./logger");
const {connect} = require('nats');
const {natsUrl} = require('../libs/config');

module.exports = (async function(){
    logger.info('Beginning NATS connection');
    const nats = await connect({
		servers: natsUrl,
	});
    logger.info('NATS connection complete');

    return nats;
})();