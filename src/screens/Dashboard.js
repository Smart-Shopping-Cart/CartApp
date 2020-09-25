import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {
  removeValueData
} from '../core/utils';

const Dashboard = ({ navigation }) => {

  const logout = () =>{
    removeValueData('email');
    removeValueData('password');
    navigation.navigate('HomeScreen')
  }
  return(
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Button mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
      My Account
    </Button><Button mode="outlined" onPress={() => navigation.navigate('ScanQr')}>
      Start Shopping!
    </Button>
    <Button mode="outlined" onPress={logout}>
      Logout
    </Button>
  </Background>
  );
}
export default memo(Dashboard);
