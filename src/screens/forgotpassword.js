import React, {useState} from 'react';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Colors, commonStyle, Fonts, Images} from 'theme';
import colors from 'theme/colors';
import validator from 'validator';
import {showError} from 'utils/toast';
import {forgot} from 'services/auth';
import {generateRandomNumber} from 'utils';

function ForgotPassword({navigation}) {
  const [text, onChangeText] = React.useState('');
  const [isLoading, setLoading] = useState(false);

  const clickhandler = async () => {
    Keyboard.dismiss();
    if (validator.isEmpty(text)) {
      return showError('The email is required');
    }

    if (!validator.isEmail(text)) {
      return showError('The email format is not proper.');
    }

    let payload = {
      email: text,
      pinCode: String(generateRandomNumber()),
    };

    setLoading(true);

    try {
      const response = await forgot(payload);

      navigation.navigate('SecurityCode', payload);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.splashView}>
      <ScrollView
        style={[commonStyle.screenPadding]}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 50,
          }}
        >
          <Image source={Images.lock} resizeMode={'contain'} />
        </View>

        <Text style={[styles.splashText, {marginTop: 150}]}>
          Please enter registered email ID.
        </Text>
        <Text style={[styles.invitationText]}>
          we will send a verification code to your email ID.
        </Text>

        <View style={{marginTop: 15}}>
          <CustomInput
            title={'Email*'}
            onChangeText={onChangeText}
            value={text}
            placeholder="example@yourdomain.com"
          />
        </View>

        <View>
          <Text>
            {'\n'}
            {'\n'}
            {'\n'}
          </Text>

          <CustomButton
            isLoading={isLoading}
            onButtonPress={clickhandler}
            title={'Send Code'}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ForgotPassword;

const styles = StyleSheet.create({
  splashView: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  splashText: {
    fontSize: 16,
    color: colors.twoATwoD,
    fontFamily: Fonts.Poppins.SemiBold,
    textAlign: 'center',
  },
  invitationText: {
    fontSize: 14,
    color: colors.twoATwoD,
    fontFamily: Fonts.Poppins.Regular,
    marginTop: 5,
    textAlign: 'center',
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
    color: colors.twoATwoD,
    fontFamily: Fonts.Poppins.SemiBold,
    margin: 10,
    textAlign: 'left',
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
    //   textTransform: "uppercase",
    color: 'white',
  },
});
