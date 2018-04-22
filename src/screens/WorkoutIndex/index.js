import React from 'react'
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native'
import WorkoutCreate from '../WorkoutScreens/WorkoutCreate'
import WorkoutEdit from '../WorkoutScreens/WorkoutEdit'
import WorkoutTable from '../WorkoutScreens/WorkoutTable'

export default class Workout extends React.Component {

    constructor(props) {
        super(props) 
        this.state = {
            activeTab: 1,
            workoutToUpdate: {},
            workouts: []

        }
    }

    componentWillMount = () => {
        this.fetchWorkouts()
        this.fetchUserImage()
    }

    fetchWorkouts = () => {
        fetch("https://exertrackserver.herokuapp.com/api/log", {
            method: 'GET',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => res.json())
        .then((logData) => {
            return this.setState({ workouts: logData })
        })
    }

    fetchUserImage = () => {
        fetch("https://exertrackserver.herokuapp.com/api/user/image", {
        method: 'GET',
        headers: new Headers({
            'Content-Type': 'application/json',
            'Authorization': this.props.token
        })
        })
        .then((res) => res.json())
        .then((image) => {
            this.setState({ profileImage: image[image.length -1].imagelink, manageUser: false })
        })
    }

    deleteImages = () => {
        fetch("https://exertrackserver.herokuapp.com/api/user", {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => console.log(res))
        .catch(err => console.log(err))
    }

    workoutDelete = (id) => {
        console.log('deleting')
        fetch("https://exertrackserver.herokuapp.com/api/log", {
            method: 'DELETE',
            body: JSON.stringify({ log: { id: id } }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
            .then((res) => this.fetchWorkouts())
    }

    workoutUpdate = (workout) => {
        fetch("https://exertrackserver.herokuapp.com/api/log", {
            method: 'PUT',
            body: JSON.stringify({log: workout}),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        })
        .then((res) => {
            this.fetchWorkouts();
        })
    }

    setWorkoutToUpdate = (workout) => {
        this.setState({
            workoutToUpdate: workout})
    }

    updateActiveTab = (newTab) => {
        this.setState({activeTab: newTab || 1})
    }

    activeTab = () => {
        switch(this.state.activeTab) {
            case 1:
            return (
                <WorkoutCreate deleteImg={this.deleteImages} profileImg={this.state.profileImage} updateWorkouts={this.fetchWorkouts} token={this.props.token} />
            )
            case 2:
            return (
                <WorkoutEdit workout={this.state.workoutToUpdate} removeWorkoutToUpdate={this.setWorkoutToUpdate} update={this.workoutUpdate} token={this.props.token} />
            )
            case 3:
            return (
                <WorkoutTable goToEdit={this.updateActiveTab} workouts={this.state.workouts} token={this.props.token} delete={this.workoutDelete} update={this.setWorkoutToUpdate} />
            )
        }
    }

    renderTabs = () => {
        let buttons = []
        for (let i = 1; i <= 3; i++) {
            buttons.push(<TouchableHighlight key={i} onPress={() => this.setState({activeTab: i})} style={[styles.tabButton, this.state.activeTab == i && styles.selected]}><Text>{i}</Text></TouchableHighlight>)
        }
        return buttons
    }

    render = () => {
        return (
            <View style={styles.container}>
                <View style={styles.content}>
                    {this.activeTab()}
                </View>
                <View style={styles.footer}>
                    {this.renderTabs()}
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
        flex: 8,
    },
    footer: {
        flex: 1,
        flexDirection: 'row'
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    selected: {
        backgroundColor: 'green'
    }
  });