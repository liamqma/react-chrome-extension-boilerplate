import React, { Component, PropTypes } from "react";
import moment from "moment";
import style from "./list.css";

class List extends Component {
    render() {
        const notifications = this.props.notifications.filter((notification) => {
            return moment(notification.moment).isSame(moment(), 'day');
        });
        return (
            <table className={style.list}>
                <tbody>
                {notifications.map((notification, index) => {
                    return (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                                {moment(notification.moment).format('HH:mm')}
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        )
    }
}

List.propTypes = {
    notifications: PropTypes.array.isRequired
};

export default List