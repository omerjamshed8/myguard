import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import {Colors, commonStyle, Fonts, Images} from 'theme';
import {showMessage} from 'react-native-flash-message';
import {register} from 'services/auth';
import validator from 'validator';
import CustomInput from 'components/custom-input';
import colors from 'theme/colors';
import fonts from 'theme/fonts';
import CustomButton from 'components/custom-button';
import {useDispatch} from 'react-redux';
import {setRegisterData} from 'redux/reducer/auth-reducer';
import {showError} from 'utils/toast';
import CommonModal from 'components/common-modal';
import ResetSuccess from 'components/reset-success';

function SignUp({navigation}) {
  const dispatch = useDispatch();

  const [state, setState] = useState({
    fullName: __DEV__ ? 'rohit' : '',
    email: __DEV__ ? 'rohit@mailinator.com' : '',
    password: __DEV__ ? 'Rohit@123' : '',
    confirmPassword: __DEV__ ? 'Rohit@123' : '',
  });
  const [isLoading, setLoading] = useState(false);
  const [isPopup, setPopup] = useState(false);

  const {fullName, email, password, confirmPassword} = state;

  const clickhandler = async () => {
    if (checkIsValidate()) {
      setLoading(true);
      try {
        const response = await register({
          fullName,
          email,
          password,
        });
        console.log('response>>', response);
        setLoading(false);
        navigation.navigate('SelectAccount');
        dispatch(
          setRegisterData({
            user: response?.user,
            accessToken: response?.token,
          }),
        );
      } catch (error) {
        console.log('errr', error.response);

        setLoading(false);
        // showMessage({
        //   message:
        //     error?.response?.data?.message ||
        //     error?.response?.data?.message?.errors?.[0]?.message ||
        //     error?.response?.data?.message?.[0]?.msg ||
        //     'Server Error',
        //   type: 'danger',
        // });
      }
    }
  };

  const clickhandlersignin = () => {
    navigation.navigate('SignIn');
  };

  const checkIsValidate = () => {
    Keyboard.dismiss();
    if (validator.isEmpty(fullName)) {
      return showError('The full name is required.');
    }

    if (validator.isEmpty(email)) {
      return showError('The email is required');
    }

    if (!validator.isEmail(email)) {
      return showError('The email format is not proper.');
    }

    // if (!password) {
    //   return showError('The password is required.');
    // }

    // if (password.length < 6) {
    //   return showError('The password should contain at least 6 characters.');
    // }

    // if (password !== confirmPassword) {
    //   return showError('The password does not match with confirm password.');
    // }
    return true;
  };

  const isValid = () => {
    if (
      !fullName ||
      !validator.isEmail(email) ||
      !password ||
      !confirmPassword ||
      password != confirmPassword
    ) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <SafeAreaView style={styles.splashView}>
      <ScrollView
        style={commonStyle.screenPadding}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10%',
          }}
        >
          <Text style={styles.splashText}>Sign Up</Text>

          <Text>
            {'\n'}
            {'\n'}
          </Text>

          <View style={{marginTop: '5%', flex: 1, width: '100%'}}>
            <CustomInput
              title={'Full Name*'}
              onChangeText={val => setState(s => ({...s, fullName: val}))}
              value={fullName}
              placeholder="Full Name"
            />
            <CustomInput
              title={'Email*'}
              onChangeText={val => setState(s => ({...s, email: val}))}
              value={email}
              placeholder="example@yourdomain.com"
            />

            <CustomInput
              title={'Password*'}
              onChangeText={val => setState(s => ({...s, password: val}))}
              value={password}
              placeholder="Password"
              inputType={'password'}
            />

            <CustomInput
              title={'Confirm Password*'}
              value={confirmPassword}
              onChangeText={val =>
                setState(s => ({...s, confirmPassword: val}))
              }
              placeholder="Password"
              inputType={'password'}
            />

            <Text style={[styles.tex, {width: '100%', textAlign: 'center'}]}>
              By checking you agree to our{' '}
              <Text
                style={{fontWeight: 'bold', fontSize: 12, color: '#2A2D43'}}
              >
                Terms and Conditions
              </Text>
            </Text>
          </View>

          <View style={{marginTop: 50}} />
          <CustomButton
            // disabled={!isValid()}
            onButtonPress={clickhandler}
            title={'Sign Up'}
            isLoading={isLoading}
          />

          <Text style={[styles.tex, {marginTop: '6%'}]}>or continue with</Text>

          <TouchableOpacity
            onPress={() => setPopup(true)}
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              backgroundColor: 'white',
              marginTop: '5%',
            }}
          >
            <Image source={Images.facebook} style={{marginRight: 10}} />
            <Image source={Images.google} />
          </TouchableOpacity>

          <View>
            <Text style={[styles.tex, {marginTop: '5%'}]}>
              Already have an account?{' '}
              <Text
                style={{fontWeight: 'bold', fontSize: 14, color: '#7A7C8A'}}
                onPress={clickhandlersignin}
              >
                {' '}
                Sign In
              </Text>
            </Text>
          </View>
        </View>
      </ScrollView>

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
    </SafeAreaView>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  splashView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  splashText: {
    fontSize: 30,
    color: colors.black,
    fontFamily: Fonts.Poppins.Regular,
  },
  input: {
    borderColor: '#7A7C8A',
    borderWidth: 2,
    width: 320,
    borderRadius: 10,
    padding: 7,
    color: Colors.black,
  },
  splashTextInput: {
    fontSize: 15,
    color: '#2A2D43',
    fontWeight: 'bold',
    margin: 10,
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
    color: Colors.twoATwoD,
    fontSize: 12,
    fontFamily: fonts.Poppins.Regular,
    marginTop: 10,
  },
});
