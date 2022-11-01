import CustomButton from 'components/custom-button';
import React from 'react';
import {TouchableOpacity, StyleSheet, Text} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Colors, Fonts} from 'theme';
import colors from 'theme/colors';
import {requestAlbumPermission, requestCameraPermission} from 'utils';

const options = {
  mediaType: 'photo',
  quality: 0.2,
  includeBase64: true,
};

const PickerPopup = ({handleClose, handleResponse}) => {
  const openCamera = async () => {
    try {
      await requestCameraPermission();
      launchCamera(options, response => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          //   Image reponse---
          onResponse(response?.assets);
        }
        handleClose();
        // console.log('Response-----', response);
      });
    } catch (error) {
      handleClose();
      console.log('Error in open camera-----', error);
    }
  };

  const openGallery = async () => {
    try {
      await requestAlbumPermission();
      launchImageLibrary(options, response => {
        if (response.didCancel) {
          // console.log('User cancelled image picker');
        } else if (response.error) {
          // console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          // console.log('User tapped custom button: ', response.customButton);
        } else {
          onResponse(response?.assets);
          //   Image reponse---
        }
        handleClose();
        // console.log('Response-----', response);
      });
    } catch (error) {}
  };

  const onResponse = async (imageInfo = '') => {
    handleResponse(imageInfo);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={null} style={styles.boxStyle}>
      {/* Title */}
      <Text style={styles.headerTextStyle}>Select Image</Text>

      <TouchableOpacity onPress={openCamera} style={styles.buttonStyle}>
        <Text style={styles.textStyle}>Open Camera</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openGallery} style={styles.buttonStyle}>
        <Text style={styles.textStyle}>Select from gallery</Text>
      </TouchableOpacity>

      <CustomButton
        onButtonPress={handleClose}
        titleStyle={{color: colors.white}}
        buttonWrapper={styles.buttonWrapper}
        title={'Close'}
      />
    </TouchableOpacity>
  );
};

export default PickerPopup;

const styles = StyleSheet.create({
  boxStyle: {
    width: '100%',
    backgroundColor: Colors.secondry,
    borderRadius: 15,
    padding: 15,
  },
  buttonStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
  },
  headerTextStyle: {
    fontSize: 16,
    fontFamily: Fonts.Poppins.Bold,
    marginBottom: 10,
    color: Colors.black,
  },
  textStyle: {
    fontSize: 16,
    fontFamily: Fonts.Poppins.SemiBold,
    color: Colors.black,
    paddingLeft: 8,
  },
  closeText: {
    alignSelf: 'center',
    fontSize: 16,
    marginTop: 20,
    fontFamily: Fonts.Poppins.SemiBold,
    color: Colors.primary,
  },
  buttonWrapper: {
    height: 40,
    width: '100%',
    alignSelf: 'center',
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    borderRadius: 5,
    marginBottom: 0,
    marginTop: 20,
  },
});
