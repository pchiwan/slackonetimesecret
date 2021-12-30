# Slack One Time Secret
A Node.JS Express server that exposes Slack command endpoints to create [One Time Secrets](https://onetimesecret.com/).

Uses [One time secret's API](https://onetimesecret.com/docs/api).

## Usage
The server is configured to start and listen in port 4000 by default.

Once the server is up and running, you should [create a Slack app](https://api.slack.com/slack-apps) in your team that will use [Slack commands](https://api.slack.com/slash-commands) and [interactive messages](https://api.slack.com/docs/message-buttons).

### Create a Slack command
Create a command in your app and make it POST to the API endpoint:
```
http://[SERVER_URL]:4000/secret
```

The server will return a Slack interactive message that requires the user to confirm or cancel the action. This step is necessary because interactive messages are the only way the original command issued by the user can be kept hidden from the Slack channel (so it's a private interaction between the user and app).

The response to the interactive message -called an 'action'- is posted to a different API endpoint, so keep reading...

### Enable interactive messages
You need to provide an API endpoint for all message buttons' actions, and that would be:
```
http://[SERVER_URL]:4000/api/action
```

### Install app to your team
Last step would be to make the app available to your app team. Simply follow [Slack's instructions](https://api.slack.com/slack-apps).
