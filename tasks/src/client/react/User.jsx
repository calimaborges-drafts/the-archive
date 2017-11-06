let React = require('react');

let User = React.createClass({

    handleClick: function(id) {
        return (e) => {
            e.preventDefault();
            this.props.onDelete(id);
        };
    },

    render: function() {
        var divStyle = {
            marginBottom: '10px'
        };

        if (this.props.user.isSaving) {
            divStyle.backgroundColor = '#FFFFCC';
        }

        return (
            <div style={divStyle}>
                <strong>
                    {this.props.user.name}
                </strong>
                {' '}
                {this.props.user.pass}
                {' '}
                <a href="#" onClick={this.handleClick(this.props.user._id)}>Apagar</a>
            </div>
        );
    }

});

module.exports = User;
