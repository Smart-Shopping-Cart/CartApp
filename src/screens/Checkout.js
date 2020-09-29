import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';

const CheckOut = ({ navigation }) => (
  
  <Background>
    <Logo />
    <Header>Checkout</Header>
    <Button mode="contained" onPress={() => navigation.navigate('CardDetailsMock')}>
      Enter your card details
    </Button><Button mode="outlined" onPress={() => navigation.navigate('PayMock')}>
      pay
    </Button>
  </Background>
);

export default memo(CheckOut);
