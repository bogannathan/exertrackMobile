import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet, Dimensions, Platform } from 'react-native';
import { ImagePicker } from 'expo';

import Canvas, {Image as CanvasImage, Path2D} from 'react-native-canvas';

const IS_ANDROID = Platform.OS === 'android'
const { height, width } = Dimensions.get('window')




export default class ManageUser extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            image: '',

        }
        this.DEVICE_HEIGHT = IS_ANDROID ? height - 24 : height
        this.DEVICE_WIDTH = width
    }

    takePhoto = async () => {
        let pickerResult = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
          });
          
          if (!pickerResult.cancelled) {
              this.setState({ image: pickerResult.uri })
          }
    }

    pickPhoto = async () => {
        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
          });
          if (!pickerResult.cancelled) {
              this.setState({ image: pickerResult.uri })
          }
    }

    renderButtons = () => {
        let { image } = this.state

        return (
            <View > 
            {image   ?  
                <View>
                    <TouchableHighlight 
                        style = {styles.deletePhotoBtn}
                        onPress = {() => this.setState({ image: ''})}>
                        <Text style = {styles.btnText}>Delete Photo</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style = {styles.takePhotoBtn}
                        onPress = {() => this.uploadButtonPressed()}>
                        <Text style = {styles.btnText}>Upload Photo</Text>
                    </TouchableHighlight>
                </View>
                :
                <View >
                    <TouchableHighlight 
                        style = {styles.takePhotoBtn}
                        onPress = {() => this.takePhoto()}>
                        <Text style = {styles.btnText}>Take Photo</Text>
                    </TouchableHighlight>
                    <TouchableHighlight 
                        style = {styles.pickPhotoBtn}
                        onPress = {() => this.pickPhoto()}>
                        <Text style = {styles.btnText}>Select Photo</Text>
                    </TouchableHighlight>
                </View>
            }
            </View>
        )
    }

    uploadButtonPressed = async () => {
        let uploadResponse, uploadResult;
        let uid = this.uid
        try {
    
            uploadResponse = await this.uploadPhoto(this.state.image);
            uploadResult = await uploadResponse.json();
            let imageUrl = JSON.stringify(uploadResult.location)
            imageUrl = imageUrl.replace(/"/g, '')
            if (imageUrl) {
                this.props.addImage(imageUrl)
                this.addToDatabase(imageUrl)
            }
            
        } catch (e) {
          console.log({ uploadResponse });
          console.log({ uploadResult });
          console.log({ e });
          alert('Upload failed, please try again.');
      };
    }

    addToDatabase = (imageUrl) => {
        fetch('https://exertrackserver.herokuapp.com/api/user/upload-image', {
            method: 'PUT',
            body: JSON.stringify({ imagelink: imageUrl }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => res.json())
        .then((data) => {
            this.props.addImage()
        })
        .catch((err) => console.log('err', err))
    }

    uploadPhoto = async(uri) => {
        let apiUrl = 'https://file-upload-example-backend-wvyldflqth.now.sh/upload';
    
        let uriParts = uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
    
        let formData = new FormData();
        formData.append('photo', {
        uri,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
        });
    
        let options = {
        method: 'POST',
        body: formData,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        };
    
        return fetch(apiUrl, options);
    }


    render = () => {
        let { image } = this.state
        return (
            <View style={styles.container}>
                {!!image && 
                    <View style={{flex: 3}}>
                        <Image source={{uri: image}} resizeMode= {'contain'} style={{ flex: 1, alignSelf: 'center', width: this.DEVICE_WIDTH, height: this.DEVICE_HEIGHT }} />
                    </View>
                }
                <View style={{flex: 4}}>
                {this.renderButtons()}
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },
    btnText: {
        padding: 10,
        fontSize: 20,
        textAlign: 'center'
    },
    deletePhotoBtn: {
        backgroundColor: 'red'
    },
    takePhotoBtn: {
        backgroundColor: 'red'
    },
    pickPhotoBtn: {
        backgroundColor: 'yellow'
    },
  });