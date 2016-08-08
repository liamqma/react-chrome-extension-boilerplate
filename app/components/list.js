import React, { Component, PropTypes } from "react";
import moment from "moment";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";

class List extends Component {
    render() {
        const notifications = this.props.notifications.filter((notification) => {
            return moment(notification.moment).isSame(moment(), 'day');
        });
        return (
            <Table>
                <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
                    <TableRow>
                        <TableHeaderColumn>#</TableHeaderColumn>
                        <TableHeaderColumn>Time</TableHeaderColumn>
                        <TableHeaderColumn>Completed</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody displayRowCheckbox={false}>
                    {notifications.map((notification, index) => {
                        return (
                            <TableRow key={index}>
                                <TableRowColumn>{index + 1}</TableRowColumn>
                                <TableRowColumn>
                                    {moment(notification.moment).format('HH:mm')}
                                </TableRowColumn>
                                <TableRowColumn>
                                    {notification.completed ? '✔' : '✖'}
                                </TableRowColumn>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        )
    }
}

List.propTypes = {
    notifications: PropTypes.array.isRequired
};

export default List