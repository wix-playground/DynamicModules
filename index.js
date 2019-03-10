/**
 * @format
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import moduleResolver from './ModuleResolver';
import {moduleRegistrar} from './ModuleRegistrar'

global.moduleResolver = moduleResolver();
moduleRegistrar();

AppRegistry.registerComponent(appName, () => App);
