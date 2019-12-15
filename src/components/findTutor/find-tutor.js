import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';

export default class FindTutor extends Component {
  render() {
    return (
      <React.Fragment>
        <StatusBar barStyle="light-content" />
        <View style={ styles.container }>
          <Text>Find Tutor</Text>
        </View>
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})