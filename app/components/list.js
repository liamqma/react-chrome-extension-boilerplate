import React, { Component, PropTypes } from 'react';
import moment from 'moment';

class List extends Component {
    render() {
        const notifications = this.props.notifications.filter((notification) => {
            return moment(notification.moment).isSame(moment(), 'day');
        });
        return (
            <ul>
                {notifications.map((notification, index) => {
                    return (
                        <li key={index}>
                            {notification}
                        </li>
                    );
                })}
            </ul>
        )
    }
}

List.propTypes = {
    notifications: PropTypes.array.isRequired
};

export default List