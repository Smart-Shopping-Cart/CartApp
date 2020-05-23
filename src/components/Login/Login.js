import React, {Component} from 'react';
import {StyleSheet, View, Image, Text} from 'react-native';
import LoginForm from './LoginForm'

export default class Login extends Component{
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image 
                    style={styles.logo}
                    source={require('..//..//..//resources//cart.jpeg')}
                    />
                    <Text style={styles.title}> Smart Cart </Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3498db'
    },
    logoContainer: {
        alignItems:'center',
        flexGrow: 1,
        justifyContent:'center'
    }, 
    formContainer: {

    },
    logo: {
        width: 100,
        height:100
    },
    title: {
      color: '#FFF',
      marginTop: 10,
      width: 100,
      textAlign:'center',
    }
});