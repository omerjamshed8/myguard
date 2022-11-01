import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors, Fonts} from 'theme';

const ResetSuccess = ({onDone, title = ''}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        {title || 'You have successfully reset your password'}
      </Text>
      <TouchableOpacity onPress={onDone} style={styles.buttonWrapper}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ResetSuccess;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 20,
  },
  titleText: {
    marginVertical: '10%',
    color: Colors.black,
    fontSize: 20,
    fontFamily: Fonts.Poppins.Medium,
    textAlign: 'center',
    width: '80%',
    alignSelf: 'center',
  },
  buttonWrapper: {
    height: 50,
    backgroundColor: Colors.primary,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: Fonts.Poppins.Medium,
    color: Colors.white,
  },
});
