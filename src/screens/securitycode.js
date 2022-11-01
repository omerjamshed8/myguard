import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomButton from 'components/custom-button';
import React from 'react';
import {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {forgot} from 'services/auth';
import {Colors, commonStyle, Fonts, Images} from 'theme';
import colors from 'theme/colors';
import {generateRandomNumber} from 'utils';
import {showError, showSuccess} from 'utils/toast';

function SecurityCode({navigation, route}) {
  console.log('route>.', route);
  const {
    params: {email, pinCode},
  } = route;

  const [code, setCode] = useState('');
  const [isLoading, setLoading] = useState(false);

  const onResendCode = async () => {
    Keyboard.dismiss();
    setLoading(true);
    let resendCode = String(generateRandomNumber());
    try {
      const response = await forgot({
        email,
        pinCode: resendCode,
      });

      navigation.setParams({pinCode: resendCode});
      showSuccess(
        'Successfully sent verification code. Please check your email.',
      );
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const clickhandler = () => {
    if (pinCode === code) {
      navigation.navigate('ResetPassword', {email, pinCode});
    } else {
      showError('You have entered an invalid code.');
    }
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}} behavior="height">
      <SafeAreaView style={[styles.splashView, {paddingTop: 80}]}>
        <ScrollView style={[commonStyle.screenPadding]}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={Images.lock} />
          </View>

          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[styles.splashText, {marginTop: 150}]}>
              Enter a code to verify your account
            </Text>

            <View style={{flexDirection: 'row'}}>
              <OTPInputView
                style={{width: '80%', height: 70, marginTop: 10}}
                pinCount={4}
                onCodeChanged={setCode}
                autoFocusOnLoad
                codeInputFieldStyle={styles.codeInputFieldStyle}
                codeInputHighlightStyle={styles.codeInputFieldStyle}
                onCodeFilled={code => {
                  console.log(`Code is ${code}, you are good to go!`);
                }}
              />
            </View>

            <TouchableOpacity
              disabled={isLoading}
              onPress={onResendCode}
              style={styles.resetWrapper}
            >
              <Text style={styles.resendCodeText}>Resend code</Text>
              {isLoading && (
                <ActivityIndicator
                  size={'small'}
                  color={Colors.primary}
                  style={styles.indicator}
                />
              )}
            </TouchableOpacity>
          </View>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <CustomButton
            disabled={code.length < 4}
            title={'Verify'}
            onButtonPress={clickhandler}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default SecurityCode;

const styles = StyleSheet.create({
  splashView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  splashText: {
    fontSize: 16,
    color: colors.twoATwoD,
    fontFamily: Fonts.Poppins.Regular,
  },
  input: {
    borderColor: '#7A7C8A',
    borderWidth: 2,
    width: 320,
    borderRadius: 10,
    padding: 7,
    color: 'black',
  },
  splashTextInput: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'left',
  },
  appButtonContainer: {
    elevation: 8,
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
  },
  appButtonText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
    alignItems: 'center',
    color: 'white',
  },
  splashTextInputrow: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
    width: 50,
  },
  inputrow: {
    borderColor: '#2A2D43',
    borderWidth: 2,
    fontSize: 25,
    textAlign: 'center',
    width: 60,
    height: 70,
    borderRadius: 10,
    padding: 7,
    color: 'black',
    marginTop: 10,
    marginHorizontal: 6,
  },
  buttonContainer: {
    ...commonStyle.screenPadding,
    marginBottom: 20,
  },
  resendCodeText: {
    fontSize: 12,
    color: colors.twoATwoD,
    fontFamily: Fonts.Poppins.Regular,
    fontWeight: '600',
    textAlign: 'right',
  },
  codeInputFieldStyle: {
    borderWidth: 1,
    borderRadius: 14,
    borderColor: Colors.twoATwoD,
    height: 70,
    width: 61,
    color: Colors.twoATwoD,
    fontFamily: Fonts.Poppins.SemiBold,
    fontSize: 18,
  },
  resetWrapper: {
    alignSelf: 'flex-end',
    marginTop: 15,
    marginRight: 30,
    flexDirection: 'row',
  },
  indicator: {
    marginLeft: 5,
  },
});
