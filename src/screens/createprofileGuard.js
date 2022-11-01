import CustomButton from 'components/custom-button';
import CustomDOBInput from 'components/custom-dob-input';
import CustomInput from 'components/custom-input';
import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {setUserInfo} from 'redux/reducer/auth-reducer';
import {Colors, Fonts, Images} from 'theme';
import colors from 'theme/colors';
import {updateEmployeeProfile} from 'services/auth';
import validator from 'validator';
import {showError, showSuccess} from 'utils/toast';
function CreateGuard({navigation}) {
  const dispatch = useDispatch();
  const {registerData} = useSelector(state => state.auth);

  const [names, onChangeName] = React.useState(
    registerData?.user?.fullName || '',
  );
  const [phone, onChangePhone] = React.useState('');
  const [address, onChangeAddress] = React.useState('');
  const [city, onChangeCity] = React.useState('');
  const [province, onChangeProvince] = React.useState('');
  const [postalcode, onChangePostalcode] = React.useState('');
  const [dob, onChangeDob] = React.useState('');
  const [isLoading, setLoading] = useState(false);

  const onSave = async () => {
    Keyboard.dismiss();
    if (validator.isEmpty(names)) {
      return showError('The full name is required');
    }
    // else if (validator.isEmpty(phone)) {
    //   return showError('The phone number is required');
    // } else if (validator.isEmpty(address)) {
    //   return showError('The address is required');
    // } else if (validator.isEmpty(city)) {
    //   return showError('The city is required');
    // } else if (validator.isEmpty(province)) {
    //   return showError('The province is required');
    // } else if (validator.isEmpty(postalcode)) {
    //   return showError('The postalcode is required');
    // } else if (validator.isEmpty(dob)) {
    //   return showError('The date of birth is required');
    // }
    setLoading(true);

    let payload = {
      address,
      city,
      province,
      postalCode: postalcode,
      dateOfBirth: dob ? new Date(dob).toISOString() : '',
      countryCode: '+92',
      fullName: names,
      phone,
    };

    try {
      const response = await updateEmployeeProfile(payload, {
        Authorization: `Bearer ${registerData?.accessToken}`,
      });

      if (response?.success) {
        onSkip();
        showSuccess('User profile updated successfully.');
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const onSkip = () => {
    dispatch(setUserInfo(registerData));
  };

  return (
    <KeyboardAvoidingView style={{flex: 1}}>
      <SafeAreaView style={styles.splashView}>
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          {/* Input Wrapper */}
          <View style={{flex: 1, padding: 25}}>
            <Text>{'\n'}</Text>
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Image
                source={Images.yellow}
                style={{height: 110, width: 110.26}}
              />
              <View style={styles.editWrapper}>
                <Image
                  resizeMode="contain"
                  style={styles.pencilIcon}
                  source={Images.pencil}
                />
                <Text style={styles.tex}>Upload a Photo</Text>
              </View>
            </View>
            <Text>{'\n'}</Text>

            <View>
              <CustomInput
                value={names}
                placeholder="Full Name"
                onChangeText={onChangeName}
              />

              <CustomInput
                value={phone}
                placeholder="Phone"
                onChangeText={onChangePhone}
                inputType={'phone'}
              />

              <CustomInput
                value={address}
                placeholder="Address"
                onChangeText={onChangeAddress}
              />

              <CustomInput
                value={city}
                placeholder="City"
                onChangeText={onChangeCity}
              />
            </View>

            <View style={styles.postalCodeWrapper}>
              {/* for province */}

              <CustomInput
                containerStyle={styles.inputrow}
                value={province}
                placeholder="Province"
                onChangeText={onChangeProvince}
              />

              <CustomInput
                containerStyle={styles.inputrow}
                value={postalcode}
                placeholder="Postal Code"
                //placeholderTextColor={'black'}
                onChangeText={onChangePostalcode}
              />

              {/* for postal code */}
            </View>
            <CustomDOBInput onChange={date => onChangeDob(date)} />
            <View>
              <Text>{'\n'}</Text>
            </View>
          </View>

          <View>
            <CustomButton
              isLoading={isLoading}
              buttonWrapper={styles.profileButton}
              title={'Create Profile'}
              onButtonPress={onSave}
            />

            <TouchableOpacity onPress={onSkip}>
              <Text style={styles.skipText}>Skip</Text>
            </TouchableOpacity>
          </View>

          <View>
            <Text>{'\n'}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

export default CreateGuard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashView: {
    flex: 1,
  },
  splashText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#7A7C8A',
    borderWidth: 2,
    width: 320,
    borderRadius: 10,

    paddingLeft: 20,
    color: 'black',
    margin: 10,
  },
  splashTextInput: {
    fontSize: 15,
    color: 'black',
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
    marginLeft: 10,
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
    fontFamily: Fonts.Poppins.Regular,
    fontSize: 12,
  },
  splashTextInputrow: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
    width: 50,
  },
  inputrow: {
    // borderColor: '#7A7C8A',
    // borderWidth: 2,
    // width: 150,
    // borderRadius: 10,
    // padding: 7,
    // color: 'black',
    // marginTop: 10,
    // marginHorizontal: 10,
    width: '48%',
  },
  dobInputContainer: {
    width: '30%',
    marginVertical: 5,
  },
  editWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  pencilIcon: {
    height: 11,
    width: 11,
    marginRight: 2,
  },
  contentContainer: {
    flexGrow: 1,
  },
  postalCodeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileButton: {
    width: '92%',
  },
  skipText: {
    alignSelf: 'center',
    color: Colors.black,
    marginTop: 20,
    fontFamily: Fonts.Poppins.Regular,
  },
  dobTitle: {
    fontSize: 15,
    color: colors.inputTitle,
    fontFamily: Fonts.Poppins.SemiBold,
  },
});
