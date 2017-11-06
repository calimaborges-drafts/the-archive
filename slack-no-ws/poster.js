'use strict';

const program = require('commander');
const prompt = require('prompt');
const slack = require('./slack');

program
.version('0.0.1')
.option('-t, --token [token]', 'Slack token')
.option('-c, --channel [channel]', 'Slack Channel')
.parse(process.argv);

if (!program.token || !program.channel) {
    throw new Error('Token (--token) and channel (--channel) are required.');
}

let slackClient = slack(program.token, program.channel);

prompt.start();
prompt.message = '>';
prompt.delimiter = '';

let showPrompt = () => {
    prompt.get({ properties: { message: { description: ' ' } } }, (err, res) => {
        if (err) return console.error(err);

        slackClient.sendMessage(res.message, (err, res) => {
            if (err) return console.error(err);
            showPrompt();
        });
    });
}

slackClient.connect( (err, res) => {
    if (err) return console.error(err);
    console.log('Logged in as ' + slackClient.userName + ' at ' + slackClient.teamName);

    slackClient.currentChannelInfo( (err, res) => {
        if (err) return console.error(err);

        showPrompt();
    });    
});
