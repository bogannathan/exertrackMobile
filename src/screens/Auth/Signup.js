import React from 'react';
import { Text, View, TextInput, TouchableHighlight } from 'react-native';
import styles from './styles';

export default class Signup extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            password: ''
        }
    }

    signup = () => {
        fetch("https://exertrackserver.herokuapp.com/api/user", {
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
                    style={{backgroundColor: 'grey'}} 
                    onPress = {() => this.signup()}>
                    <Text
                    style={styles.btnText}
                    >Signup</Text>
                </TouchableHighlight>
                <TouchableHighlight
                    style={{backgroundColor: 'blue'}} 
                    onPress = {() => this.props.loginActive(true)}>
                    <Text
                    style={styles.btnText}
                    >Go To Login</Text>
                </TouchableHighlight>
            </View>
        )
    }
}

