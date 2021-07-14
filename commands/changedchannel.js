const Discord = require('discord.js');
const db = require('quick.db');

let idCategory = new db.table('idCategory');

module.exports = {
    name: 'changedchannel',
    run: async (client, message, args) => {

        let getIdCategory = idCategory.get('categoryID');

        if(!args[0]) return message.channel.send('You need to put an ID');
        if(isNaN(args[0]) ) return message.channel.send('You need to put a valid ID');

        if(getIdCategory) {

            idCategory.set('categoryID', args[0]);
            message.channel.send('ID changed successfully');

        } else {

            idCategory.set('categoryID', args[0]);
            message.channel.send('ID changed successfully');
            
        }

    }
}