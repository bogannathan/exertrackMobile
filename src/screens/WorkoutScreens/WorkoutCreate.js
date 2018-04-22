import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image, Dimensions, Platform } from 'react-native';
import styles from './styles'
import t from 'tcomb-form-native';
// https://github.com/gcanti/tcomb-form-native

const Form = t.form.Form;

const Type = t.enums({
    Length: 'Length',
    Time: 'Time',
    Distance: 'Distance'
})

const Workout = t.struct({
  result: t.String,
  def: Type,
  desc: t.String
})

const IS_ANDROID = Platform.OS === 'android'
const { height, width } = Dimensions.get('window')

export default class WorkoutCreate extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: {
                result: '',
                desc: '',
                def: ''
            },
        };
        this.DEVICE_HEIGHT = IS_ANDROID ? height - 24 : height
        this.DEVICE_WIDTH = width
    }

    updateForm = (value) => {
        this.setState({value});
    }

    addWorkout = () => {
        let today = new Date();
        let dd = today.getDate();
        let mm = today.getMonth()+1; //January is 0!
        
        let yyyy = today.getFullYear();
        if(dd<10){
            dd='0'+dd;
        } 
        if(mm<10){
            mm='0'+mm;
        }
        let date = yyyy + '/' + mm + '/' + dd
        let log = this.state.value
        log.date = date
        fetch(`https://exertrackserver.herokuapp.com/api/log`, {
            method: 'POST',
            body: JSON.stringify({ log: log }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => res.json())
        .then((logData) => {
            this.props.updateWorkouts()
            this.setState({
                value: {
                    result: '',
                    desc: '',
                    def: ''
                }
            })
        })
    }

    render = () => {
        return (
            <View style={{flex: 1}}>
                <Form type={Workout} value={this.state.value} onChange={this.updateForm}/>
                <TouchableHighlight 
                    style={{backgroundColor: 'orange'}}
                    onPress = {() => this.addWorkout()}>
                    <Text style={styles.btnText}>Add Workout</Text>
                </TouchableHighlight>
                <TouchableHighlight 
                    style={{backgroundColor: 'orange'}}
                    onPress = {() => this.props.deleteImg()}>
                    <Text style={styles.btnText}>print state</Text>
                </TouchableHighlight>
                {this.props.profileImg && 
                    <View style={{flex: 3}}>
                        <Image source={{uri: this.props.profileImg}} resizeMode= {'contain'} style={{ flex: 1, alignSelf: 'center', width: this.DEVICE_WIDTH, height: this.DEVICE_HEIGHT }} />
                    </View>
                }
            </View>
        )
    }
}