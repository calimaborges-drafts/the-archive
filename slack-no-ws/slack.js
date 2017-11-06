'use strict';

const request = require('superagent');
require('superagent-proxy')(request);

const _ = require('lodash');

const kBaseUrl = 'https://slack.com/api';

let configureProxyIfExists = request => {
    if (process.env.http_proxy) {
        process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
        request.proxy(process.env.http_proxy);
    }

    return request;
};

let configureToken = (request, token) => {
    return request.query({token});
};

module.exports = (token, channel) => {
    return {
        userId: null,
        teamId: null,
        userName: null,
        teamName: null,
        channelId: null,
        channelName: null,
        channelTopic: null,
        lastUpdate: null,
        userList: {},

        prepareRequest: function(method, path) {
            let req = request[method](kBaseUrl + '/' + path);
            req = configureProxyIfExists(req);
            req = configureToken(req, token);
            return req;
        },

        connect: function(callback) {
            this.prepareRequest('get', 'auth.test')
            .end( (err, res) => {
                this.userId = res.body.user_id;
                this.teamId = res.body.team_id;
                this.userName = res.body.user;
                this.teamName = res.body.team;

                callback(err, res);
            });
        },

        currentChannelInfo: function(callback) {
            this.prepareRequest('get', 'channels.list')
            .end((err, res) => {
                if (!res.body.channels) {
                    return callback(new Error['Couldn\'t get channels']);
                }

                _(res.body.channels).forEach( (c) => {
                    if (c.name === channel) {
                        this.channelId = c.id;
                        this.channelTopic = c.topic.value;
                        this.channelName = c.name;
                        return;
                    }
                });

                if (!this.channelId) {
                    err = new Error('Invalid channel name');
                }

                callback(err, res);
            });
        },

        currentChannelHistory: function(callback) {
            if (!this.channelId) {
                return callback(new Error('Current channel not found'));
            }

            this.prepareRequest('get', 'channels.history')
            .query({channel: this.channelId})
            .end(callback);
        },

        latestMessages: function(callback) {
            if (!this.channelId) {
                return callback(new Error('Current channel not found'));
            }

            this.prepareRequest('get', 'channels.history')
            .query({channel: this.channelId, oldest: this.lastUpdate || 0})
            .end((err, res) => {
                this.lastMessage = _.maxBy(res.body.messages, message => {
                    return message.ts;
                });

                if (this.lastMessage) {
                    this.lastUpdate = this.lastMessage.ts;
                }

                callback(err, res);
            });
        },

        userIdToName: function(userId, callback) {
            if (this.userList[userId]) {
                return callback(null, this.userList[userId]);
            }

            this.prepareRequest('get', 'users.info').
            query({user: userId})
            .end( (err, res) => {
                if (err) return callback(err, res);

                if (!res.body.user) {
                    this.userList[userId] = 'BOT';
                } else {
                    this.userList[userId] = res.body.user.name;
                }
                return callback(err, this.userList[userId]);
            });
        },

        sendMessage: function(message, callback) {
            if (!this.channelId) {
                return callback(new Error('Current channel not found'));
            }

            this.prepareRequest('get', 'chat.postMessage')
            .query({channel: this.channelId, text: message})
            .end(callback);
        }
    };
};
