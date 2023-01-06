import React, { useEffect, useRef, useState } from 'react';
import MyStack from './src/navigation/stack';
import AppHOC from './src/hoc';
import FlashMessage from 'react-native-flash-message';
import { Colors } from 'theme';
import { Animated, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
import { requestUserPermission, notificationListener } from './src/screens/notificationServices';
import UnavailContextProvider from 'contexts/UnavailContext';
import DocsContextProvider from 'contexts/DocsContext';
import AnimatedSplash from 'screens/animatedsplash';

// import "./src/screens/ignorewarnings";
console.disableYellowBox = true;
TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;
export default function App() {

  const [showComponent, setshowComponent] = useState(true)


  useEffect(() => {
    requestUserPermission();
    notificationListener();

    setTimeout(() => {
      setshowComponent(!showComponent)
    }, 5000);
  }, []);

  return (
    <>
      {showComponent ? <AnimatedSplash /> :
        <DocsContextProvider>
          <UnavailContextProvider>
            <AppHOC>
              <MyStack />
              <FlashMessage position={'bottom'} backgroundColor={Colors.primary} />
            </AppHOC>
          </UnavailContextProvider>
        </DocsContextProvider>
      }
    </>
  );
}

const styles = StyleSheet.create({
  logoText: {
    fontSize: 35,
    marginTop: 20,
    color: 'white',
    fontWeight: '700',
  },
  logoContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    top: '0%',
    alignItems: 'center',
  },
})
