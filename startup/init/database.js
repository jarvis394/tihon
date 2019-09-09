const Database = require('better-sqlite3')
const path = require('path')

const db = new Database(path.resolve(process.cwd(), 'data', 'data.sqlite'))

// Create users table
db.prepare(`
  CREATE TABLE IF NOT EXISTS "users" (
    "id"	INTEGER,
    "money"	INTEGER NOT NULL DEFAULT 0,
    "reputation"	INTEGER NOT NULL DEFAULT 0,
    "guild"	TEXT,
    "hidden"	TEXT NOT NULL DEFAULT 'false',
    PRIMARY KEY("id")
  )
`).run()

// Create guilds table
db.prepare(`
  CREATE TABLE IF NOT EXISTS "guilds" (
    "id"	TEXT NOT NULL UNIQUE,
    "name"	TEXT NOT NULL,
    "reputation"	INTEGER NOT NULL,
    "stats"	TEXT NOT NULL,
    "money"	INTEGER NOT NULL,
    "shield"	INTEGER,
    "timeout"	INTEGER,
    "population"	TEXT NOT NULL,
    PRIMARY KEY("id")
  )
`).run()

// Create guilds members table
db.prepare(`
  CREATE TABLE IF NOT EXISTS "guildMembers" (
    "memberId"	TEXT NOT NULL,
    "guildId"	TEXT NOT NULL,
    "role"	INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("memberId"),
    FOREIGN KEY("memberId") REFERENCES "users"("id") ON DELETE CASCADE,
    FOREIGN KEY("guildId") REFERENCES "guilds"("id") ON DELETE CASCADE
  )
`).run()

// Create guilds items table
db.prepare(`
  CREATE TABLE IF NOT EXISTS "guildItems" (
    "guildId"	TEXT NOT NULL,
    "itemId"	INTEGER NOT NULL,
    "quantity"	INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY("guildId"),
    FOREIGN KEY("guildId") REFERENCES "guilds"("id") ON DELETE CASCADE
  )
`).run()

// Create items table
db.prepare(`
  CREATE TABLE IF NOT EXISTS "items" (
    "ownerId"	INTEGER NOT NULL,
    "group"	TEXT NOT NULL,
    "itemId"	INTEGER NOT NULL,
    "quantity"	INTEGER DEFAULT 0,
    FOREIGN KEY("ownerId") REFERENCES "users"("id") ON DELETE CASCADE
  )
`).run()

// Create earnings table
db.prepare(`
  CREATE TABLE "earnings" (
    "userId"	INTEGER NOT NULL,
    "field"	TEXT NOT NULL,
    "time"	INTEGER NOT NULL,
    PRIMARY KEY("userId"),
    FOREIGN KEY("userId") REFERENCES "users"("id") ON DELETE CASCADE
  )
`).run()

// Create pets table
db.prepare(`
  CREATE TABLE "pets" (
    "ownerId"	TEXT,
    "petId"	INTEGER NOT NULL,
    "timestamp"	INTEGER NOT NULL,
    PRIMARY KEY("ownerId"),
    FOREIGN KEY("ownerId") REFERENCES "users"("id") ON DELETE CASCADE
  )
`).run()

// Add trigger add_guild_member
db.prepare(`
  CREATE TRIGGER add_guild_member BEFORE INSERT ON guildMembers 
  BEGIN 
    UPDATE users SET guild=NEW.guildId WHERE id=NEW.memberId;
  END
`).run()

// Add trigger delete_guild_member
db.prepare(`
  CREATE TRIGGER delete_guild_member AFTER DELETE ON guildMembers 
  BEGIN 
    UPDATE users SET guild=NULL WHERE id=OLD.memberId;
  END
`).run()

module.exports = {
  db
}
