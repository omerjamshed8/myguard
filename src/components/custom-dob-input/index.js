import CustomInput from 'components/custom-input';
import React, {useState} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';
import {Colors, deviceInfo, Fonts} from 'theme';
import colors from 'theme/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const CustomDOBInput = ({onChange, value}) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dob, setDob] = useState(value || '');

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setDob(date);
    onChange(date);
    hideDatePicker();
  };

  return (
    <>
      <Text style={styles.dobTitle}>Date of Birth</Text>

      <TouchableOpacity
        style={styles.postalCodeWrapper}
        onPress={showDatePicker}>
        <CustomInput
          containerStyle={styles.dobInputContainer}
          placeholder="MM"
          editable={false}
          value={dob ? moment(dob).format('MM') : ''}
        />
        <View
          style={[
            styles.dropDownIconContainer,
            {left: deviceInfo.width / 4.8, right: 0},
          ]}>
          <AntDesign name="down" color={colors.twoATwoD} size={13} />
        </View>
        <CustomInput
          containerStyle={styles.dobInputContainer}
          placeholder="DD"
          editable={false}
          value={dob ? moment(dob).format('DD') : ''}
        />
        <View
          style={[
            styles.dropDownIconContainer,
            {right: deviceInfo.width / 2.98},
          ]}>
          <AntDesign name="down" color={colors.twoATwoD} size={13} />
        </View>
        <CustomInput
          containerStyle={styles.dobInputContainer}
          placeholder="YYYY"
          editable={false}
          value={dob ? moment(dob).format('YYYY') : ''}
        />
        <View style={styles.dropDownIconContainer}>
          <AntDesign name="down" color={colors.twoATwoD} size={13} />
        </View>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        accentColor={Colors.primary}
        textColor={Colors.twoATwoD}
        buttonTextColorIOS={Colors.twoATwoD}
        maximumDate={new Date()}
      />
    </>
  );
};

export default CustomDOBInput;

const styles = StyleSheet.create({
  postalCodeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dobInputContainer: {
    width: '30%',
    marginVertical: 5,
  },

  dobTitle: {
    fontSize: 15,
    color: colors.inputTitle,
    fontFamily: Fonts.Poppins.SemiBold,
  },
  dropDownIconContainer: {
    position: 'absolute',
    right: 0,
    bottom: 22,
    right: 12,
  },
});
