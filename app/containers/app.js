import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as NotificationActions from "../actions/notification";
import style from "./app.css";
import List from "../components/list";
import RaisedButton from "material-ui/RaisedButton";
import moment from 'moment';

const ONE_HOUR_IN_milliseconds = 1000 * 60 * 60;
const ONE_MINUTE_IN_milliseconds = 1000 * 60;

function nextNotificationInMilliseconds(lastNotificationMoment) {
    return moment().diff(moment(lastNotificationMoment));
}

//chrome.alarms.onAlarm.addListener(function (alarm) {
//    console.log("Got an alarm!", alarm);
//});
//
//chrome.alarms.create('app', {
//    periodInMinutes: 1
//});

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

    componentDidMount() {
        const { notifications } = this.props;
        debugger;

        if (notifications.length === 0) {
            this.notify();
        } else {
            if (nextNotificationInMilliseconds(notifications[notifications.length - 1].moment) > ONE_HOUR_IN_milliseconds) {
                this.notify();
            } else {
                //alert(`Next notification will be in ${Math.round((ONE_HOUR_IN_milliseconds - moment().diff(moment(notifications[notifications.length - 1].moment))) / 1000 / 60)} minutes`);
            }
        }

    }

    notify() {
        chrome.notifications.create('reminder', {
            type: 'basic',
            iconUrl: 'data:image/gif;base64,R0lGODlhEAAQAMQAAORHHOVSKudfOulrSOp3WOyDZu6QdvCchPGolfO0o/XBs/fNwfjZ0frl3/zy7////wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAkAABAALAAAAAAQABAAAAVVICSOZGlCQAosJ6mu7fiyZeKqNKToQGDsM8hBADgUXoGAiqhSvp5QAnQKGIgUhwFUYLCVDFCrKUE1lBavAViFIDlTImbKC5Gm2hB0SlBCBMQiB0UjIQA7',
            title: 'Time to stand up.',
            message: 'We want you to live longer!',
            isClickable: true
        });
        const nextNotificationIndex = this.props.notifications.length;
        chrome.notifications.onClicked.addListener(notificationId => {
            chrome.notifications.clear(notificationId);
            window.open("http://www.liamqma.me/notify/office-stretches.jpg");
            this.props.complete(nextNotificationIndex);
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
                <List notifications={this.props.notifications} onComplete={this.onComplete.bind(this)}/>
            </div>
        );
    }
}
