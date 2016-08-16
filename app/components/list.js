import React, { Component, PropTypes } from "react";
import moment from "moment";
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from "material-ui/Table";
import { size } from 'lodash';

class List extends Component {
    render() {
        if (!size(this.props.notifications)) return null;
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
                    {this.props.notifications.map((notification, index) => {
                        return (
                            <TableRow key={index}>
                                <TableRowColumn>{index + 1}</TableRowColumn>
                                <TableRowColumn>
                                    {moment(notification.moment).format('HH:mm')}
                                </TableRowColumn>
                                <TableRowColumn>
                                    <span onClick={this.props.onComplete.bind(null, index)}>
                                        {notification.completed ? '✔' : '✖'}
                                    </span>
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