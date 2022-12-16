import { ThemeProvider } from '@react-navigation/native';
import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import colors from '../../assets/colors/colors';
import fonts from '../../assets/fonts/fonts'
// import styles from './style';

const SmallTitle = ({title,marginTop,marginBottom,color,marginVertical,alignSelf,marginRight,marginLeft}) => {

  const styles=StyleSheet.create({
    
    title: {
      alignSelf:alignSelf?alignSelf: "center",
      marginTop: marginTop ? marginTop : 0, 
      marginBottom:  marginBottom ? marginBottom :0,
      marginVertical:marginVertical? marginVertical : 0, 
      marginLeft:marginLeft? marginLeft : 0, 
      marginRight:marginRight? marginRight : 0, 
      fontSize: wp(3.5),
      color: color ?  color : colors.black,
      fontFamily: fonts.medium,
    },
  })
  
  return (
        <Text style={styles.title}>{title}</Text>
  );
};
export default SmallTitle;


