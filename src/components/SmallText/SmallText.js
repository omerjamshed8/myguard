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

const  SmallText= ({text,marginTop,marginBottom,color,
   alignSelf,marginRight,marginLeft,textAlign,ellipsizeMode,numberOfLines}) => {

  const styles=StyleSheet.create({
    
    smallText: {
      textAlign:textAlign?textAlign:'auto',
      alignSelf:alignSelf?alignSelf: "center",
      marginTop: marginTop ? marginTop : hp(0), 
      marginBottom:  marginBottom ? marginBottom :hp(0),
      fontSize: wp(3.7),
      color: color ?  color : colors.subHeading,
      fontFamily:fonts.regular,
      marginRight:marginRight?marginRight:0,
      marginLeft:marginLeft?marginLeft:0,
    },
  })
  
  return (
        <Text style={styles.smallText} ellipsizeMode={ellipsizeMode} numberOfLines={numberOfLines}>{text}</Text>
  );
};
export default SmallText;


