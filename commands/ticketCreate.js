const Discord = require('discord.js');
const db = require('quick.db');

let idChannel = new db.table('idChannel');
let idCategory = new db.table('idCategory');
let numberTicket = new db.table('numberChannel');
let idRole = new db.table('idRole');

module.exports = {
    name: "createticket",
    run: async(client, message, args) => {

        setTimeout(() => message.delete(), 5000);

        if(!args[0]) {

            message.channel.send('You have not selected any channel, for more information use the command `;help createticket`').then(msg => {
                setTimeout(() => msg.delete(), 5000)
            })

        } else if(args[0] === 'new') {


            let getChannelText = idChannel.get('idChannelText')

            if(getChannelText) {

                message.channel.send('a ticket channel has already been created, to know how to change the channel use the command `;help changeidchannel`')

            } else {

                message.channel.send('Ticket channel created successfully.')

                const createChannelTicket = await message.guild.channels.create('ticket-channel', {
                    type: 'text',
                });
                console.log(createChannelTicket.id)

                idChannel.set('idChannelText', createChannelTicket.id)


            }
            
        }

        let idGetTextChannel = idChannel.get('idChannelText');
        if(idGetTextChannel) {

            let ticketMessageCreate = new Discord.MessageEmbed() 
                .setDescription('This is the default message of the ticket\n🔓 Open Ticket')
                .setColor('GREEN')
                .setFooter('developed by: carloh.js#0002')

            const m = await client.channels.resolve(idGetTextChannel).send(ticketMessageCreate)

            await m.react('🔓')
            await Discord.Util.delayFor(300)

            m.awaitReactions( async (r, u) => {

                let numberChannelTicket = numberTicket.get('number')
                if(!numberChannelTicket) return numberTicket.set('number', 1);

                r.users.remove(u.id)

                if(r.emoji.name === '🔓') {
                    if(idCategory.get('categoryID')) {

                        let getIdCategoryDB = idCategory.get('categoryID');

                        const createChannelTicket = await message.guild.channels.create(`ticket-${numberChannelTicket}`, {
                            type: 'text',
                            parent: getIdCategoryDB
                        }).then(async c => {

                            let getIdRole = idRole.get('idRole')

                            const roleSupport = message.guild.roles.cache.find(role => role.id === getIdRole)
                            const everyone = message.guild.roles.cache.find(role => role.name === '@everyone')

                            if(roleSupport) {
                                c.updateOverwrite(roleSupport, {
                                    SEND_MESSAGES: true,
                                    VIEW_CHANNEL: true,
                                });
                            }

                            c.updateOverwrite(everyone, {
                                SEND_MESSAGES: false,
                                VIEW_CHANNEL: false,
                            });
                            c.updateOverwrite(u, {
                                SEND_MESSAGES: true,
                                VIEW_CHANNEL: true,
                            });

                            let ticketChannelUser = new Discord.MessageEmbed()
                                .setDescription('This is the default message that the user will see when opening a ticket\n🔐Close ticket\n❌Delete ticket')
                                .setColor('GREEN')
                                .setFooter('developed by: carloh.js#0002')
                            let mU = await c.send(ticketChannelUser)

                            await mU.react('🔐')
                            await mU.react('❌')
                            await Discord.Util.delayFor(300)

                            mU.awaitReactions( async (r, u) => {

                                r.users.remove(u.id)

                                if(r.emoji.name === '🔐') {
                                    c.updateOverwrite(u, {
                                        SEND_MESSAGES: false,
                                        VIEW_CHANNEL: false,
                                    });
                                }

                                if(r.emoji.name === '❌') {
                                    c.delete()
                                }

                            });

                        }).catch(console.error);

                        numberTicket.add('number', 1)   
                    
                    } else {

                        const createChannelTicket = await message.guild.channels.create(`ticket-${numberChannelTicket}`, {
                            type: 'text',
                        }).then(async c => {

                            const everyone = message.guild.roles.cache.find(role => role.name === '@everyone')
                            c.updateOverwrite(everyone, {
                                SEND_MESSAGES: false,
                                VIEW_CHANNEL: false,
                            });
                            c.updateOverwrite(u, {
                                SEND_MESSAGES: true,
                                VIEW_CHANNEL: true,
                            });

                            let ticketChannelUser = new Discord.MessageEmbed()
                                .setDescription('This is the default message that the user will see when opening a ticket\n🔐Close ticket\n❌Delete ticket')
                                .setColor('GREEN')
                                .setFooter('developed by: carloh.js#0002')
                            let mU = await c.send(ticketChannelUser)

                            await mU.react('🔐')
                            await mU.react('❌')
                            await Discord.Util.delayFor(300)

                            mU.awaitReactions( async (r, u) => {

                                r.users.remove(u.id)

                                if(r.emoji.name === '🔐') {
                                    c.updateOverwrite(u, {
                                        SEND_MESSAGES: false,
                                        VIEW_CHANNEL: false,
                                    });
                                }

                                if(r.emoji.name === '❌') {
                                    c.delete()
                                }

                            });

                        }).catch(console.error);

                        numberTicket.add('number', 1)

                    }
                }

            });
        }

    }
}