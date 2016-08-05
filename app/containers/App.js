import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as TodoActions from '../actions/todos';
import style from './App.css';
import List from '../components/list';

@connect(
    state => ({
        todos: state.todos,
        notifications: state.notification
    }),
    dispatch => ({
        actions: bindActionCreators(TodoActions, dispatch)
    })
)
export default class App extends Component {

    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    render() {
        return (
            <div className={style.normal}>
                <List {...this.props} />
            </div>
        );
    }
}
