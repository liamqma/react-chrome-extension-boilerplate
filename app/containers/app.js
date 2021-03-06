import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as SettingActions from "../actions/setting";
import style from "./app.css";
import List from "../components/list";
import RaisedButton from "material-ui/RaisedButton";
import moment from 'moment';
import Slider from 'material-ui/Slider';
import logo from './logo.jpg';
import Chip from 'material-ui/Chip';

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

    componentDidMount() {
        chrome.storage.local.get('last', (result = {}) => {
            if (result.last) {
                this.props.actions.update('last', result.last);
            }
        });
    }

    onFromChange(event, value) {
        this.props.actions.update('from', value);
        chrome.storage.local.set({from: value});
    }

    onToChange(event, value) {
        this.props.actions.update('to', value);
        chrome.storage.local.set({to: value});
    }

    onEveryChange(event, value) {
        this.props.actions.update('every', value);
        chrome.storage.local.set({every: value});
    }

    render() {

        let nextReminder = null;
        if (this.props.setting.last) {
            const diff = moment(this.props.setting.last).add(this.props.setting.every, 'm').diff(moment(), 'm');
            if (diff > 0) {
                nextReminder = <Chip style={{position: 'absolute', top: 0, right: 0}}>Stretch in {diff} minutes</Chip>
            }
        }

        return (
            <div className={style.normal}>
                <img className={style.logo} src={logo} />
                {nextReminder}
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
