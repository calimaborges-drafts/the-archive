/** NPM Imports **/
let React = require('react');
let shortid = require('shortid');
let _ = require('lodash');

/** Local Imports **/
require('../../shared/promise-finally');

let TaskList = require('./TaskList.jsx');
let TaskInput = require('./TaskInput.jsx');
let TaskApi = require('../../shared/rest-task');

let TaskViewController = React.createClass({

    /** React Methods **/
    getInitialState: function() {
        this.taskApi = new TaskApi("");

        return {
            tasks: [],
            task: this._newTask()
        };
    },

    componentDidMount: function() {
        this.taskApi.getTasks().then( (tasks) => {
            this.setState({ tasks })
        }).catch( (err) => {
            alert(err);
        });
    },


    render: function() {
        return (
            <div className="container">
                <TaskInput onChange={this.inputTask} onSave={this.saveTask} onClear={this.clearTask} task={this.state.task} />
                <TaskList tasks={this.state.tasks} onDone={this.doTask} onUndo={this.undoTask} onDelete={this.deleteTask} onEdit={this.editTask} />
            </div>
        );
    },

    /** Input methods **/
    inputTask: function(title, body) {
        let task = _.clone(this.state.task);
        task.title = title;
        task.body = body;

        this.setState({ task });
    },

    saveTask: function() {
        let task = this._taskById(this.state.task._id);

        if (!task) {
            task = _.clone(this.state.task);
            task._id = shortid.generate();
            this.setState({
                tasks: this.state.tasks.concat([task])
            });
        }

        this._updateTask(task, this.state.task);

        this.taskApi.saveTask(this.state.task).then( (taskData) => {
            this._updateTask(task, taskData);
        }).catch( (err) => {
            alert(err);
            this._removeTask(task);
        }).finally( () => {
            task.isSaving = false;
            this.forceUpdate();
        });

        this.setState({
            task: this._newTask()
        });
    },

    deleteTask: function(taskId) {
        let task = this._taskById(taskId);
        task.isSaving = true;

        this.taskApi.deleteTask({ '_id': taskId }).then( () => {
            this._removeTask(task);
        }).catch( (err) => {
            alert(err);
        }).finally( () => {
            task.isSaving = false;
            this.forceUpdate();
        });

        this.forceUpdate();
    },

    doTask: function(taskId) {
        let task = this._taskById(taskId);
        task.isSaving = true;

        this.taskApi.archiveTask({ '_id': taskId }).then( () => {
            task.archived = true;
        }).catch( (err) => {
            alert(err);
        }).finally( () => {
            task.isSaving = false;
            this.forceUpdate();
        });

        this.forceUpdate();
    },

    undoTask: function(taskId) {
        let task = this._taskById(taskId);
        task.isSaving = true;

        this.taskApi.unarchiveTask({ '_id': taskId }).then( () => {
            task.archived = false;
        }).catch( (err) => {
            alert(err);
        }).finally( () => {
            task.isSaving = false;
            this.forceUpdate();
        });

        this.forceUpdate();
    },

    editTask: function(taskId) {
        this.setState({
            task: this._taskById(taskId)
        });
    },

    clearTask: function() {
        this.setState({
            task: this._newTask()
        });
    },

    /** Private Methods **/
    _taskById: function(taskId) {
        let task = null;
        this.state.tasks.forEach( (value) => {
            if (value._id == taskId) task = value;
        });

        return task;
    },

    _removeTask: function(task) {
        let index = this.state.tasks.indexOf(task);
        if (index > -1) {
            var updatedTasks = this.state.tasks.slice();
            updatedTasks.splice(index, 1);
            this.setState({
                tasks: updatedTasks
            });
        }
    },

    _newTask: function() {
        return {
            _id: undefined,
            title: undefined,
            body: '',
            updatedAt: undefined,
            createdat: undefined
        }
    },

    _updateTask: function(task, newTask) {
        task._id = newTask._id;
        task.title = newTask.title;
        task.body = newTask.body;
        task.createdAt = newTask.createdAt;
        task.updatedAt = newTask.updatedAt;
    }
});

module.exports = TaskViewController;
