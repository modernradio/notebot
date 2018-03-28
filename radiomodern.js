    const Discord = require("discord.js");
    const bot = new Discord.Client({ autoReconnect: true });
    const request = require("request");
    bot.login(process.env.TOKEN);
    bot.on('ready', () => {
        setTimeout(audience, 60000);
    
        setInterval(() => {
            audience()
        }, 60 * 1000);
    
        function audience() {
            request("http://api.radionomy.com/currentaudience.cfm?radiouid=5d198d45-3ee5-4dee-8182-4ee0184d41f1&apikey=15355fc0-4344-4ff7-a795-8efa38742083", (error, response, body) => {
                if (error) return console.log(error);
    
                console.log("body: => " + body);
                console.log("response: => " + response);
    
                if (body == undefined) {
                    bot.user.setActivity("? /shrug");
                } else {
                    var msgActivity;
                    if (parseInt(body) < 2) {
                        msgActivity = "personne m'écoute"
                    } else {
                        msgActivity = "personnes m'écoutent"
                    }
                    bot.user.setActivity(body + " " + msgActivity);
                }
            });
        }
    })
