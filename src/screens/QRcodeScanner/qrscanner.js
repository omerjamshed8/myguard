import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import { useState } from 'react';
import axios from 'axios';

export default function QRScanner({empid}) {
  // const {props}=route.params;
  console.log(empid)
  var hours = new Date().getHours(); //To get the Current Hours
  var min = new Date().getMinutes(); //To get the Current Minutes
  var sec = new Date().getSeconds(); //To get the Current Seconds
  const [time,setTime]=useState()
  // console.log(time)

  onSuccess = e => {
    Linking.openURL(e.data).catch(err =>
      console.error('An error occured', err)
    );
    setTime(hours + ":" + min + ":" + sec)
    // console.log(time)
    axios.post(
      `https://securitylinksapi.herokuapp.com/api/v1/employee/${empid}/scan-attendance/create`,
      {
        scannedTime: new Date().toISOString(),
      }
    ).then(res => {
      console.log('successfully scanned and marked attendance')
      console.log(res)
    }).catch(e => {
      console.log('error while sending request')
      console.log(e.response.data)
    })

  };

  return (
    <QRCodeScanner
      onRead={this.onSuccess}
      // flashMode={RNCamera.Constants.FlashMode.torch}
      topContent={
        <Text style={styles.centerText}>
          Place your camera infront of QR code.
        </Text>
      }
      // bottomContent={
      //   <TouchableOpacity style={styles.buttonTouchable} onPress={()=>{navigation.navigate('Home')}}>
      //     <Text style={styles.buttonText}>Close</Text>
      //   </TouchableOpacity>
      // }
    />
  );
}

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
});