import React, { Component } from "react";
import { AppLoading } from "expo";
import * as Font from "expo-font";
import AppNavigator from "./src/navigator/AppNavigator";

export default class App extends Component {
  state = {
    isLoadingComplete: false
  };
  _loadResourcesAsync = async () => {
    return Promise.all([
      Font.loadAsync({
        FuturaLight: require("./assets/fonts/futura-light.ttf"),
        FuturaMedium: require("./assets/fonts/futura-medium.ttf")
      })
    ]);
  };
  _handleLoadingError = error => {
    console.warn(error);
  };
  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return <AppNavigator />;
    }
  }
}
