import React from 'react';

export default (props) => {
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-md-8 col-md-offset-2">
                    <div className="panel panel-default">
                        <div className="panel-heading">
                            <strong>{props.title}</strong>
                        </div>
                        <div className="panel-body">
                            {props.children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
