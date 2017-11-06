let React = require('react');
let Task = require('./Task.jsx');

let TaskList = React.createClass({

    renderTask: function(task) {
        return (
            <Task key={task._id} task={task}
                onDone={this.props.onDone}
                onUndo={this.props.onUndo}
                onDelete={this.props.onDelete}
                onEdit={this.props.onEdit} />
        );
    },

    render: function() {
        var list = [];
        // var archived = [];
        this.props.tasks.forEach( ( task ) => {
            // if (task.archived) {
                // archived.push(this.renderTask(task));
            // } else {
                list.push(this.renderTask(task));
            // }
        });

        return (
            <div className="card-columns">
                {list}
            </div>
        );
    }

});

module.exports = TaskList;
