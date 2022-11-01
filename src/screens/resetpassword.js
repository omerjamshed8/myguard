import React, {useState} from 'react';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import {Text, View, StyleSheet, Image, SafeAreaView} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Colors, commonStyle, Images} from 'theme';
import validator from 'validator';
import {showError} from 'utils/toast';
import {resetPassword} from 'services/auth';
import CommonModal from 'components/common-modal';
import ResetSuccess from 'components/reset-success';

function ResetPassword({navigation, route}) {
  const {
    params: {email},
  } = route;

  const [newpass, onChangeNewPass] = React.useState('');
  const [confirmpass, onChangeConfirmPass] = React.useState('');
  const [isLoading, setLoading] = useState(false);
  const [isPopup, setPopup] = useState(false);

  const onSubmithandler = async () => {
    if (validator.isEmpty(newpass)) {
      return showError('The password is required.');
    }

    if (newpass?.length < 6) {
      return showError('The password should contain at least 6 characters.');
    }

    if (validator.isEmpty(confirmpass)) {
      return showError('The confirm password is required.');
    }

    if (newpass !== confirmpass) {
      return showError('The password and confirm password does not match.');
    }

    setLoading(true);
    try {
      const response = await resetPassword({
        email,
        password: newpass,
      });
      console.log('response', response);
      setLoading(false);
      if (response?.error) {
        showError(response?.message?.[0]?.msg || 'Server Error');
      } else {
        setPopup(true);
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.splashView}>
      <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 80,
          }}>
          <Image source={Images.lock} />
        </View>

        <View style={{marginTop: 80}}>
          <CustomInput
            title={'New Password*'}
            onChangeText={onChangeNewPass}
            value={newpass}
            inputType={'password'}
            placeholder={'**********'}
          />

          <CustomInput
            title={'Confirm Password*'}
            onChangeText={onChangeConfirmPass}
            value={confirmpass}
            inputType={'password'}
            placeholder={'**********'}
          />
        </View>

        <View>
          <Text>{'\n'}</Text>
        </View>

        <View>
          <Text>
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
            {'\n'}
          </Text>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton
          isLoading={isLoading}
          title={'Reset'}
          onButtonPress={onSubmithandler}
        />
      </View>

      <CommonModal
        isVisible={isPopup}
        component={
          <ResetSuccess
            onDone={() => {
              setPopup(false);
              navigation.popToTop();
            }}
          />
        }
      />
    </SafeAreaView>
  );
}

export default ResetPassword;

const styles = StyleSheet.create({
  splashView: {
    flex: 1,
    backgroundColor: Colors.white,
    ...commonStyle.screenPadding,
  },
  splashText: {
    fontSize: 14,
    color: 'black',
    fontWeight: 'bold',
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
    color: '#2A2D43',
    fontWeight: 'bold',
    margin: 10,
    textAlign: 'left',
  },
  appButtonContainer: {
    borderColor: '#2A2D43',
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
    //   textTransform: "uppercase",
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
    borderColor: 'black',
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
    marginBottom: 20,
  },
});
