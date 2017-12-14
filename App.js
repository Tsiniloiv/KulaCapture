/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  TouchableHighlight,
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Camera from 'react-native-camera'

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' +
    'Cmd+D or shake for dev menu',
  android: 'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu, \n' +
    'boats and/or hoes',
});

export default class App extends Component<{}> {
  constructor(props) {
    super(props);

    this.camera = null;

    this.state = {
      camera: {
        aspect: Camera.constants.Aspect.fill,
        captureTarget: Camera.constants.CaptureTarget.cameraRoll,
        type: Camera.constants.Type.back,
        orientation: Camera.constants.Orientation.landscape,
        flashMode: Camera.constants.FlashMode.auto,
      },
      isRecording: false
    }
  }

  initZoom() { //Experimental
    if(this.camera) {
      this.camera.setZoom(1.2);
      console.log("Zoom set to 1.2");
    }
  }

  componentDidMount() {
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.preview}
          aspect={Camera.constants.Aspect.fill}>
            <View style={[styles.overlaycontainer]}>
              <View></View>
              <View style={[styles.overlay, styles.guidebar]}></View>
              <View></View>
            </View>
          <Text style={[styles.overlay, styles.capture]} onPress={this.takePicture.bind(this)}>[CAPTURE]</Text>
          </Camera>
      </View>
    );
  }

  takePicture() {
    const options = {};
    //options.location = ...
    this.camera.capture({metadata: options})
      .then((data) => console.log(data))
      .catch(err => console.error(err));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  guidebar: {
    flex: 0,
    width: 1,
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  overlaycontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  preview: {
    height: '100%',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  overlay: {
    position: 'absolute',
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    alignSelf: 'flex-end',
    borderRadius: 5,
    color: '#000',
    padding: 5,
    margin: 0
  }
});
