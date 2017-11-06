var React = require('react');
var $ = require('jquery');
var fx = require('money');
var qs = require('qs');

var FiftyCentify = require('./FiftyCentify.jsx');

module.exports = React.createClass({
    getInitialState: function() {
        var params = qs.parse(location.search.substring(1));

        if (!params.currency) {
            window.location = '?currency=BRL';
            return;
        }

        return $.extend({
            currency: "USD",
            amount: 0.5
        }, params);
    },

    componentDidMount: function() {
        $.getJSON("http://api.fixer.io/latest", function(data) {
            $.extend(data.rates, {'EUR': 1});
            fx.rates = data.rates;
            var rate = fx(this.state.amount).from("USD").to(this.state.currency);
            var rounded = Math.round(rate * 100) / 100;
            this.setState({
                amount: rounded
            });
        }.bind(this));
    },

    render: function() {
        return (
            <FiftyCentify currency={this.state.currency} amount={this.state.amount} />
        )
    }
});
