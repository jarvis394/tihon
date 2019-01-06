exports.run = async (api, update, args) => {
	const { session } = update.state;

	await update.send(`Счётчик: (${session.counter})`);
}

exports.command = {
  "name": "counter",
  "arguments": false,
  "description": {
    "en": "Show current amount of messages (on every 50th message bot send random thing)",
    "ru": "Показывает количество сообщений до отправки всякой рандомной фигни (каждое 50 сообщение)"
  }
}