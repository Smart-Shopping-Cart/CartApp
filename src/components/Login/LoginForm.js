import React, {Component} from 'react';
import {StyleSheet, View, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, StatusBar} from 'react-native';


export default class LoginForm extends Component{
    constructor(props) {
        super(props);
      
        this.state = {
          username: '',
          password: ''
        };
      }

      onPress = () => {
          console.log(this.state.username);
          console.log(this.state.password);
      };

    render() {
        return (
            <KeyboardAvoidingView behavior= "padding" style={styles.container}>
                <TextInput 
                placeholder = "username or email"
                placeholderTextColor = "rgba(255,255,255,0.7)"
                returnKeyType="next"
                onSubmitEditing = {() => this.passwordInput.focus()}  
                keyboardType = "email-address"
                autoCapitalize = "none"
                autoCorrect = {false}
                style={styles.input}
                value={this.state.username}
                onChangeText={(username) => this.setState({username})}
                />
                <TextInput 
                placeholder = "password"
                placeholderTextColor = "rgba(255,255,255,0.7)"
                returnKeyType="go"
                autoCapitalize = "none"
                autoCorrect = {false}
                secureTextEntry 
                style={styles.input}
                ref = {(input) => this.passwordInput = input}
                value={this.state.password}
                onChangeText={(password) => this.setState({password})}
                />

                <TouchableOpacity 
                style={styles.buttonContainer}
                onPress = {this.onPress}>
                    <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: 10,
        color: '#FFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#29B0b9',
        paddingVertical: 15,
        paddingHorizontal :15,
        marginBottom:10
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
});