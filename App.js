import React,{useEffect} from 'react';
import MyStack from './src/navigation/stack';
import AppHOC from './src/hoc';
import FlashMessage from 'react-native-flash-message';
import {Colors} from 'theme';
import {Text, TextInput} from 'react-native';
import {requestUserPermission,notificationListener} from './src/screens/notificationServices';
// import "./src/screens/ignorewarnings";
console.disableYellowBox = true;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
export default function App() {
  useEffect(()=>{
    requestUserPermission();
    notificationListener();
},[]);
  return (
    <AppHOC>
      <MyStack />
      <FlashMessage position={'bottom'} backgroundColor={Colors.primary}/>
    </AppHOC>
  );
}
