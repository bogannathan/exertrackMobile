import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
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
  description: t.String
})

export default class WorkoutEdit extends React.Component {

    constructor(props) {
        super(props)
        this.state={
            value: {
                id: '',
                result: '',
                description: '',
                def: ''
            }
        }
    }

    componentWillMount = () => {
        this.setState({
            value: {
                id: this.props.workout.id,
                result: this.props.workout.result,
                description: this.props.workout.description,
                def: this.props.workout.def
            }
        })
    }

    updateForm = (value) => {
        this.setState({value});
    }

    clearValue = () => {
        this.setState({value: {id: '', result: '', description: '', def: ''}})
        this.props.removeWorkoutToUpdate({})
    }

    render = () => {
        return (
            <View style={{flex: 1}}>
                {Object.keys(this.props.workout).length ?
                    <View>
                        <Form type={Workout} value={this.state.value} onChange={this.updateForm}/>
                        <TouchableHighlight 
                            style={{backgroundColor: 'orange'}}
                            onPress = {() => {this.clearValue()}}
                            >
                            <Text style={styles.btnText}>Clear</Text>
                        </TouchableHighlight>
                        <TouchableHighlight 
                            style={{backgroundColor: 'green'}}
                            onPress = {() => {
                                this.props.update(this.state.value)
                                this.clearValue()}
                            }>
                            <Text style={styles.btnText}>Update</Text>
                        </TouchableHighlight>
                    </View>
                :
                    <Text>Please select a workout to edit on the tables tab</Text>
                }
            </View>
        )
    }
}