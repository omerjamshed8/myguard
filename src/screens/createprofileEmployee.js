import React from 'react';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {Colors, Fonts, Images} from 'theme';

function CreateGuard({navigation}) {
  const [text, onChangeText] = React.useState('Full Name');
  const [names, onChangeName] = React.useState('');
  const [phone, onChangePhone] = React.useState('');
  const [address, onChangeAddress] = React.useState('');
  const [city, onChangeCity] = React.useState('');
  const [province, onChangeProvince] = React.useState('');
  const [postalcode, onChangePostalcode] = React.useState('');
  const [number, onChangeNumber] = React.useState(null);

  const clickhandler = () => {
    navigation.navigate('CreateEmployee');
  };

  return (
    <SafeAreaView style={styles.splashView}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>
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
              placeholderTextColor={'black'}
            />

            <CustomInput
              value={phone}
              placeholder="Phone"
              onChangeText={onChangePhone}
              placeholderTextColor={'black'}
            />

            <CustomInput
              value={address}
              placeholder="Address"
              onChangeText={onChangeAddress}
              placeholderTextColor={'black'}
            />

            <CustomInput
              value={city}
              placeholder="City"
              onChangeText={onChangeCity}
              placeholderTextColor={'black'}
            />
          </View>

          <View style={styles.postalCodeWrapper}>
            {/* for province */}

            <CustomInput
              containerStyle={styles.inputrow}
              value={province}
              placeholder="Province"
              placeholderTextColor={'black'}
              onChangeText={onChangeProvince}
            />

            <CustomInput
              containerStyle={styles.inputrow}
              value={postalcode}
              placeholder="Postal Code"
              placeholderTextColor={'black'}
              onChangeText={onChangePostalcode}
            />

            {/* for postal code */}
          </View>

          <View>
            <Text>{'\n'}</Text>
          </View>
        </View>

        <View>
          <CustomButton
            buttonWrapper={styles.profileButton}
            title={'Create Profile'}
          />

          <Text style={styles.skipText}>Skip</Text>
          {/* <TouchableOpacity
            style={[styles.appButtonContainer, {borderColor: 'black'}]}
            onPress={clickhandler}>
            <Text style={styles.appButtonText}>Create Profile</Text>
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={[
              styles.appButtonContainer,
              {elevation: 0, borderColor: 'black', backgroundColor: 'white'},
            ]}>
            <Text style={[styles.appButtonText, {color: '#09101D'}]}>Skip</Text>
          </TouchableOpacity> */}
        </View>

        <View>
          <Text>{'\n'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
    width: '48%',
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
});
