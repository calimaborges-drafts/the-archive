import React, { Component } from 'react';
import request from 'superagent'
import Cookies from 'js-cookie'

import Login from './auth/Login'
import Menu from './misc/Menu'
import Pokemon from './pokemon/Pokemon'


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            authorizationUrl: "#",
            token: null,
            pokemons: {}
        };
    }

    handleTokenChange(event) {
        this.setState({ token: event.target.value });
    }

    authenticate(event) {
        event.preventDefault();
        if (this.state.token == null) return;

        request.post(this.props.baseUrl + "/authorize?token=" + this.state.token).end( (err, res) => {
            if (err) {
                alert(err.response.body.message);
            } else {
                Cookies.set('token', res.text, {expires: 365});
                this.forceUpdate();
            }
        });
    }

    refreshList() {
        if (!this.isAuthorized()) return;
        request.get(this.props.baseUrl + "/pokemons")
            .accept('application/json')
            .set('token', Cookies.get('token'))
            .end( (err, res) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(res.body);
                    this.setState({ pokemons: res.body });
                }
            });
    }

    isAuthorized() {
        return !!Cookies.get('token');
    }

    logout() {
        Cookies.remove('token');
        this.forceUpdate();
    }

    componentDidMount() {
        request.get(this.props.baseUrl + "/authorization-url").end( (err, res) => {
            if (err) {
                console.error(err);
            } else {
                this.setState({
                    authorizationUrl: res.text
                });
            }
        });

        this.refreshList();
    }

    menuItems() {
        let menuItems = [];

        if (this.isAuthorized()) {
            menuItems.push(<li><a href="#" onClick={this.logout.bind(this)}>Logout</a></li>)
        }

        return menuItems;
    }

    render() {
        return (
            <div>
                <Menu>
                    {this.menuItems()}
                </Menu>
                <div className="container">
                    <Login authorizationUrl={this.state.authorizationUrl}
                           handleLogin={this.authenticate.bind(this)}
                           handleTokenChange={this.handleTokenChange.bind(this)}
                           isLogged={this.isAuthorized()}>

                        <Pokemon pokemons={this.state.pokemons} />
                    </Login>
                </div>
            </div>
        );
    }
}

App.propTypes = {
    baseUrl: React.PropTypes.string.isRequired
};

export default App;
