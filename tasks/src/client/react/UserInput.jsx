let React = require('react');

let UserInput = React.createClass({

    handleSubmit: function(e) {
        e.preventDefault();
        this.props.onAdd({
            name: this.refs.userName.value,
            pass: this.refs.userPass.value
        });

        this.refs.userName.value = '';
        this.refs.userPass.value = '';
    },

    render: function() {
        var inputStyle = {
            width: '100%'
        };

        return (
            <form onSubmit={this.handleSubmit}>
                <h2>Novo Usuário</h2>
                <p><input type="text" ref="userName" style={inputStyle} placeholder="Nome" /></p>
                <p><input type="password" ref="userPass" style={inputStyle} placeholder="Senha" /></p>
                <input type="submit" value="Adicionar usuário" />
            </form>
        );
    }

});

module.exports = UserInput;
