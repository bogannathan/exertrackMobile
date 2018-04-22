import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import Login from './Login';
import Signup from './Signup';

export default class Auth extends React.Component {
    
    constructor(props) {
        super(props) 
        this.state = { 
            loginActive: true
        }
    }

    switchTab = (loginActive) => {
        this.setState({ loginActive })
    }

    render = () => {
        return (
            <View style={styles.viewFlex}>
                {this.state.loginActive  ?
                <View style={styles.viewFlex}>
                    <Login loginActive={this.switchTab} setToken={this.props.setToken}/>
                </View>
                :
                <View style={styles.viewFlex}>
                    <Signup loginActive={this.switchTab} setToken={this.props.setToken}/>
                </View>
                }
                <View style={{flex: 3}} />
            </View>
        )
    }
}