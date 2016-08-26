import React, { Component, PropTypes } from "react";
import { Provider } from "react-redux";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import App from "./app";

export default class Root extends Component {

    static propTypes = {
        store: PropTypes.object.isRequired
    };

    render() {
        const { store } = this.props;
        return (
            <Provider store={store}>
                <MuiThemeProvider>
                    <App />
                </MuiThemeProvider>
            </Provider>
        );
    }
}
