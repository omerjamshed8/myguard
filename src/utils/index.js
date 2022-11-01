import {Platform, Alert} from 'react-native';
import {PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export const generateRandomNumber = () =>
  Math.floor(1000 + Math.random() * 9000);

export const requestCameraPermission = () => {
  return new Promise((resolve, reject) => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    ).then(response => {
      if (response === RESULTS.GRANTED) {
        resolve(true);
      } else if (response === RESULTS.DENIED || response === RESULTS.BLOCKED) {
        Alert.alert(
          `You're not sharing permission for camera`,
          'If you change your mind, you can share your permission from device settings.',
          {
            cancelable: true,
          },
        );
        reject();
      } else if (response === RESULTS.UNAVAILABLE) {
        reject();
        Alert.alert(
          'Error',
          'We cannot find any hardware to open camera on your device.',
        );
      } else {
        reject();
        Alert.alert(
          'Error',
          'We cannot find any hardware to open camera on your device.',
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
        );
      }
    });
  });
};

export const requestAlbumPermission = () => {
  return new Promise((resolve, reject) => {
    request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.PHOTO_LIBRARY
        : PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
    ).then(response => {
      if (response === RESULTS.GRANTED) {
        resolve(true);
      } else if (response === RESULTS.DENIED || response === RESULTS.BLOCKED) {
        Alert.alert(
          `You're not sharing permission for photo library`,
          'If you change your mind, you can share your permission from device settings.',
          {
            cancelable: true,
          },
        );
        reject();
      } else if (response === RESULTS.UNAVAILABLE) {
        reject();
        Alert.alert(
          'Error',
          'We cannot find any hardware to open photo library on your device.',
        );
      } else {
        reject();
        Alert.alert(
          'Error',
          'We cannot find any hardware to open photo library on your device.',
          [
            {
              text: 'Cancel',
              onPress: () => {},
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
        );
      }
    });
  });
};
