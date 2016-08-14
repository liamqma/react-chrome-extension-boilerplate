import React, { Component, PropTypes } from "react";
import style from "./man.css";

export default class Man extends Component {
    static propTypes = {
        completed: PropTypes.bool.isRequired,
        onClick: PropTypes.func.isRequired
    };

    render() {
        return (
            <div className={this.props.completed ? style.man : style.manOpacity}></div>
        )
    }
}