import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import { Text, Image, ScrollView } from 'react-native';


const PayMock = ({ navigation }) => (

  <Background>
    <Logo />
    <Header>This is a mock Page of Valuating Payment</Header>
    <Text>we tested this scene with stripe api but didnt manage to migrate it to the project in time </Text>
    <Text>https://github.com/tipsi/tipsi-stripe</Text>
    <ScrollView >
      <Image source={require('../assets/payment-approve.png')} />
    </ScrollView>
    <Button mode="outlined" onPress={() => navigation.navigate('Dashboard')}>
      return
    </Button>
  </Background>
);

export default memo(PayMock);
