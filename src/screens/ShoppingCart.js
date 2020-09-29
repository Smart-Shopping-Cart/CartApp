import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, FlatList, StatusBar, Image,Alert,BackHandler } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Header from '../components/Header';
import { getStringData,removeValueData } from '../core/utils';



const Item = ({ product }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{product.id}</Text>
    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.title}>{product.price}</Text>
  </View>
);

const mayo = '../assets/mayu-removebg-preview.png'
const maple = "../assets/maple-removebg-preview.png"




export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      loginToken: "",
      bindToken: "",
    }

    this.setToken()
  }

  setToken = async () => {
    loginingToken = await getStringData("loginToken")
    bindingToken = await getStringData("bindToken")
    this.setState({
      loginToken: loginingToken,
      bindToken: bindingToken
    })
  }

  callServer = async () => {
    console.log(await getStringData('bindToken'))
    fetch('https://cart-handling-test.herokuapp.com/getShoppingCart', {
      method: 'POST',
      headers: {
        'Authorization': await getStringData('bindToken'),
        'Accept': 'application/json'
      },
    }).then(async(response) => {
      if (response.ok) {
        return response.text();
      } else if(response.status=="500"){
        removeValueData('bindToken');
        Alert.alert(
          "takes too long :\!",
          "shopping session has expired",
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
          },
          { text: "OK", onPress: () => console.log("OK Pressed") }
        ],
        { cancelable: false });
        clearInterval(this.myInterval);
        this.props.navigation.navigate('Dashboard')
      }
      else{
        clearInterval(this.myInterval);
        throw new Error('Something went wrong fetching cart');
      }
    }).then((responseJson) => {
      this.setState({
        dataSource: responseJson,
        isLoading: false
        });
    }).catch((error) => {
        console.log(error);
        this.props.navigation.navigate('Dashboard')
      });
  }

  componentDidMount() {
    this.myInterval = setInterval(() => {
      console.log('getting shopping cart products')
      return this.callServer()
    }
      , 2000)
      this.backHandler = BackHandler.addEventListener(
        "hardwareBackPress",()=>{
          this.props.navigation.navigate('Dashboard')
        }
      );
  }



  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 20 }}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Background>
        <Logo />
        <Header>Shopping Cart</Header>
        <FlatList style={styles.container}
          data={JSON.parse(this.state.dataSource).products}
          renderItem={
            ({ item }) => (
              <View style={styles.item}>
                <Image source={item.name == "MapleSyrup" ? require(maple) :
                  require(mayo)} />
                <Text style={styles.title}>{item.name}</Text>
                <Text style={styles.title}>{item.price} NIS</Text>
              </View>
            )
          }
          keyExtractor={item => item.name}
        />
        <Text style={styles.title}>Total Price: {JSON.parse(this.state.dataSource).totalPrice} </Text>  
        <Button
          mode="outlined"
          onPress={() =>{ removeValueData('bindToken');
            this.props.navigation.navigate('Checkout')}}>
          CheckOut
         </Button>
      </Background>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginBottom: Button.currentHeight || 0,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
});