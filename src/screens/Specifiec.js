import React, { Component } from 'react';
import { ActivityIndicator, Text, View, StyleSheet, TouchableOpacity, FlatList } from 'react-native';

export default class ShoppingCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
    }
  }

  componentDidMount() {
    return fetch('https://cart-handling-test.herokuapp.com/products', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySWQiOiI1ZjY3NGUzNDNjMzA4ZTEwMDFkZWIzZDgiLCJjdXN0b21lcklkIjoiIiwiY3JlYXRlRGF0ZSI6IlN1biBTZXAgMjAgMTM6MjI6MjQgVVRDIDIwMjAiLCJzaG9wcGluZ0RhdGUiOiIifQ.CzNaen82Ppvcu8kq7oqs9JCe0xQpUFTdEQzg3_9yhEa-uw6DN9cPIa8usj_IwFS3h-0Id471g0I6TIW43BFrKQ'
      },
    })
      .then((response) => {
        console.log(response.status)
        return response.json()
      })
      .then((responseJson) => {
        console.log(responseJson)
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
      <View style={styles.container}>
        <FlatList
          data={this.state.dataSource}
          renderItem={
            ({ item }) => (
              <View style={{ flex: 1, paddingTop: 20 }}>
                <Text> {item.id}</Text>
                <Text> {item.name}</Text>
                <Text> {item.price}</Text>
            </View>

              )
            }
            keyExtractor={item => item.id}
          />
              </View>
            );
  }
}
const styles = StyleSheet.create({
          container: {
          flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  touchButton: {
          alignSelf: 'center',
    backgroundColor: '#2980b9',
    paddingVertical: 25,
    width: 295,
    margin: 15,
  },
  touchButtonText: {
          textAlign: 'center',
    color: '#ffffff',
    fontWeight: 'bold'
  },
})
