import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {updateUserRole} from 'services/auth';
import {Colors, Fonts, Images} from 'theme';
import fonts from 'theme/fonts';

function SelectAccount({navigation}) {
  const {registerData} = useSelector(state => state.auth);

  const onUpdateRole = async role => {
      await updateUserRole(role, {
        Authorization: `Bearer ${registerData?.accessToken}`,
      }).then((res)=>{
        navigation.navigate('CreateGuard', {
          type: role == 2 ? 'guard' : 'employee',
          role,
        });
      }).catch ((error)=> {
      console.log('eer', error, error.response);
    })
  };

  return (
    <SafeAreaView style={styles.splashView}>
      <Text style={styles.splashText}>Choose Account</Text>

      <View>
        <Text>
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity onPress={() => onUpdateRole(2)}>
          <Image
            source={Images.guard}
            style={{height: 130, width: 130, margin: 10}}
            resizeMode={'contain'}
          />
          <Text style={styles.guardText}>Guard</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => onUpdateRole(3)}>
          <Image
            source={Images.employee}
            style={{height: 130, width: 130, margin: 10}}
            resizeMode={'contain'}
          />
          <Text style={styles.guardText}>Employee</Text>
        </TouchableOpacity>
      </View>

      {/* <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                <Text style={styles.tex}>Guard</Text>
                <Text style={styles.tex}>Employee</Text>
            </View> */}

      <View>
        <Text>
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
          {'\n'}
        </Text>
      </View>
    </SafeAreaView>
  );
}

export default SelectAccount;

const styles = StyleSheet.create({
  splashView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashText: {
    fontSize: 30,
    color: Colors.black,
    fontFamily: Fonts.Poppins.SemiBold,
  },
  input: {
    borderColor: 'black',
    borderWidth: 2,
    width: 320,
    borderRadius: 10,
    padding: 7,
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
    color: 'black',
    marginHorizontal: 50,
  },
  guardText: {
    textAlign: 'center',
    fontSize: 14,
    color: Colors.twoATwoD,
    fontFamily: fonts.Poppins.Regular,
    marginTop: 8,
  },
});
