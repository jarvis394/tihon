# Grandpa Tihon

> A bot that sends incomprehensible crap into a conversation, and even randomly. From the village, what to say.

##### _- Vatslav Tarnatovski_

## Usage

To add bot, go to [VK userpage](https://vk.com/tihon_bot) and add **bot to friends list**.
Then, you can actually start using bot by typing commands, starting with `/` or `@tihon_bot`.

## Commands

See [bot's website](https://dedtihon.cf)

## Running

```
git clone https://github.com/jarvis394/tihon
cd tihon
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

Global:

- ~~Learn TypeScript to get rid of some checking. _Types are good_~~
- ~~Make an API and divide frontend and backend to 2 projects~~
- Translate everything to English, even `/random`

Needed:

- ~~Set every checking as `throw new CommandError` for better code style and error handling~~

  ~~Better make a callback for command to execute with given command result~~

  Done by modules system in v8

- ~~Add unified timeouts for commands~~
- Get results of every command written with command log
- Log data changes for debugging
- Recursively check commands filetree to get **`parents`** and **`children`** of commands.
  For example,

  ```javascript
  // Parent
  - guild/

    // Children
    - create { aliases: [ ...] }
    - leave { aliases: [ ... ] }
    ...
  ```

## Credits

Me in VK: [click](https://vk.com/tarnatovski)
