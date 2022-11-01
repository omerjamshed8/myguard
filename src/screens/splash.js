import React, {useEffect} from 'react';
import {Text, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {Fonts} from 'theme';

function Splash({navigation}) {
  const {accessToken} = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      accessToken
        ? navigation.replace('AppNav')
        : navigation.replace('AuthNav');
    }, 200);
  }, []);

  return (
    <SafeAreaView style={styles.splashView}>
      <Text style={styles.splashText}>SecurityLinks</Text>
    </SafeAreaView>
  );
}

export default Splash;

const styles = StyleSheet.create({
  splashView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 30,
    color: '#2A2D43',
    fontFamily: Fonts.Poppins.Bold,
  },
});
