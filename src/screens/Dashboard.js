import React, { memo, useState, useEffect  } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import {
  removeValueData,
  getStringData
} from '../core/utils';

const Dashboard = ({ navigation }) => {
  const [isThereBindToken, setIsThereBindToken] = useState(false);
  const logout = () =>{
    removeValueData('email');
    removeValueData('password');
    navigation.navigate('HomeScreen')
  }
  
  useEffect(()=>{
      const unsubscribe = navigation.addListener('didFocus', () => {
        getStringData("bindToken").then((token)=>{
          if(token!=null){
          setIsThereBindToken(true);
        }
        else{
          setIsThereBindToken(false);
        }
        });
    });
  });
  return(
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Button mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
      My Account
    </Button>
    {!isThereBindToken?
    <Button mode="outlined" onPress={() => navigation.navigate('ScanQr')}>
      Start Shopping!
    </Button>:
    <Button mode="outlined" onPress={() => navigation.navigate('ShoppingCart')}>
      Continue Shopping!
    </Button>
    }
    <Button mode="outlined" onPress={logout}>
      Logout
    </Button>
  </Background>
  );
}
export default memo(Dashboard);
