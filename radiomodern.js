const Discord = require("discord.js");
const bot = new Discord.Client({ autoReconnect: true });
let prefix = "."
let prefixLog = "[!]"

var separation = "><><><><><><><><><><><"

bot.on("ready", () => {
    bot.user.setStatus("online")
    bot.user.setActivity(".create [name]")
    console.log(separation)
    console.log(prefixLog + " Bot créé par Ilian ! <3")
    console.log(prefixLog + " Bot prêt")
    console.log(separation)
})

bot.on("message", async message => {

    var Mess = message;
    var Mess_Channel = message.channel;
    var Mess_Member = message.member;

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const args_test = message.content.split(" ").slice(1);

    const BOT_MANAGE_CHANNELSPerm = message.guild.channels.find("id", message.channel.id).permissionsFor(message.guild.me).has("MANAGE_CHANNELS") && message.channel.type === 'text'

    if (!message.guild) return;

    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    if (message.content.startsWith(`${prefix}create`)) {
        if (!args[1]) return message.reply("Tu n'as pas mis de nom de salon à créer")

        const category_tes_salons = message.guild.channels.find("id", "438258039229906945")
        if (!category_tes_salons) return message.reply("Can't define category_tes_salons")

        let nom_salon = message.content.substr(args[0].length + 1)
        if (nom_salon.length > 20) return message.reply("Don't exceed 20 caracters for the name of the channel")

        message.guild.createChannel(nom_salon, "text").then(salon => {
            salon.setParent(category_tes_salons).then(() => {
                salon.overwritePermissions(message.author, { READ_MESSAGES: true, MANAGE_CHANNELS: true, MANAGE_MESSAGES: true, MANAGE_ROLES_OR_PERMISSIONS: true })
                salon.overwritePermissions(message.guild.defaultRole, { READ_MESSAGES: false })
        message.guild.channels.find("id", "438265531850817537").overwritePermissions(message.author, { SEND_MESSAGES: false });
        message.delete();
                
            })
        })
    }

    if (message.content.startsWith(`${prefix}eval`)) {

        function clean(text) {
            if (typeof (text) === "string")
                return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            else
                return text;
        }

        let owner_list = "145632403946209280 - 323039726040776705";
        if (!String(owner_list).includes(message.author.id)) return message.reply("Not owner")
        try {
            const code = args_test.join(" ");
            let evaled = eval(code);

            if (typeof evaled !== "string")
                evaled = require("util").inspect(evaled);

            message.channel.send(clean(evaled), { code: "xl", split: true });
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
})


bot.login(process.env.BOT_TOKEN);
