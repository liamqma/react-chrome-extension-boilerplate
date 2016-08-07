import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as NotificationActions from '../actions/notification';
import style from './app.css';
import List from '../components/list';

@connect(
    state => ({
        notifications: state.notification
    }),
    dispatch => ({
        actions: bindActionCreators(NotificationActions, dispatch)
    })
)
export default class App extends Component {

    static propTypes = {
        notifications: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    render() {
        return (
            <div className={style.normal}>
                <button className="pure-button pure-button-primary">Stretch</button>
                <List {...this.props} />
            </div>
        );
    }
}
