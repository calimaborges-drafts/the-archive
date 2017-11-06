let React = require('react');
let marked = require('marked');

let Task = React.createClass({

    handleDone: function(id) {
        return (e) => {
            e.preventDefault();
            this.props.onDone(id);
        };
    },

    handleUndo: function(id) {
        return (e) => {
            e.preventDefault();
            this.props.onUndo(id);
        };
    },

    handleDelete: function(id) {
        return (e) => {
            e.preventDefault();
            this.props.onDelete(id);
        };
    },

    handleEdit: function(id) {
        return (e) => {
            e.preventDefault();
            this.props.onEdit(id);
        };
    },

    handlePostpone: function(id) {
        return (e) => {
            e.preventDefault();
        };
    },

    handleDoing: function(id) {
        return (e) => {
            e.preventDefault();
        }
    },

    transform: function(text) {
        if (text == undefined) return { __html: '' };
        let rawMarkup = marked(text, {sanatize: true});
        return { __html: rawMarkup };
    },

    render: function() {
        console.log(this.props.task);
        let divStyle = {
        };

        if (this.props.task.isSaving) {
            divStyle.backgroundColor = '#FFFFCC';
        }

        let primaryButton = <a href="#" className="btn btn-primary" onClick={this.handleDone(this.props.task._id)}>Feito</a>;
        let secondaryButton = <a href="#" className="btn btn-link" onClick={this.handlePostpone}>Adiar</a>;
        let editButton = <a href="#" className="btn btn-link" onClick={this.handleEdit(this.props.task._id)}>Editar</a>;

        if (this.props.task.archived) {
            divStyle.backgroundColor = '#F3F3F3';
            primaryButton = <a href="#" className="btn btn-link" onClick={this.handleUndo(this.props.task._id)}>Desfazer</a>;
            secondaryButton = <a href="#" className="btn btn-danger" onClick={this.handleDelete(this.props.task._id)}>Apagar</a>;
        } else {
            var doingButton = <a href="#" className="btn btn-link" onClick={this.handleDoing(this.props.task._id)}>Fazendo</a>;
        }

        return (
            <div style={divStyle} className="card">
                <div className="card-block">
                    <h4 className="card-title">
                        <span dangerouslySetInnerHTML={this.transform(this.props.task.title)} />
                    </h4>
                    <p className="card-text">
                        <span dangerouslySetInnerHTML={this.transform(this.props.task.body)} />
                        {primaryButton}
                        {secondaryButton}
                        {editButton}
                        {doingButton}
                    </p>
                    <p className="card-text text-xs-right">
                        <small>{this.props.task.updatedAt}</small>
                        {' '}
                        <small className="text-muted">{this.props.task._id}</small>
                    </p>
                </div>

            </div>
        );
    }

});

module.exports = Task;
