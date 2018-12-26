# Дед Тихон

> Чо несёт - непонятно. С села мужик. 
##### *- Vatslav Tarnatovski*

# Usage

##### English:

Command | Arguments | Description
------------ | ------------- | -------------
/ping | *none* | Pong!
/join | *<link>* | Join to multidialog by an invite link
/random | *none* | Sends random message from other multidialogs
/photo | *none* | Sends random photo from other multidialogs
/video | *none* | Sends random video from other multidialogs
/counter | *none* | Show current amount of messages (on every `50` message bot send random thing)
/calc | *<expression>* | Calculate something
/auto | *none* | Disable/Enable auto-sending messages
/no | *none* | Will your chat be in `random.js`?

##### Русский:

Команда | Аргументы | Описание
------------ | ------------- | -------------
/ping | *пусто* | Понг!
/join | *<ссылка>* | Войти в беседу по приглашению
/random | *пусто* | Отправить рандомное сообщение из других бесед
/photo | *пусто* | Отправить рандомное фото из других бесед
/video | *пусто* | Отправить рандомное видео из других бесед
/counter | *пусто* | Показывает количество сообщений до отправки всякой рандомной фигни (каждое `50` сообщение)
/calc | *<выражение>* | Посчитать матан
/auto | *пусто* | Отключить/Включить автоматическую рассылку сообщений
/no | *пусто* | Будет или нет диалог попадать в `random.js`?

# Changelog
- 2.4
  - Moved auto-sending messages to a module `auto.js`
  - Created `no` command. *See commands list*
- 2.3
  - Added `auto` command
  - Improved auto-send messages
- 2.2
  - Added `calc` command
- 2.1
  - Added `video` command
  - Fixed auto-send messages
  - Work on `random` command
- 2.0
  - Released **2.0**
  - Done middleware modules
  - Fixed logging messages
  - Added `counter` command
  - Released auto-send feature

### Old

- 1.9.1
  - Fixed `photo`
- 1.9
  - Added `photo` command
- *From 1.1 to 1.8*
  - First command: `ping`
  - Added `random`
  - New command handler
  - Added `join`
- 1.0
  - Init