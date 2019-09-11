const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.resolve(process.cwd(), 'data', 'data.sqlite'))

// Create users table
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS "users" (
    "id"	        INTEGER NOT NULL,
    "money"	      INTEGER NOT NULL DEFAULT 0,
    "reputation"	INTEGER NOT NULL DEFAULT 0,
    "guild"	      TEXT,
    "hidden"	    TEXT NOT NULL DEFAULT 'false',
    PRIMARY KEY("id")
  )
`
).run()

// Create guilds table
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS "guilds" (
    "id"	        TEXT NOT NULL,
    "name"	      TEXT NOT NULL,
    "reputation"	INTEGER NOT NULL DEFAULT 0,
    "wins"	      INTEGER NOT NULL DEFAULT 0,
    "loses"	      INTEGER NOT NULL DEFAULT 0,
    "money"	      INTEGER NOT NULL DEFAULT 0,
    "shield"	    INTEGER,
    "timeout"	    INTEGER,
    "population"	TEXT NOT NULL,
    PRIMARY KEY("id")
  )
`
).run()

// Create guilds members table
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS "guildMembers" (
    "userId"  	INTEGER NOT NULL,
    "guildId"	  TEXT NOT NULL,
    "role"	    INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("userId"),
    FOREIGN KEY("userId") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY("guildId") REFERENCES "guilds"("id") ON DELETE CASCADE
  )
`
).run()

// Create guilds items table
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS "guildItems" (
    "guildId"	  TEXT NOT NULL,
    "id"	      INTEGER NOT NULL,
    "quantity"	INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("guildId"),
    FOREIGN KEY("guildId") REFERENCES "guilds"("id") ON DELETE CASCADE
  )
`
).run()

// Create items table
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS "items" (
    "userId"	  INTEGER NOT NULL,
    "group"	    TEXT NOT NULL,
    "id"	      INTEGER NOT NULL,
    "quantity"	INTEGER DEFAULT 0,
    FOREIGN KEY("userId") REFERENCES "users"("id") ON DELETE CASCADE
  )
`
).run()

// Create earnings table
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS "earnings" (
    "userId"	INTEGER NOT NULL,
    "field"	  TEXT NOT NULL,
    "time"	  INTEGER NOT NULL,
    PRIMARY KEY("userId"),
    FOREIGN KEY("userId") REFERENCES "users"("id") ON DELETE CASCADE
  )
`
).run()

// Create pets table
db.prepare(
  `
  CREATE TABLE IF NOT EXISTS "pets" (
    "userId"	  INTEGER NOT NULL,
    "id"	      INTEGER NOT NULL,
    "timestamp"	INTEGER NOT NULL,
    PRIMARY KEY("userId"),
    FOREIGN KEY("userId") REFERENCES "users"("id") ON DELETE CASCADE
  )
`
).run()

// Add trigger add_guild_member
db.prepare(
  `
  CREATE TRIGGER IF NOT EXISTS add_guild_member BEFORE INSERT ON guildMembers 
  BEGIN 
    UPDATE users SET guild=NEW.guildId WHERE id=NEW.memberId;
  END
`
).run()

// Add trigger delete_guild_member
db.prepare(
  `
  CREATE TRIGGER IF NOT EXISTS delete_guild_member AFTER DELETE ON guildMembers 
  BEGIN 
    UPDATE users SET guild=NULL WHERE id=OLD.memberId;
  END
`
).run()

module.exports = {
  db,
}
