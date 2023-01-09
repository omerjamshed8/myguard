import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useRef, useEffect} from 'react';
import {DOWN} from '../../assets1/images';
import CountryPicker from 'react-native-country-picker-modal';
import {FONTS} from '../../assets1/Style/font';

import {PhoneInputState} from 'react-native-phone-number-input';
import PhoneInput from 'react-native-phone-number-input';
const Countryinput = ({disabled,onchange,value}) => {
  console.log("value",value)
  let inputval=value.toString()
  console.log("Input num in string",inputval);
  const phoneInput = useRef(null);
  console.log(phoneInput);
  useEffect(() => {
    console.log(phoneInput?.current?.getCallingCode());
  }, []);
  const [selectedCallingCode, setSelectedCallingCode] = useState('90');
  const [num,setnum]=useState()
  const [countrycode,setcountrycode]=useState()
  console.log("number entered",num)
  console.log("Country code",countrycode?.callingCode[0])
  const c_code=countrycode?.callingCode[0]
  let a=`${c_code}${num}`;
  console.log("a=",a)
  if(typeof onchange === 'function') {
    onchange(a)
  }
  function pressCountry() {
    console.log(PhoneInputState, 'STATE');
    phoneInput?.current?.modalVisible === true;
  }

  function Render() {
    return (
      <View style={{position: 'absolute', right: -30, zIndex: -1}}>
        <Text></Text>
      </View>
    );
  }
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View>
        <Image
          source={DOWN}
          style={{
            height: 10,
            width: 10,
            position: 'absolute',
            zIndex: 1,
            top: 26,
            left: 43,
          }}
          resizeMode={'contain'}
        />
        {/* <TouchableOpacity
          onPress={() => pressCountry()}
          style={{
            position: 'absolute',
            // top: 20,
            zIndex: 1,
            // backgroundColor
            height: 60,
            width: 120,
            backgroundColor: 'transparent',
            borderRadius: 20,
            borderWidth: 1,
            borderColor: '#000',
          }}></TouchableOpacity> */}
        <PhoneInput
          value={value}
          placeholder={value}
          disabled={disabled}
          onChangeText={text=>setnum(text)}
          containerStyle={[
            {
              backgroundColor: '#fff',
              height: 60,
              width: "100%",
              borderRadius: 12,
              // borderColor: '#000',
              borderWidth: 2,
              // paddingHorizontal: 5,
              // paddingVertical: 5,
              overflow: 'hidden',
            },
          ]}
          // textInputProps={value={value}}
          disableArrowIcon
          onChangeCountry={setcountrycode}
          textInputStyle={{
            // position: 'absolute',
            // top: -25,
            // alignSelf: 'center',
            color: '#000',
            // backgroundColor: '#000',
            borderLeftWidth: 1,
            borderLeftColor: '#000',
            fontFamily: FONTS.MEDIUM,
            fontSize: 16,
            // marginTop: -10,
            // top: 3,
            // bottom: -5,
            // left: 60,
            padding:"auto",
            // marginLeft: 30,
            width: Dimensions.get('screen').width / 2,
            height: 110,
          }}
          countryPickerButtonStyle={{
            backgroundColor: 'transparent',
            width: 60,
            marginHorizontal: -10,
            position: 'relative',
            // right: 0,
            left: 1,
          }}
          // renderDropdownImage={Render()}
        />
      </View>
    </View>
  );
};

export default Countryinput;

const styles = StyleSheet.create({
  inputs: {
    width: 300,
    height: 60,
    marginTop: 5,
    borderColor: '#000',
    borderWidth: 2,
    borderRadius: 10,
    // padding: 7,
    justifyContent: 'center',
    alignItems: 'center',
    // paddingHorizontal: 16,
    color: '#000',
    fontFamily: FONTS.REGULAR,
    fontSize: 14,
  },
});	