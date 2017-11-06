/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  ListView,
} = React;

var REQUEST_URL = 'http://calimaborges-tasks.herokuapp.com/tasks'

var MOCKED_TASK_DATA = [
    {
        title: 'Task 1',
        body: 'Task 1 Body'
    }
];

var Tasks = React.createClass({
    getInitialState: function() {
        return {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
            loaded: false,
        };
    },

    componentDidMount: function() {
        this.fetchData();
    },

    fetchData: function() {
        fetch(REQUEST_URL)
            .then((response) => response.json())
            .then((responseData) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseData),
                    loaded: true,
                });
            })
            .done();
    },

    render: function() {
        if (!this.state.loaded) {
            return this.renderLoadingView();
        }

        return (
            <ListView
                dataSource={this.state.dataSource}
                renderRow={this.renderTask}
                style={styles.listview}
            />
        );
        return this.renderTask(task);
    },

    renderLoadingView: function() {
        return (
            <View style={styles.container}>
                <Text>
                    Loading tasks...
                </Text>
            </View>
        );
    },

    renderTask: function(task) {
        return (
          <View style={styles.container}>
            <Text style={styles.title}>
              {task.title}
            </Text>
            <Text style={styles.body}>
              {task.body}
            </Text>
          </View>
        );
    }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
    margin: 10,
  },
  body: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  listView: {
    paddingTop: 20,
    backgroundColor: '#F5FCFF',
  },
});

AppRegistry.registerComponent('Tasks', () => Tasks);
