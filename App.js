import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import {
  HomeScreen,
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  Dashboard,
  CashRegister,
  ScanQr,
  ShoppingCart,
} from './src/screens';

const Router = createStackNavigator(
  {
    HomeScreen,
    LoginScreen,
    RegisterScreen,
    ForgotPasswordScreen,
    Dashboard,
    ScanQr,
    CashRegister,
    ShoppingCart,
  },
  
  {
    initialRouteName: 'ShoppingCart',
    headerMode: 'none',
  }
);

export default createAppContainer(Router);
