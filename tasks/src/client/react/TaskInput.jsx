var React = require('react');

var TaskInput = React.createClass({

    handleChange: function(e) {
        e.preventDefault();

        this.props.onChange(this.refs.taskTitle.value, this.refs.taskBody.value);
    },

    handleSubmit: function(e) {
        e.preventDefault();

        this.props.onSave();
    },

    handleClear: function(e) {
        e.preventDefault();

        this.props.onClear();
    },

    render: function() {
        let inputStyle = {
            width: '100%'
        };

        let buttonTitle = "Adicionar";

        if (this.props.task._id) {
            buttonTitle = "Alterar";
        }

        return (

            <form onSubmit={this.handleSubmit} className="form-group">
                <p><input className="form-control" type="text" ref="taskTitle" style={inputStyle} placeholder="Título" value={this.props.task.title} onChange={this.handleChange} /></p>
                <p><textarea className="form-control" ref="taskBody" style={inputStyle} placeholder="Descrição" value={this.props.task.body} onChange={this.handleChange} /></p>
                <input className="btn btn-primary" type="submit" value={buttonTitle} />
                {' '}
                <button className="btn btn-link" onClick={this.handleClear}>Limpar</button>
            </form>
        );


    }

});

module.exports = TaskInput;
