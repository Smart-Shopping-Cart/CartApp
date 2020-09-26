import React, {memo} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import {
  emailValidator,
  passwordValidator,
  getStringData,
  storeStringData,
} from '../core/utils';

const HomeScreen = ({navigation}) => {

  const checkIfNeedCredential = async ()=>{
    email = await getStringData("email")
    password = await getStringData("password")
    if(email!=null && password!=null){
      fetch('https://cart-handling.herokuapp.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'text/plain;charset=UTF-8',
        },
        body: JSON.stringify({
          name: email,
          password: password,
        }),
      }).then((response) => {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error('Something went wrong');
        }
      }).then((responseJson) => {
          console.log('login successfully');
          storeStringData('loginToken','Bearer ' + responseJson);
          navigation.navigate('Dashboard');
      }).catch((error) => {
          console.log('login failed');
          navigation.navigate('LoginScreen')
        });
    }
    else{
      navigation.navigate('LoginScreen')
    }
  }

    return(
    <Background>
      <Logo />
      <Header>The new shopping experience</Header>

      <Button mode="contained" onPress={checkIfNeedCredential}>
        Login
      </Button>
      <Button
        mode="outlined"
        onPress={() => navigation.navigate('RegisterScreen')}>
        Sign Up
      </Button>
      <Paragraph>©Eden, Aviram, Yonatan, Aviv | 2020</Paragraph>
    </Background>
  );
}

export default memo(HomeScreen);
