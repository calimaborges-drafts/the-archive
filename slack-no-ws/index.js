'use strict';

const program = require('commander');
const colors = require('colors/safe');
const _ = require('lodash');
const fs = require('fs');

const slack = require('./slack');

program
    .version('0.0.1')
    .option('-t, --token [token]', 'Slack token')
    .option('-c, --channel [channel]', 'Slack Channel')
    .parse(process.argv);

if (!program.token || !program.channel) {
    throw new Error('Token (--token) and channel (--channel) are required.');
}

let latestTimeStamp = null;
let slackClient = slack(program.token, program.channel);
let lastUpdate = null;

let sortMessages = (messages) => {
    return _.sortBy(messages, message => {
        return message.ts;
    });
}

let showMessage = (message, callback) => {
    slackClient.userIdToName(message.user, (err, username) => {
        if (err) return console.error(err);
        console.log(colors.yellow(message.ts) + ' ' + colors.green(username + '> ') + message.text);
        if (callback) return callback();
    });
};

let showMessages = (messages, callback) => {
    let showNext = (index) => {
        if (index >= messages.length) {
            if (callback) {
                return callback();
            } else {
                return;
            }
        }
        showMessage(messages[index], () => showNext(index + 1));
    }

    showNext(0);
}

let isUpdating = false;
let updateChannelHistory = (slackClient) => {
    if (isUpdating) return;
    isUpdating = true;

    slackClient.latestMessages( (err, res) => {
        if (err) return console.error(err);

        lastUpdate = res.body.latest;
        let orderedMessages = sortMessages(res.body.messages);
        showMessages(orderedMessages, () => { isUpdating = false; });
    });
};

// let postMessageFromFile = (slackClient, filename) => {
//     fs.lstat(filename, (err, stats) => {
//         if (err) return;
//         if (!stats.isFile()) return;
//         fs.readFile(filename, 'utf8', (err, data) => {
//             if (err) return console.error(err);
//
//             slackClient.sendMessage(data, (err, res) => {
//                 if (err) return console.error(err);
//
//                 fs.truncate(filename, 0, (err) => {
//                     if (err) return console.error(err);
//                 })
//             });
//         });
//     });
// };

console.log('Using ' + program.token);
slackClient.connect( (err, res) => {
    if (err) console.error(err);
    console.log('Logged in as ' + slackClient.userName + ' at ' + slackClient.teamName);

    slackClient.currentChannelInfo( (err, res) => {
        if (err) return console.error(err);

        setInterval(() => { updateChannelHistory(slackClient) }, 1000);
    })
});
