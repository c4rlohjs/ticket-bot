const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
const db = require('quick.db');

let idChannel = new db.table('idChannel');

client.commands = new Discord.Collection()

let files = fs.readdirSync("./commands").filter((f) => f.endsWith(".js"));

for(var file of files) {
    let command = require("./commands/" + file)
    client.commands.set(command.name, command)
}

var prefix = ";"

client.on('message', async message => {

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    let cmd = client.commands.get(command)
    if(cmd) {
        return cmd.run(client, message, args)
    }  

});

let keyBot = require('./credential.json')
client.login(keyBot.token)