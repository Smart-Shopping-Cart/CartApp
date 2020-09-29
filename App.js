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
  Checkout,
  CardDetailsMock,
  PayMock,
  MyAccountMock,
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
    Checkout,
    CardDetailsMock,
    PayMock,
    MyAccountMock,
  },

  {
    initialRouteName: 'MyAccountMock',
    headerMode: 'none',
  },
);

export default createAppContainer(Router);
