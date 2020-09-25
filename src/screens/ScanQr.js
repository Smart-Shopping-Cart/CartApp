import React, {memo} from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  Alert
} from 'react-native'
import Background from '../components/Background';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { getStringData, storeStringData } from '../core/utils';

const ScanQr = ({navigation})=> {
  bindCartToCamera = async (cameraIp) => {
    console.log("in bind")
    fetch('http://10.0.0.4:8080/bind/' + cameraIp, {
      method: 'POST',
      headers: {
        Authorization:  await getStringData('loginToken')
      },
    }).then((response) => {
      if (response.ok) {
        return response.text();
      } else {
        throw new Error('Something went wrong');
      }
    }).then((responseJson) => {
        console.log('bind successfully');
        storeStringData('bindToken','Bearer ' + responseJson);
        navigation.navigate('ShoppingCart');
    }).catch((error) => {
        console.log('bind failed');
        Alert.alert(
          "OOps!",
          "cannot connect to shoppingCart",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false });
        navigation.navigate('Dashboard');
    });
  };

  const onRead = (e) => {
    url = e.data
    ip= url.slice(7)
    if(ip!=""){
      bindCartToCamera(ip)
    }
  }
  return (
    <Background>
      <View>
        <Text style={styles.Text}>Scan Shopping cart QR code</Text>
      </View>
      <View >
        <QRCodeScanner style={styles.container}
          onRead={onRead}
          flashMode={RNCamera.Constants.FlashMode.torch}
        />
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    width: '100%',
    maxWidth: 400,
    maxHeight: '50%',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

  Text: {
    fontSize: 28,
    color: 'rgb(0,0,0)',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },

});

export default memo(ScanQr);

