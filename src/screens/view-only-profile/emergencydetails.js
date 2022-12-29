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
import Dropdowns from '../view-profile/dropdownpicker';
import axios from 'axios';

const ViewEmergencyDetails = ({ navigation }) => {
    const { user } = useUser();
    const [emergencydetails, setemergencydetails] = useState(user?.UserProfile?.emergencydetails);
    const [emergencynumber, onChangeemergencynumber] = React.useState(user?.UserProfile?.emergencynumber || '');
    const [address, onChangeAddress] = React.useState(
        user?.UserProfile?.address || '',
    );
    const [city, onChangeCity] = React.useState(user?.UserProfile?.city || '');
    const [state, onChangestate] = React.useState(
        user?.UserProfile?.state || '',
    );
    const [postalcode, onChangePostalcode] = React.useState(
        user?.UserProfile?.postalCode || '',
    );

    const [country, onChangecountry] = useState(user?.UserProfile?.country);
    const [isPicker, setPicker] = useState(false);
    const [image, setImage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const [isPopup, setPopup] = useState(false);


    const onClosePicker = () => setPicker(false);

    const onSave = async () => {
        Keyboard.dismiss();
        if (validator.isEmpty(emergencydetails)) {
            return showError('Emergency Details is required');
        }
        else if (!validator.isLength(emergencydetails, 3, 50)) {
            return showError('The emergency details should be between 3 to 50 alphabets');
        } else if (!validator.isAlpha(emergencydetails)) {
            return showError('The emergency details should be in alphabetical format');
        }
        else if (!validator.isLength(emergencynumber, 7, 15)) {
            return showError('The emergency number should be between 7 to 15 digits');
        } else if (!validator.isNumeric(emergencynumber)) {
            return showError('The emergency number should be in numerical format');
        } else if (validator.isEmpty(address)) {
            return showError('The address is required');
        } else if (!validator.isAlphanumeric(address)) {
            return showError("Address should be in alpha numeric form")
        }
        else if (!validator.isLength(address, 1, 100)) {
            return showError("Address should be between 1 to 100 alphabets")
        } else if (validator.isEmpty(city)) {
            return showError('The city is required');
        } else if (!validator.isAlpha(city)) {
            return showError("City should be in alphabetical form")
        }
        else if (!validator.isLength(city, 2, 20)) {
            return showError("City should be between 2 to 20 alphabets")
        }
        else if (validator.isEmpty(postalcode)) {
            return showError('PostalCode is required');
        } else if (!validator.isNumeric(postalcode)) {
            return showError('The postalcode should be in numerical format');
        } else if (!validator.isLength(postalcode, 4, 10)) {
            return showError('Zip/Postal code should be between 4 to 10 digits');
        }

        // let payload = {
        //     address,
        //     city,
        //     state,
        //     postalCode: postalcode,
        //     dateOfBirth: dob ? new Date(dob).toISOString() : '',
        //     countryCode: '+92',
        //     fullName: Fullname,
        //     emergencynumber,
        // };
        // setLoading(true);
        // try {
        //     const response = await updateProfile(payload);

        //     if (response?.success) {
        //         getUserDetail();
        //         setPopup(true);
        //         // navigation.goBack();
        //         // showSuccess('User profile updated successfully.');
        //     }
        //     setLoading(false);
        // } catch (error) {
        //     setLoading(false);
        // }

        axios.put(
            "https://securitylinksapi.herokuapp.com/api/v1/employee/profile/13",
            {
                emergencyDetails: emergencydetails,
                emergencynumber: emergencynumber,
                address: address,
                country: country,
                state: state,
                city: city,
                postalCode: postalcode
            }
        ).then(res => {
            if (res?.status === 200) {
                setPopup(true)
            }
            console.log('updated successfully')
            console.log(res)
            console.log('success')
            console.log(res)
        }).catch(e => {
            console.log('error')
            console.log(e.response.data)
        })
    };

    return (
        <Screen>
            <ScrollView>
                <View style={{ marginTop: "30%" }} />
                <CustomInput
                    value={emergencydetails}
                    placeholder="Emergency Details"
                    onChangeText={setemergencydetails}
                />

                <CustomInput
                    value={emergencynumber}
                    placeholder="Emergency Number"
                    onChangeText={onChangeemergencynumber}
                    // inputType={'phone'}
                    keyboardType="number-pad"
                />

                <CustomInput
                    value={address}
                    placeholder="Address"
                    onChangeText={onChangeAddress}
                />

                <View style={styles.postalCodeWrapper}>
                    <Dropdowns ph={'Country'} />
                    <Dropdowns ph={'State'} />
                </View>
                <View style={styles.postalCodeWrapper}>
                    <CustomInput
                        containerStyle={styles.inputrow}
                        value={city}
                        placeholder="City"
                        onChangeText={onChangeCity}
                    />
                    <CustomInput
                        containerStyle={styles.inputrow}
                        value={postalcode}
                        placeholder="Zip/Postal code"
                        onChangeText={onChangePostalcode}
                    />
                </View>
                <View>
                    <CustomButton
                        isLoading={isLoading}
                        // onButtonPress={onSave}
                        onButtonPress={onSave}
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
                        title={'Emergency details updated successfully.'}
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

export default ViewEmergencyDetails;
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
