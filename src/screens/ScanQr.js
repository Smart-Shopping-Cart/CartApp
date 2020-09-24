import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native'
import Background from '../components/Background';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { getStringData, storeStringData } from '../core/utils';

export default class ScanQr extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qr: ""
    }
  }

  data = async () => {
    d = await getStringData("token")
    console.log(d)
  }

  onRead = async (e) => {
    await storeStringData("cameraIP", e.data)

    this.props.navigation.navigate('JsonTest')
  }

  render() {

    return (
      <Background>
        <View>
          <Text style={styles.Text}>Scan Shopping cart QR code</Text>
        </View>
        <View >
          <QRCodeScanner style={styles.container}
            onRead={this.onRead}
            flashMode={RNCamera.Constants.FlashMode.torch}
          />
        </View>
      </Background>
    )
  }
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
