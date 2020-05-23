/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { Component } from 'react';
import Login from './src/components/Login/Login';

// export default class AwsomeApp extends Component {
//     render() {
//         return (
//             <Login/>
//         );
//     }
// }

 AppRegistry.registerComponent(appName, () => Login);
