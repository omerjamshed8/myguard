import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, StyleSheet, Text, TextInput, View } from 'react-native';
export default function AnimatedSplash() {

  const moveAnim=useRef(new Animated.Value(0)).current;
  const fadeAnim=useRef(new Animated.Value(0)).current;


  useEffect(() => {
      Animated.sequence([
        Animated.timing(moveAnim,{
          duration:2000,
          toValue:Dimensions.get('window').width/1.6,
          delay:0,
          useNativeDriver:false,
        }),
        Animated.timing(moveAnim,{
          duration:2000,
          toValue:0,
          delay:0,
          useNativeDriver:false,
        })
      ]).start();
      Animated.timing(fadeAnim,{
        duration:2000,
        toValue:1,
        delay:2000,
        useNativeDriver:false
      }).start()
    }, [moveAnim,fadeAnim]);

  return (
        <View style={styles.contentContainer}>
       <Animated.View style={[styles.logoContainer,{marginLeft:moveAnim}]}>
          <Text style={styles.logoText}>Security</Text>
          <Animated.Text style={[styles.logoText,{opacity:fadeAnim}]}>Links</Animated.Text>
        </Animated.View>
        </View>
  );
}

const styles=StyleSheet.create({
  logoText: {
    fontSize: 35,
    marginTop: 20,
    color: '#2A2D43',
    fontWeight: '700',
  },
  logoContainer: {
    flexDirection: 'row',
  },
  contentContainer: {
    flex:1,
    justifyContent:"center",
    alignItems: 'center',
    backgroundColor:"white"
  },
})
