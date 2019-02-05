const { error }

module.exports = (updates, api) => updates.on('message', async (context, next) => {
	const { session } = context.state;

	if (!('counter' in session)) session.counter = 0;
	session.counter += 1;
  
  if (session.counter % 50 === 0) {
    try {
      let commandFile = require(`../commands/random.js`);
      commandFile.run(api, context, []);
    } catch (e) { 
      error("> [LOG] " + e);
    }
    
    session.counter = 0;
  }

	await next();
});