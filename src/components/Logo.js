import React, { memo } from 'react';
import { Image, StyleSheet } from 'react-native';

const Logo = () => (
  <Image source={require('../assets/smartCartLogo.png')} style={styles.image} />
);

const styles = StyleSheet.create({
  image: {
    width: 512,
    height: 128,
    marginBottom: 12,
    resizeMode: 'center',
  },
});

export default memo(Logo);
