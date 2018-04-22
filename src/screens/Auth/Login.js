import React from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import styles from './styles';

export default class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    login = () => {
        fetch("https://exertrackserver.herokuapp.com/api/login", {
          method: 'POST',
          body: JSON.stringify({user:this.state}),
          headers: new Headers({
              'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.setToken(data.sessionToken)
        }) 
    }

    render = () => {
        return (
            <View>
                <TextInput onChangeText = {(text) => this.setState({username: text})} style={styles.textInput} placeholder='username' />
                <TextInput onChangeText = {(text) => this.setState({password: text})} style={styles.textInput} placeholder='password' secureTextEntry />
                <TouchableHighlight 
                    style={{backgroundColor: 'orange'}}
                    onPress = {() => this.login()}>
                    <Text style={styles.btnText}>Login</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    style={{backgroundColor: 'purple'}}
                    onPress = {() => this.props.loginActive(false)}>
                    <Text style={styles.btnText}>Go to signup</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

