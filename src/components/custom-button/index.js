import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {color} from 'react-native-reanimated';
import {Colors, Fonts} from 'theme';
import colors from 'theme/colors';

const CustomButton = ({
  title,
  buttonWrapper,
  titleStyle,
  onButtonPress,
  disabled,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled || isLoading}
      style={[styles.buttonContainer, buttonWrapper]}
      onPress={onButtonPress}
    >
      {isLoading ? (
        <ActivityIndicator size={'small'} color={colors.white} />
      ) : (
        <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  buttonContainer: {
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: Colors.white,
    fontFamily: Fonts.Poppins.Medium,
  },
});
