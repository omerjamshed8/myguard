import React from 'react';
import {Dimensions, SafeAreaView, StyleSheet} from 'react-native';
import { commonStyle } from 'theme';
import colors from 'theme/colors';

const Screen = ({children}) => {
  return <SafeAreaView style={styles.mainContainer}>{children}</SafeAreaView>;
};

export default Screen;
const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.white,
    ...commonStyle.screenPadding,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-20
  },
});
