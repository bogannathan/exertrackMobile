import React from 'react'
import { Text, View, TouchableHighlight } from 'react-native'

export default class NavBar extends React.Component {
    
    render() {
        return (
            <View style={{paddingTop: Expo.Constants.statusBarHeight, backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-around'}}>
                {!!this.props.token &&
                //yoga node? explain not not
                    <TouchableHighlight onPress={() => this.props.goToUser()}><Text style={{textAlign: 'left', fontSize: 20}}>Settings</Text></TouchableHighlight>
                }    
                <TouchableHighlight 
                    onPress={() => this.props.goToWorkouts()}>
                    <Text style={{fontSize: 30, color: 'blue', textAlign: 'center'}}>
                        #exertrack
                    </Text>
                </TouchableHighlight>
                {!!this.props.token && 
                    <TouchableHighlight onPress={() => this.props.clickLogout()}>
                        <Text style={{fontSize: 20, textAlign: 'right'}}>Log out</Text>
                    </TouchableHighlight>
                }
            </View>
        )
    }
}
