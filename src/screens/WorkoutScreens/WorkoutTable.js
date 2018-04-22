import React from 'react';
import { View, Text, StyleSheet, TouchableHighlight, ScrollView } from 'react-native';
import styles from './styles'

export default class WorkoutTable extends React.Component {
    
    constructor(props) {
        super(props)
        this.state={
            activeWorkout: Number
        }
        
    }

    setActiveWorkout = (id) => {
        id === this.state.activeWorkout ? this.setState({activeWorkout: Number}) : this.setState({activeWorkout: id})
    }
    
    render = () => {
        return (
            <View style={{flex: 1}}>
                <View style={{flex: 1}}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <Text style={styles.pound}>#</Text>
                        <Text style={styles.result}>Result</Text>
                        <Text style={styles.definition}>Definition</Text>
                        <Text style={styles.description}>Description</Text>
                    </View>
                </View>
                <View style={{flex: 8}}>
                    <ScrollView>
                        {
                            this.props.workouts.map((workout, index) => (
                                <TouchableHighlight 
                                    key={workout.id}
                                    onPress={() => {this.setActiveWorkout(workout.id)}
                                    }>
                                    <View  style={[{ flex: 1, flexDirection: 'row' }, index % 2 == 0 && {backgroundColor: 'grey'}]}>
                                        <Text style={styles.pound} >{workout.id}</Text>
                                        <View style={{flex: 8}}>
                                            <View style={{flex: 1, flexDirection: 'row'}}>
                                                <Text style={styles.result}>{workout.result}</Text>
                                                <Text style={styles.definition}>{workout.def}</Text>
                                                <Text style={styles.description}>{workout.description}</Text>
                                            </View>
                                            {this.state.activeWorkout == workout.id && 
                                                <View style={{flex: 1, flexDirection: 'row'}}>
                                                    <TouchableHighlight 
                                                        style={{backgroundColor: 'orange', flex: 1}}
                                                        onPress = {() => this.props.delete(workout.id)}>
                                                        <Text style={styles.btnText}>Delete</Text>
                                                    </TouchableHighlight>
                                                    <TouchableHighlight 
                                                        style={{backgroundColor: 'green', flex: 1}}
                                                        onPress = {() => {
                                                            this.props.update(workout)
                                                            this.props.goToEdit(2)
                                                            }
                                                        }>
                                                        <Text style={styles.btnText}>Update</Text>
                                                    </TouchableHighlight>
                                                </View>
                                            }
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            ))
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}