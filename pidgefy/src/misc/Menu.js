import React from 'react';
import logo from '../logo.svg';

export default (props) => {
    return (
        <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <button type="button" className="navbar-toggle collapsed">
                        <span className="sr-only">Toggle navigation</span>
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                        <span className="icon-bar" />
                    </button>
                    <a className="navbar-brand" href="#">
                        <img src={logo} className="img-responsive" width="45" style={{ position: 'relative', top: '-12px' }} alt="logo" />
                    </a>
                </div>
                <div className="collapse navbar-collapse">
                    <ul className="nav navbar-nav">
                        {props.children}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
