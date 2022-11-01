import React from 'react';
import MyStack from './src/navigation/stack';
import AppHOC from './src/hoc';
import FlashMessage from 'react-native-flash-message';
import {Colors} from 'theme';
import {Text, TextInput} from 'react-native';

console.disableYellowBox = true;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
export default function App() {
  return (
    <AppHOC>
      <MyStack />
      <FlashMessage position={'bottom'} backgroundColor={Colors.primary} />
    </AppHOC>
  );
}
