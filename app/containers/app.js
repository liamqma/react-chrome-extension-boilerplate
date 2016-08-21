import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as NotificationActions from "../actions/notification";
import style from "./app.css";
import List from "../components/list";
import RaisedButton from "material-ui/RaisedButton";
import moment from 'moment';
import icon from './stretching.png';

const ONE_HOUR_IN_milliseconds = 1000 * 60 * 60;

function nextNotificationInMilliseconds(lastNotificationMoment) {
    return moment().diff(moment(lastNotificationMoment));
}

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

    constructor(props) {
        super(props);
        this.state = {
            message: ''
        };
    }

    componentDidMount() {
        //chrome.alarms.onAlarm.addListener(this.check.bind(this));
        //chrome.alarms.create('app', {
        //    periodInMinutes: 1
        //});
        //this.check();
    }

    check() {
        const { notifications } = this.props;

        if (notifications.length === 0) {
            this.notify();
        } else {
            if (nextNotificationInMilliseconds(notifications[notifications.length - 1].moment) > ONE_HOUR_IN_milliseconds) {
                this.notify();
            } else {
                this.setState({
                    message: `Next notification will be in ${Math.round((ONE_HOUR_IN_milliseconds - moment().diff(moment(notifications[notifications.length - 1].moment))) / 1000 / 60)} minutes`
                });
            }
        }
    }

    notify() {
        chrome.notifications.create('reminder', {
            type: 'basic',
            iconUrl: icon,
            title: 'Time to stand up.',
            message: 'We want you to live longer!',
            isClickable: true
        });
        chrome.notifications.onClicked.addListener(notificationId => {
            chrome.notifications.clear(notificationId);
            window.open("http://www.liamqma.me/notify/office-stretches.jpg");
        });
        this.props.actions.add();
    }

    onComplete(index) {
        window.open("http://www.liamqma.me/notify/office-stretches.jpg");
        this.props.actions.complete(index);
    }

    render() {
        return (
            <div className={style.normal}>
                Stretch Reminder
            </div>
        );
    }
}
