import React, { Component } from 'react';
import Panel from '../commons/Panel';

class Login extends Component {
    loginPanel() {
        return (
            <Panel title="Acesso ao Pidgefy">
                <form className="form-horizontal" role="form" onSubmit={this.props.handleLogin}>
                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-8">
                            <p>
                                Obtenha a chave de acesso clicando {' '}
                                <a href={this.props.authorizationUrl} target="_blank">aqui</a>.
                            </p>
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-8">
                            <input type="text" className="form-control" name="token" placeholder="Chave de acesso"
                                   onChange={this.props.handleTokenChange} />
                        </div>
                    </div>

                    <div className="form-group">
                        <div className="col-md-offset-2 col-md-8">
                            <button type="submit" className="btn btn-primary btn-block">Login</button>
                        </div>
                    </div>
                </form>
            </Panel>
        );
    }

    render() {
        if (!this.props.isLogged) {
            return this.loginPanel()
        } else {
            return this.props.children
        }
    }
}

Login.propTypes = {
    authorizationUrl: React.PropTypes.string,
    handleLogin: React.PropTypes.func,
    handleTokenChange: React.PropTypes.func,
    isLogged: React.PropTypes.bool
};


export default Login;
