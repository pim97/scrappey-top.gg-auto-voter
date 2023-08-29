const Scrappey = require("scrappey-wrapper");

const SCRAPPEY_API_KEY = 'API_KEY';
const scrappey = new Scrappey(SCRAPPEY_API_KEY);

const DISCORD_AUTH = 'DISCORD_AUTH_KEY'

/**
 * Scrappey.com is a proxy-wrapper for browsers, it allows you to run browser actions and execute javascript on any website.
 * with advanced options such as caching, proxy rotation, anti-bot and more.
 */
async function run() {

    const session = await scrappey.createSession({})

    const get = await scrappey.get({
        session: session.session,
        url: 'https://top.gg',
        browserActions: [
            {
                "type": "discord_login",
                "token": DISCORD_AUTH,
                "when": "beforeload"
            },
            {
                "type": "goto",
                "url": "https://discord.com/oauth2/authorize?scope=identify%20guilds%20email&redirect_uri=https%3A%2F%2Ftop.gg%2Flogin%2Fcallback&response_type=code&client_id=422087909634736160&state=Lw==",
            },
            {
                "type": "click",
                "cssSelector": "//body/div[@id='app-mount']/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/button[2]",
            }, 
            {
                "type": "goto",
                "url": "https://top.gg/bot/646937666251915264/vote",
            },
            {
                "type": "click",
                "cssSelector": "//button[contains(text(),'Vote')]"
            }
        ]
    })
}

run().catch(console.error);