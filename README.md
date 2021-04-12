# HALP-Bot

HALP-Bot is a Slack bot build by the HALP-1000 team and is used to Automate your Patricks (and any other employee!). Read more about HALP-Bot in our blog: TODO: Add blog

![](/img/HALP.png)
### Development

Create a Slack app for running a development version of HALP-Bot:

##### Create Your App

1. Goto api.slack.com/apps .
2. Pick an name for your app.
    - If you're developing in a shared workspace, consider a name like `${your_name}-bot`.
This will help others to identify who owns the bot.
3. Select the Slack workspace you'll run the bot in for development.
4. Click the *Create App* button.

##### Run Your Local Copy
TODO: Update for k8s development.

1. Give your app a very basic permission so we have the ability to install
our app. We'll need to re-install the app later as we add new permission scopes.
    1. On the sidebar, select the *OAuth & Permission* tab, under *Features*
    2. On this tab, scroll to the *Scopes*. Add the Bot Token Scope, `app_mentions:read`.
    3. Go to the tab *Install App* under *Settings*. Click through the required
prompts to install the app.
2. On the *Basic Information* tab under *Settings*, find your App Credentials.
Show the *Signing Secret* value, and save it for later.
1. On the *Install App* tab under *Settings* copy the *Bot User OAuth Access Token*
value, and save it for later.
1. In your cloned copy of the repo, create a file called `.env`, it should contain the following environment variables:
```
CLIENT_SIGNING_SECRET=SECRET GOES HERE
BOT_TOKEN=SECRET GOES HERE
```
Replace the values after the equals sign with the values you saved before.
There is no need for quotes. **Make sure to not share these values, and to not
publish them online such as by pushing them to GitHub.**

5. Now that your environment variables are configured, run your local copy
of HALP-Bot with `docker-compose up`
6. Forward the local application to a public hostname with `ngrok http 3000`,
be sure to note the hostname that ngrok generates as we'll need it later.

##### Finishing Slack App Configuration

1. Now that the bot is running, we can configure Slack to send specific
notification to it, which will trigger bot actions. In the
*Interactivity & Shortcuts* tab under *Features* enable Interactivity and set
the Request URL to `https://${NGROK_HOSTNAME}/api/messages`
2. On the *Event Subscriptions* tab under *Features* enable Events, and set the
Request URL to `https://${NGROK_HOSTNAME}/api/messages`
3. On the same tab, we'll need to subscribe to bot events. Existing HALP-Bot
functionality requires the following:
    - `app_mention`
    - `message.channels`
    - `message.groups`
    - `message.im`
    - `message.mpim`
    - `reaction_added`
    
If you're developing new functionality, you may need additional event
subscriptions.
4. Return to the *OAuth & Permissions* tab, as we'll need to add a few more
scopes to the app. Slack with automatically add scopes required for the event
subscriptions we already set. In addition to those, we'll also need to add the
following:
    - `chat:write`
    - `users:read`
    
Once again, if you're developing new functionality, you may need additional
scopes to be granted.
5. Reinstall the app by clicking the button at the top of this tab. You'll need
to reinstall the app any time you request additional scopes.

With all of these steps complete, your bot should be running in the Slack
workspace you chose to develop for. You should now be ready to test your bot,
and progress with development.

#### Creating a Slash Command
1. Under *Slash Commands* select *Create New Command*
2. Add the slash command you wish to use - this can be anything you wish to add as a message you want your bot to respond to.
3. Add the request URL of your bot including the path to its message interface `/api/messages` (local dev will need to be your ngrok URL such as `https://${NGROK_HOSTNAME}/api/messages`)
4. Add a short description and save your changes.
5. If this is the first slash command you're adding you will need to reinstall the bot to your workspace.

#### Developing with the daily-image feature
[daily-image](./features/daily-image.js) retrieves a random funny image from the Bing Image Search API
1. To search for an image you need the environment variable `BING_SEARCH_API_KEY`
   1. Retrieve this after creating your [Bing search resource](https://docs.microsoft.com/en-us/bing/search-apis/bing-web-search/create-bing-search-service-resource#create-your-bing-resource)


#### Botkit Dev Resources
[Botkit Docs](https://botkit.ai/docs/v4)

