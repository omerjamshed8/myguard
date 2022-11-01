import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {Colors, Fonts} from 'theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from 'theme/colors';

const CustomInput = ({title, inputType, containerStyle, ...props}) => {
  const [secureTextEntry, setSecureEntry] = useState(true);

  return (
    <View style={[styles.mainContainer, containerStyle]}>
      {title && <Text style={styles.title}>{title}</Text>}
      {inputType === 'phone' ? (
        <View style={styles.phoneContainer}>
          <Text style={styles.countyCodeText}>+92</Text>
          <View style={styles.countyCodeView} />
          <TextInput
            style={[styles.phoneInput]}
            placeholderTextColor={Colors.placeholder}
            selectionColor={Colors.primary}
            autoCapitalize={'none'}
            {...props}
          />
        </View>
      ) : (
        <TextInput
          style={[styles.input, inputType === 'password' && {paddingRight: 40}]}
          placeholderTextColor={Colors.placeholder}
          selectionColor={Colors.primary}
          secureTextEntry={inputType === 'password' ? secureTextEntry : false}
          autoCapitalize={'none'}
          {...props}
        />
      )}

      {inputType === 'password' ? (
        <TouchableOpacity
          onPress={() => setSecureEntry(prevState => !prevState)}
          style={styles.eyeIconWrapper}>
          <Ionicons name="eye" size={20} color="grey" />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  mainContainer: {
    width: '100%',
    marginVertical: 10,
  },
  title: {
    fontSize: 15,
    color: colors.inputTitle,
    marginLeft: 15,
    fontFamily: Fonts.Poppins.SemiBold,
  },
  input: {
    marginTop: 5,
    borderColor: Colors.twoATwoD,
    borderWidth: 2,
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 16,
    width: '100%',
    color: Colors.twoATwoD,
    fontFamily: Fonts.Poppins.Regular,
    fontSize: 14,
  },
  eyeIconWrapper: {
    position: 'absolute',
    top: '57%',
    right: 10,
  },
  phoneContainer: {
    borderColor: Colors.twoATwoD,
    borderWidth: 2,
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 16,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  countyCodeText: {
    color: Colors.twoATwoD,
    fontFamily: Fonts.Poppins.Regular,
    fontSize: 14,
  },
  countyCodeView: {
    width: 1,
    height: '90%',
    marginHorizontal: 10,
    backgroundColor: Colors.twoATwoD,
  },
  phoneInput: {
    color: Colors.twoATwoD,
    fontFamily: Fonts.Poppins.Regular,
    fontSize: 14,
    flex: 1,
    padding: 0,
    height: 40,
  },
});
