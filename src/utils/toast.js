import {showMessage} from 'react-native-flash-message';
import {Fonts} from 'theme';

export const showSuccess = message =>
  showMessage({
    message,
    type: 'success',
    titleStyle: {fontFamily: Fonts.Poppins.Medium},
  });

export const showError = message =>
  showMessage({
    message,
    type: 'danger',
    titleStyle: {fontFamily: Fonts.Poppins.Medium},
  });
