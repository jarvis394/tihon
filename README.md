# Дед Тихон

> Чо несёт - непонятно. С села мужик.

##### _- Vatslav Tarnatovski_

## Usage

To add bot, go to [VK userpage](https://vk.com/tihon_bot) and add **bot to friends list**.
Then, you can actually start using bot by typing commands, starting with `/` or `@tihon_bot`.

## Commands

~~See [bot's website](https://tihon.glitch.me)~~

**NEW!** website on React: [tihon-web.glitch.me](https://tihon-web.glitch.me)

Will be moved to the `tihon.glitch.me` domain in future.

## Running

```
git clone https://github.com/jarvis394/ded_tihon
cd ded_tihon
npm i
```

**IMPORTANT!** After these steps you must provide **USER**'s VK API token and other enviroment constants in `./config`. Then just type

```
npm start
```

or

```
npm run nodemon
```

to run bot by yourself.

## Todo

- ~~Make help system better to not write big `exports.command` every time new command created~~
- ~~Deal with coins pushing before restarting a project~~
- ~~Try to use Docker, why not~~ **_Can't do that :(_**
- Learn TypeScript to get rid of some checking. _Types are good_
- ~~Do GitHub commits~~
- Make an API and divide frontend and backend to 2 projects **(Almost done)**
- Translate everything to English, even `/random`
