const Scrappey = require("scrappey-wrapper");

/**
 * Check out our documentation here for more information: https://wiki.scrappey.com/
 * Your key can be found here: https://app.scrappey.com/#/
 */
const SCRAPPEY_API_KEY = 'API_KEY';
const scrappey = new Scrappey(SCRAPPEY_API_KEY);

/**
 * Your discord auth key
 */
const DISCORD_AUTH = 'DISCORD_AUTH_KEY'

/**
 * Scrappey.com is a proxy-wrapper for browsers, it allows you to run browser actions and execute javascript on any website.
 * with advanced options such as caching, proxy rotation, anti-bot and more.
 */
async function run() {

    /**
     * For all session options check: https://wiki.scrappey.com/getting-started#78f3fd5551724a78b12d548e95485bbe
     * We allow for multiple sessions to be created, each session has a different proxy and user-agent and unique fingerprint.
     */
    const session = await scrappey.createSession({})

    /**
     * Executes the browser actions requested
     */
    await scrappey.get({
        session: session.session,
        url: 'https://top.gg',
        browserActions: [

            /**
             * Logging in on discord
             */
            {
                "type": "discord_login",
                "token": DISCORD_AUTH,
                "when": "beforeload"
            },

            /**
             * Going to discord oauth2 page
             */
            {
                "type": "goto",
                "url": "https://discord.com/oauth2/authorize?scope=identify%20guilds%20email&redirect_uri=https%3A%2F%2Ftop.gg%2Flogin%2Fcallback&response_type=code&client_id=422087909634736160&state=Lw==",
            },

            /**
             * Accepting the oauth2 page
             */
            {
                "type": "click",
                "cssSelector": "//body/div[@id='app-mount']/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/button[2]",
            }, 

            /**
             * Going to page your want to vote on
             */
            {
                "type": "goto",
                "url": "https://top.gg/bot/646937666251915264/vote",
            },

            /**
             * Click the vote button
             */
            {
                "type": "click",
                "cssSelector": "//button[contains(text(),'Vote')]"
            }
        ]
    })

    /**
     * Destroys the session, this will free up space for other users
     */
    await scrappey.destroySession(session.session)
}

run().catch(console.error);