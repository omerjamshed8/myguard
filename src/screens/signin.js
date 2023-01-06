import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Keyboard,
  Dimensions,
} from 'react-native';
import { Colors, commonStyle, Fonts, Images } from 'theme';
import CustomButton from 'components/custom-button';
import { showError } from 'utils/toast';
import { login } from 'services/auth';
import validator from 'validator';
import CustomInput from 'components/custom-input';
import colors from 'theme/colors';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'redux/reducer/auth-reducer';
import CommonModal from 'components/common-modal';
import ResetSuccess from 'components/reset-success';

function SignIn({ navigation }) {
  const dispatch = useDispatch();
  const [email, onChangeEmail] = React.useState(
    __DEV__ ? 'emp43@test.com' : '',    //rohit@mailinator.com
  );
  const [password, onChangePassword] = React.useState(
    __DEV__ ? 'Lahore2?' : '',      //Rohit@321
  );
  const [isLoading, setIsLoading] = React.useState(false);
  const [isPopup, setPopup] = useState(false);

  const clickhandler = async () => {
    Keyboard.dismiss();
    if (validator.isEmpty(email)) {
      return showError('The email is required');
    }

    if (!validator.isEmail(email)) {
      return showError('The email format is not proper.');
    }

    if (validator.isEmpty(password)) {
      return showError('The Password is required.');
    }
    setIsLoading(true);
    await login({
      email,
      password,
    }).then((res) => {
      setIsLoading(false);
      console.log('response>>>>', res);
      dispatch(setUserInfo(res));
      navigation.navigate('AppNav');
    }).catch((error) => {
      setIsLoading(false);
      showError(error?.response?.data?.message || 'Server Error');
    })
  };

  const clickhandlersignup = () => {
    navigation.navigate('SignUp');
  };

  const onforgotpassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    //pehlay safeareaview mein sirf styles mein yeh styles.splashView tha
    <SafeAreaView style={{width: Dimensions.get('window').width,height: Dimensions.get('window').height-20}}>  
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          ...commonStyle.screenPadding,
        }}
      >
        <View
          style={{
            flex: 0.5,
            justifyContent: 'center',
          }}
        >
          <Text style={styles.splashText}>Sign In</Text>
        </View>
        <CustomInput
          title={'Email*'}
          onChangeText={onChangeEmail}
          value={email}
          placeholder="example@yourdomain.com"
        />

        <CustomInput
          title={'Password*'}
          onChangeText={onChangePassword}
          value={password}
          placeholder="Password"
          inputType={'password'}
        />

        <Text style={[styles.forgotText]} onPress={onforgotpassword}>
          Forgot Password?
        </Text>
      </View>

      <View style={[commonStyle.screenPadding]}>
        <CustomButton
          isLoading={isLoading}
          onButtonPress={clickhandler}
          title={'Sign In'}
        />

        <Text style={styles.tex}>or continue with</Text>

        <View
          style={{
            justifyContent: 'center',
            flexDirection: 'row',
            marginVertical: 5,
          }}
        >
          <TouchableOpacity onPress={() => setPopup(true)}>
            <Image source={Images.facebook} style={{marginRight: 10}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setPopup(true)}>
            <Image source={Images.google} />
          </TouchableOpacity>
        </View>

        <Text style={styles.tex}>
          Don't have an account?{' '}
          <Text
            style={{fontWeight: 'bold', color: '#2A2D43'}}
            onPress={clickhandlersignup}
          >
            Sign Up
          </Text>
        </Text>
      </View>

      <CommonModal
        isVisible={isPopup}
        component={
          <ResetSuccess
            title="Coming Soon"
            onDone={() => {
              setPopup(false);
            }}
          />
        }
      />
    </SafeAreaView >
  );
}

export default SignIn;

const styles = StyleSheet.create({
  scrollStyle: {
    flex: 1,
    backgroundColor: 'green',
  },
  splashView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  splashText: {
    fontSize: 30,
    color: Colors.black,
    fontFamily: Fonts.Poppins.SemiBold,
  },
  input: {
    borderColor: '#7A7C8A',
    borderWidth: 2,
    borderRadius: 10,
    padding: 7,
    width: '100%',
  },
  splashTextInput: {
    fontSize: 15,
    color: '#1F1F1F',
    margin: 10,
    fontFamily: Fonts.Poppins.SemiBold,
    marginBottom: 5,
  },
  appButtonContainer: {
    borderColor: 'black',
    color: 'green',
    elevation: 8,
    backgroundColor: '#F2385F',
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    justifyContent: 'center',
    width: 320,
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
    alignItems: 'center',
    color: 'white',
  },
  tex: {
    color: colors.black,
    marginBottom: 15,
    fontFamily: Fonts.Poppins.Regular,
    marginTop: 10,
    textAlign: 'center',
  },
  forgotText: {
    fontFamily: Fonts.Poppins.SemiBold,
    fontSize: 16,
    color: Colors.black,
    textAlign: 'right',
    width: '100%',
    marginTop: 5,
  },
});
