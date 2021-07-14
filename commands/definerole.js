const Discord = require('discord.js');
const db = require('quick.db');

let idRole = new db.table('idRole')

module.exports = {
    name: "definerole",
    run: async (client, message, args) => {

        const mentionRole = message.mentions.roles.first()

        if(!mentionRole) return message.channel.send('You must mention a role.');

        if(mentionRole) {
            idRole.set('idRole', mentionRole.id)
            message.channel.send('Role successfully changed.')
        } else {
            idRole.set('idRole', mentionRole.id)
            message.channel.send('Role successfully changed.')
        }

    }
}