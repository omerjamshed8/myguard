import {ThemeProvider} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts';
// import styles from './style';

const SemiTitle = ({title, fontSize, marginTop, marginBottom, color, alignSelf, paddingHorizontal}) => {
  const styles = StyleSheet.create({
    title: {
      alignSelf: alignSelf ? alignSelf : 'flex-start',
      marginTop: marginTop ? marginTop : 0,
      marginBottom: marginBottom ? marginBottom : 0,
      fontSize: fontSize ? fontSize:  wp(5.6),
      color: color ? color : colors.headingBlack,
      fontFamily: fonts.bold,
      paddingHorizontal: paddingHorizontal ? paddingHorizontal : 0,
    },
  });

  return <Text style={styles.title}>{title}</Text>;
};

export default SemiTitle;
