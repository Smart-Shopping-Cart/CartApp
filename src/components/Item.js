import React, {memo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

const Item = ({children}) => (
  <View style={styles.item}>
    <Text>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default memo(Item);
