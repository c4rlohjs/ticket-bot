const Discord = require('discord.js');

module.exports = {
    name: 'help',
    run: async (client, message, args) => { 

        if(args[0] === 'createticket') {

            message.channel.send('If you have not created a channel for tickets, use the command `;createticket new`, in case you have already created it and you want to change it, use the command `changedchannel "ID"`');

        } else if(args[0] === 'changeidchannel') {

            message.channel.send('If you want to change the category of the ticket channels you must use the following syntax: `;changedchannel "ID"`');

        }else if(args[0] === 'definerole'){

            message.channel.send('With this command you can change the role that can see the ticket channels, to choose your own role use the following syntax: `;definerole <Mention Role>`');

        } else {
            message.channel.send('Specific about what you need to know, help available: `createticket` - `changeidchannel` - `definerole`')
        }

    }
}