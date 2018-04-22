import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableNativeFeedback } from 'react-native';
import Auth from './src/screens/Auth';
import NavBar from './src/components/NavBar';
import WorkoutIndex from './src/screens/WorkoutIndex';
import Settings from './src/screens/Settings';

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        sessionToken: '',
        manageUser: false,
    }
  }
  
  setSessionState = (token) => {
    Expo.SecureStore.setItemAsync('token', token);
    this.setState({ sessionToken: token });
  }
  
  componentWillMount = () => {
    Expo.SecureStore.getItemAsync('token')
    .then((sessionToken) => {
      console.log('getting here')
      this.setState({ sessionToken })      
    })  
  }

  logout = () => {
    this.setState({ sessionToken: '' })
    Expo.SecureStore.deleteItemAsync('token')
  }

  manageUserProfile = () => {
    this.setState({manageUser: true})
  }

  changeToWorkouts = () => {
    this.setState({manageUser: false})
  }

  updateImage = (image) => {
    this.setState({ imageUpdated: true })
  }

  protectedViews = () => {
    if (this.state.manageUser) {
      return (
        // <Settings openWorkouts={this.setState({manageUser: false})} token={this.state.sessionToken} />
        <Settings addImage={this.updateImage} token={this.state.sessionToken} />
      )
    }

    if (this.state.sessionToken == null || this.state.sessionToken == '') {      
      return (
        <Auth setToken={this.setSessionState} />
      )
    } else {
      return (
        <WorkoutIndex profileImg={this.state.profileImage} imageUpdated={this.state.imageUpdated} token={this.state.sessionToken}/>
      )
    }
  }
  
  render = () => {
    return (
      <View style={styles.container}>
        <NavBar token={this.state.sessionToken} goToWorkouts={this.changeToWorkouts} clickLogout={this.logout} goToUser={this.manageUserProfile}/>
        {this.protectedViews()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
