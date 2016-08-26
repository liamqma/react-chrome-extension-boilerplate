import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as SettingActions from "../actions/setting";
import style from "./app.css";
import List from "../components/list";
import RaisedButton from "material-ui/RaisedButton";
import moment from 'moment';
import Slider from 'material-ui/Slider';

@connect(
    state => ({
        setting: state.setting
    }),
    dispatch => ({
        actions: bindActionCreators(SettingActions, dispatch)
    })
)
export default class App extends Component {

    static propTypes = {
        setting: PropTypes.object.isRequired,
        actions: PropTypes.object.isRequired
    };

    onFromChange(event, value) {
        chrome.runtime.sendMessage({from: value});
        this.props.actions.update('from', value);
    }

    onToChange(event, value) {
        chrome.runtime.sendMessage({to: value});
        this.props.actions.update('to', value);
    }

    onEveryChange(event, value) {
        chrome.runtime.sendMessage({every: value});
        this.props.actions.update('every', value);
    }

    render() {
        return (
            <div className={style.normal}>
                <h1>Stretch Reminder</h1>
                <div className={style.row}>
                    <div className={style.col}>
                        From <label>{this.props.setting.from}:00</label>
                    </div>
                    <div className={style.col}>
                        <Slider sliderStyle={{marginTop: 0, marginBottom: 0}}
                                min={0}
                                max={24}
                                step={1}
                                onChange={this.onFromChange.bind(this)}
                                value={this.props.setting.from}/>
                    </div>
                </div>
                <div className={style.row}>
                    <div className={style.col}>
                        To <label>{this.props.setting.to}:00</label>
                    </div>
                    <div className={style.col}>
                        <Slider sliderStyle={{marginTop: 0, marginBottom: 0}}
                                min={0}
                                max={24}
                                step={1}
                                onChange={this.onToChange.bind(this)}
                                value={this.props.setting.to}/>
                    </div>
                </div>
                <div className={style.row}>
                    <div className={style.col}>
                        Every <label>{this.props.setting.every} mins</label>
                    </div>
                    <div className={style.col}>
                        <Slider sliderStyle={{marginTop: 0, marginBottom: 0}}
                                min={15}
                                max={60}
                                step={15}
                                onChange={this.onEveryChange.bind(this)}
                                value={this.props.setting.every}/>
                    </div>
                </div>
            </div>
        );
    }
}
