import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, FlatList, StatusBar, Image } from 'react-native';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Button from '../components/Button';
import Header from '../components/Header';


const Item = ({ product }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{product.id}</Text>
    <Text style={styles.title}>{product.name}</Text>
    <Text style={styles.title}>{product.price}</Text>
  </View>
);

const mayo = '../assets/mayu.jpg'
const maple = "../assets/maple.jpg"
const bamba = '../assets/rsz_bag_of_bamba.jpg'
const render = "../assets/maple.jpg"

export default class JsonTest extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      loginToken: "",
      bindToken: "",

    }

    setToken()
  }

  setToken = async () => {
    loginToken = await getStringData("loginToken")
    bindToken = await getStringData("bindToken")

    this.setState({
      loginToken: loginToken,
      bindToken: bindToken
    })
  }

  
  renderItem = item => (
    <Item product={item} />
  );

  componentDidMount() {
    return fetch('https://cart-handling-test.herokuapp.com/products', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + await getStringData("loginToken"),  
      },
    })
      .then((response) => {
        console.log(response.status)
        return response.json()
      })
      .then((responseJson) => {
        // console.log(responseJson)
        var count = Object.keys(responseJson).length
        console.log(count)
        this.setState({
          dataSource: responseJson
          , isLoading: false
        });
      })
      .catch((error) => {
        console.error(error);
      });
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
          data={this.state.dataSource}
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

        <Button
          mode="outlined"
          onPress={() => this.props.navigation.navigate('HomeScreen')}>
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