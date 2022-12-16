import React, { useState } from 'react';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import Screen from 'components/screen';
import useUser from 'hooks/useUser';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Keyboard,
} from 'react-native';
import colors from 'theme/colors';
import fonts from 'theme/fonts';
import CommonModal from 'components/common-modal';
import PickerPopup from 'components/picker-popup';
import { avatarUpload, getUserDetail, updateProfile } from 'services/auth';
import { showError, showSuccess } from 'utils/toast';
import validator from 'validator';
import ResetSuccess from 'components/reset-success';
import _ from 'lodash';

const BankingDetails = ({ navigation }) => {
    const {  user } = useUser();
    const [bankname,setbankname]=useState(user?.UserProfile?.bankname);
    const [accountname, onChangeaccountname] = React.useState(user?.UserProfile?.accountname || '');
    const [BSB, onChangeBSB] = React.useState(
        user?.UserProfile?.BSB || '',
    );
    const [accountnumber, onChangeaccountnumber] = React.useState(user?.UserProfile?.accountnumber || '');
    const [state, onChangestate] = React.useState(
        user?.UserProfile?.state || '',
    );
      const [postalcode, onChangePostalcode] = React.useState(
        user?.UserProfile?.postalCode || '',
      );
    // const [dob, onChangeDob] = React.useState(
    //     user?.UserProfile?.dateOfBirth || '',
    // );

    const [country, onChangecountry] = useState(user?.UserProfile?.country);
    const [isPicker, setPicker] = useState(false);
    const [image, setImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isPopup, setPopup] = useState(false);


    const onClosePicker = () => setPicker(false);

    const onSave = async () => {
        Keyboard.dismiss();
        if (validator.isEmpty(Fullname)) {
            return showError('The full name is required');
        }
        // else if (validator.isEmpty(accountname)) {
        //   return showError('The accountname number is required');
        // } else if (validator.isEmpty(address)) {
        //   return showError('The address is required');
        // } else if (validator.isEmpty(city)) {
        //   return showError('The city is required');
        // } else if (validator.isEmpty(state)) {
        //   return showError('The state is required');
        // } else if (validator.isEmpty(postalcode)) {
        //   return showError('The postalcode is required');
        // }  else if (validator.isEmpty(dob)) {
        //   return showError('The date of birth is required');
        // }

        let payload = {
            BSB,
            accountnumber,
            state,
            postalCode: postalcode,
            dateOfBirth: dob ? new Date(dob).toISOString() : '',
            countryCode: '+92',
            fullName: Fullname,
            accountname,
        };
        setLoading(true);
        try {
            const response = await updateProfile(payload);

            if (response?.success) {
                getUserDetail();
                setPopup(true);
                // navigation.goBack();
                // showSuccess('User profile updated successfully.');
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    const onUpdateProfile = async () => {
        // if (!image) {
        onSave();
        return;
        // }

        setLoading(true);
        try {
            const response = await avatarUpload(image);
            console.log('imag response>', response);
            onSave();
        } catch (error) {
            console.log('image errror', error.response);
            setLoading(false);
        }
    };

    return (
        <Screen>
            <ScrollView>
                <View style={{ marginTop: "30%" }} />
                <CustomInput
                    value={bankname}
                    placeholder="Bank Name"
                    onChangeText={setbankname}
                />

                <CustomInput
                    value={accountname}
                    placeholder="Emergency Number"
                    onChangeText={onChangeaccountname}
                    // inputType={'phone'}
                    keyboardType="number-pad"
                />

                <CustomInput
                    value={BSB}
                    placeholder="BSB"
                    onChangeText={onChangeBSB}
                />
                <CustomInput
                    value={accountnumber}
                    placeholder="Account Number"
                    onChangeText={onChangeaccountnumber}
                />

                <View>
                <CustomButton
                    isLoading={isLoading}
                    // onButtonPress={onSave}
                    onButtonPress={onUpdateProfile}
                    title={'Save Changes'}
                    buttonWrapper={{ marginTop: "30%" }}
                />
                <Text style={styles.cancelText} onPress={() => navigation.goBack()}>
                    Cancel
                </Text>

                </View>
            </ScrollView>

            <CommonModal
                onClose={onClosePicker}
                isVisible={isPicker}
                component={
                    <PickerPopup
                        handleClose={onClosePicker}
                        handleResponse={e => setImage(e?.[0])}
                    />
                }
            />
            <CommonModal
                isVisible={isPopup}
                component={
                    <ResetSuccess
                        title={'User profile updated successfully.'}
                        onDone={() => {
                            setPopup(false);
                            navigation.goBack();
                        }}
                    />
                }
            />
        </Screen>
    );
};

export default BankingDetails;
const styles = StyleSheet.create({
    userImage: {
        width: 129,
        height: 131,
        borderRadius: 10,
    },
    userName: {
        fontSize: 25,
        fontFamily: fonts.Poppins.SemiBold,
        color: colors.twoATwoD,
        marginTop: 15,
    },
    postalCodeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    cancelText: {
        fontSize: 16,
        fontFamily: fonts.Poppins.Regular,
        color: colors.twoATwoD,
        textAlign: 'center',
        marginVertical: 13,
    },
    changeProfileImgText: {
        fontSize: 12,
        fontFamily: fonts.Poppins.Regular,
        color: colors.twoATwoD,
        marginLeft: 3,
    },
    inputrow: {
        width: '48%',
    },
});
