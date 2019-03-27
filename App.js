/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, NativeModules} from 'react-native';

type Props = {};
export default class App extends Component<Props> {

  constructor(props) {
    super(props);
  }

  render() {
    let module = global.moduleResolver.resolve('IMessage');
    let moduleName = module ? module.name() : 'None';

    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome to Dynamic Modules!</Text>
        <Text style={styles.instructions}>Selected module: {moduleName}</Text>

        <View style={{marginTop: 20, marginBottom: 20}}>
          <Button title='Show message' onPress={App._showMessage}/>
        </View>
        <Button title='Switch module' onPress={App._switchModule}/>
      </View>
    );
  }

  static _showMessage() {
    const module = global.moduleResolver.resolve('IMessage');
    if (module) {
      module.message();
    }
  }

  static _switchModule() {
    NativeModules.SwitchModule.switchModule();
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
