import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import { Text, Image, ScrollView } from 'react-native';


const CheckOut = ({ navigation }) => (

  <Background>
    <Logo />
    <Header>This is a mock Page of Entering payment method</Header>
    <Text>we tested this scene with stripe api but didnt manage to migrate it to the project in time</Text>
    <ScrollView >
      <Image source={require('../assets/tipsi-stripe-example.png')} />
    </ScrollView>
    <Button mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
      return
    </Button>
  </Background>
);



export default memo(CheckOut);
