import React, {memo} from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';

const HomeScreen = ({navigation}) => (
  <Background>
    <Logo />
    <Header>The new shopping experience</Header>

    <Button mode="contained" onPress={() => navigation.navigate('LoginScreen')}>
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

export default memo(HomeScreen);
