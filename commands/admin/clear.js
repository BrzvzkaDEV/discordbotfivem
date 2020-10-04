module.exports = {
        name: "clear",
        category: "admin",
        description: "Usuwa wymienioną liczbę wiadomości",
        run: async (client, message, args, config, language) => {
            await message.delete();
            
            if (!message.member.hasPermission("MANAGE_MESSAGES")) {
                return message.reply(`${language.noperms}`)
            }

            if (!message.guild.me.hasPermission("MANAGE_MESSAGES")) {
                return message.reply(`${language.botnoperms}`)
            }

            if (!args[0]) {
                return message.reply(`${language.invalidargs}`)
            }

            if (isNaN(args[0])) {
                return message.reply(`${args[1]} To nie numer!`)
            }

            const logerchannel = message.guild.channels.find(channel => channel.name === `${config.logchannel}`);

            if (args[0] !== 0) {
                message.channel.bulkDelete(`${args[0]}`);
                logerchannel.send(`${args[0]} messages were deleted in <#${message.channel.id}>`)
                .catch(error => message.reply(`Attempted to delete ${args[0]} messages but there was an error: ${error}`))
            }
        }
    }


            