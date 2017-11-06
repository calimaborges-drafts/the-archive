let React = require('react');
let User = require('./User.jsx');

let UserList = React.createClass({

    render: function() {
        var body = [];
        this.props.users.forEach( ( user ) => {
            body.push(<User key={user._id} user={user} onDelete={this.props.onDelete} />);
        });

        return (
            <div>
                <h2>Lista de Usuários</h2>
                {body}
            </div>
        );
    }

});

module.exports = UserList;
