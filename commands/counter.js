exports.run = async (api, update, args) => {
	const { session } = update.state;

	await update.send(`Счётчик: (${session.counter})`);
}