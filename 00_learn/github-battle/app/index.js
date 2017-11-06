var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');
var Raven = require('raven-js')

var sentryKey = '11f4f0ac759c4e6fb30fcae730568bc0';
var sentryApp = '94954';
var sentryUrl = 'https://' + sentryKey + '@app.getsentry.com/' + sentryApp;

var _APP_INFO = {
    name: 'Github Battle',
    branch: 'video4',
    version: '1.0'
};

window.onerror = function() {
    Raven.showReportDialog();
};

Raven.config(sentryUrl, {
    release: _APP_INFO.version,
    tags: {
        branch: _APP_INFO.branch,
    }
}).install();

ReactDOM.render(
    routes,
    document.getElementById('app')
);
