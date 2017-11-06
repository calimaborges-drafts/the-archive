var React = require('react');
var fiftycentGenerator = require('../fiftycent-generator.js');
var moneyString = require('../money-string.js');

module.exports = React.createClass({
    render: function() {
        var divStyle = {
            textAlign: 'center',
            width: '100%'
        };

        var canvasStyle = {
            visibility: 'collapse'
        }

        //console.log(this.props.amount.toLocaleString('pt-BR', { style: 'currency', currency: this.props.currency }));
        var printValue = moneyString.toMoneyString(this.props.currency, this.props.amount);
        fiftycentGenerator.generate('c', printValue);
        return (
            <div style={divStyle}>
                <img src="" id="imagem"></img>
                <br />
                <canvas id="c" style={canvasStyle}></canvas>
            </div>
        )
    }
});
