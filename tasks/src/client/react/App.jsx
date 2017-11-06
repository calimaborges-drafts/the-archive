/** NPM Imports **/
let React = require('react');
let shortid = require('shortid');
let _ = require('lodash');

/** Local Imports **/
require('../../shared/promise-finally');

let TasksViewController = require('./TasksViewController.jsx');

let UserList = require('./UserList.jsx');
let UserInput = require('./UserInput.jsx');
let UserApi = require('../../shared/rest-user');

let App = React.createClass({

    /** React Methods **/
    getInitialState: function() {
        this.userApi = new UserApi("");

        return {
            users: []
        };
    },

    componentDidMount: function() {
        this.userApi.getUsers().then( (users) => {
            this.setState({ users })
        }).catch( (err) => {
            alert(err);
        });
    },


    render: function() {
        return (
            <div>
                <TasksViewController />
                <h1>Usuários</h1>
                <UserList users={this.state.users} onDelete={this.deleteUser} onUndo={this.undoTask} />
                <UserInput onAdd={this.addUser} />
            </div>
        );
    },

    /** Input methods **/
    addUser: function(user) {
        var tempUser = _.clone(user);

        tempUser.isSaving = true;
        tempUser._id = shortid.generate();

        this.userApi.saveUser(user).then( (user) => {
            tempUser._id = user._id;
            tempUser.pass = user.pass;
        }).catch( (err) => {
            alert(err);
            this._removeUser(tempUser);
        }).finally( () => {
            tempUser.isSaving = false;
            this.forceUpdate();
        });

        this.setState({
            users: this.state.users.concat([tempUser])
        });
    },

    deleteUser: function(userId) {
        let user = this._userById(userId);
        user.isSaving = true;

        this.userApi.deleteUser({ '_id': userId }).then( () => {
            this._removeUser(user);
        }).catch( (err) => {
            alert(err);
        }).finally( () => {
            user.isSaving = false;
            this.forceUpdate();
        });
    },

    /** Private Methods **/
    _userById: function(userId) {
        var user = null;
        this.state.users.forEach( (value) => {
            if (value._id == userId) user = value;
        });

        return user;
    },

    _removeUser: function(user) {
        var index = this.state.users.indexOf(user);
        if (index > -1) {
            var updatedUsers = this.state.users.slice();
            updatedUsers.splice(index, 1);
            this.setState({
                users: updatedUsers
            });
        }
    }
});

module.exports = App;
