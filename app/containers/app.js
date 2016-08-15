import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as NotificationActions from "../actions/notification";
import style from "./app.css";
import List from "../components/list";
import RaisedButton from "material-ui/RaisedButton";
import Man from '../components/man';

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
        const html = [];
        for (const key in this.props.notifications) {
            html.push(<Man completed={this.props.notifications[key]}/>);
        }

        return (
            <div className={style.normal}>
                {html}
            </div>
        );
    }
}
