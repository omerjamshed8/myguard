import React, { useState } from 'react';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import Screen from 'components/screen';
import useUser from 'hooks/useUser';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
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
import Dropdowns from './dropdownpicker';
import { useEffect } from 'react';
import axios from 'axios';
import Countries from 'assets1/countries';

const EmergencyDetails = ({ edit, navigation }) => {
    const { user, getUserID } = useUser();
    const userID = getUserID()
    const [emergencydetails, setemergencydetails] = useState(user?.UserProfile?.emergencydetails);
    const [emergencynumber, onChangeemergencynumber] = React.useState('');
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
    // const [dob, onChangeDob] = React.useState(
    //     user?.UserProfile?.dateOfBirth || '',
    // );

    const [country, onChangecountry] = useState(user?.UserProfile?.country);
    const [isPicker, setPicker] = useState(false);
    const [image, setImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isPopup, setPopup] = useState(false);

    const [responses, setresponses] = useState()
    const [data, setdata] = useState()

    const [employeeId, setemployeeid] = useState('')

    const onClosePicker = () => setPicker(false);

    useEffect(() => {
        axios.get(
            `https://securitylinksapi.herokuapp.com/api/v1/employee/profile/${userID}`,
        ).then(res => {
            // console.log('successfully get response in profilejs of view-profile')
            // console.log("!!!!!!!!!>>>>>>>>>", res?.data?.employee)
            setresponses(res?.data?.employee)
            setemployeeid(res?.data?.employee?.id)
            setdata(res?.data?.employee)
            setemergencydetails(res?.data?.employee?.EmployeeHrDetail?.emergencyDetails)
            onChangeemergencynumber(res?.data?.employee?.EmployeeHrDetail?.emergencyNumber)
            // console.log("Location*******",res?.data?.employee?.Location);
            onChangeAddress(res?.data?.employee?.Location?.address)
            onChangeCity(res?.data?.employee?.Location?.city)
            onChangePostalcode(res?.data?.employee?.Location?.postalCode)
            onChangestate(res?.data?.employee?.Location?.state)
            onChangecountry(res?.data?.employee?.Location?.country)
        }).catch(e => {
            console.log('error fetching data from profile api')
            console.log(e.response.data)
        })
    }, [])

    const countries = Countries.map((item, index) => { return { label: item.country, value: index.toString() } })
    const selectedCountry = Countries.find(item => item.country === country)
    console.log('selectedCountry')
    console.log(selectedCountry)
    let states = []
    if (selectedCountry) {
        states = selectedCountry.states.map((state, index) => ({ label: state, value: index.toString() }))
    }

    const onSave = async () => {
        Keyboard.dismiss();
        if (validator.isEmpty(emergencydetails)) {
            return showError('Emergency Details is required');
        } else if (!validator.isAlpha(emergencydetails, 'en-US', { ignore: '' })) {
            return showError('The emergency details should be in alphabetical format');
        } else if (!validator.isLength(emergencydetails, 3, 50)) {
            return showError('The emergency details should be between 3 to 50 alphabets');
        } else if (!validator.isLength(emergencynumber, 7, 15)) {
            return showError('The emergency number should be between 7 to 15 digits');
        } else if (!validator.isNumeric(emergencynumber)) {
            return showError('The emergency number should be in numerical format');
        } else if (validator.isEmpty(address)) {
            return showError('The address is required');
        } else if (!validator.isAlphanumeric(address, 'en-US', { ignore: ' ,-#' })) {
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
            `https://securitylinksapi.herokuapp.com/api/v1/employee/profile/${employeeId}`,
            {
                emergencyDetails: emergencydetails,
                emergencyNumber: emergencynumber,
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
    // const onSave = async () => {
    //     Keyboard.dismiss();
    //     if (validator.isEmpty(Fullname)) {
    //         return showError('The full name is required');
    //     }
    //     // else if (validator.isEmpty(emergencynumber)) {
    //     //   return showError('The emergencynumber number is required');
    //     // } else if (validator.isEmpty(address)) {
    //     //   return showError('The address is required');
    //     // } else if (validator.isEmpty(city)) {
    //     //   return showError('The city is required');
    //     // } else if (validator.isEmpty(state)) {
    //     //   return showError('The state is required');
    //     // } else if (validator.isEmpty(postalcode)) {
    //     //   return showError('The postalcode is required');
    //     // }  else if (validator.isEmpty(dob)) {
    //     //   return showError('The date of birth is required');
    //     // }

    //     let payload = {
    //         address,
    //         city,
    //         state,
    //         postalCode: postalcode,
    //         dateOfBirth: dob ? new Date(dob).toISOString() : '',
    //         countryCode: '+92',
    //         fullName: Fullname,
    //         emergencynumber,
    //     };
    //     setLoading(true);
    //     try {
    //         const response = await updateProfile(payload);

    //         if (response?.success) {
    //             getUserDetail();
    //             setPopup(true);
    //             // navigation.goBack();
    //             // showSuccess('User profile updated successfully.');
    //         }
    //         setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //     }
    // };

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
            <ScrollView showsVerticalScrollIndicator={false}> 
                <View style={{ marginTop: "30%" }} />
                <TextInput
                    value={emergencydetails}
                    placeholder="Emergency Details"
                    editable={edit}
                    onChangeText={setemergencydetails}
                    style={styles.viewinput}
                    placeholderTextColor={colors.twoATwoD}
                />

                <TextInput
                    value={emergencynumber}
                    placeholder="Emergency Number"
                    editable={edit}
                    onChangeText={onChangeemergencynumber}
                    style={styles.viewinput}
                    placeholderTextColor={colors.twoATwoD}
                />

                <TextInput
                    value={address}
                    placeholder="Address"
                    editable={edit}
                    onChangeText={onChangeAddress}
                    style={styles.viewinput}
                    placeholderTextColor={colors.twoATwoD}
                />

                <View style={styles.postalCodeWrapper}>
                    <Dropdowns ph={country ? country : 'Country'} data={countries} disable={!edit} onchange={(statee) => {
                        onChangecountry(statee)
                    }} />
                    <Dropdowns ph={state ? state : 'State'} data={states} disable={!edit} onchange={(countryy) => {
                        onChangestate(countryy)
                    }} />
                </View>
                <View style={styles.postalCodeWrapper}>
                    <TextInput
                        value={city}
                        placeholder="City"
                        editable={edit}
                        onChangeText={onChangeCity}
                        style={[styles.viewinput, { width: "50%", height: "70%" }]}
                        placeholderTextColor={colors.twoATwoD}
                    />
                    <TextInput
                        value={postalcode}
                        placeholder="Zip/Postal Code"
                        editable={edit}
                        onChangeText={onChangePostalcode}
                        style={[styles.viewinput, { width: "48%", height: "70%" }]}
                        placeholderTextColor={colors.twoATwoD}
                    />
                </View>

                {
                    edit === true
                        ?
                        <>
                            <CustomButton
                                isLoading={isLoading}
                                // onButtonPress={onSave}
                                onButtonPress={onSave}
                                title={'Save Changes'}
                                buttonWrapper={{ marginTop: 30 }}
                            />
                            <Text style={styles.cancelText} onPress={() => navigation.goBack()}>
                                Cancel
                            </Text>
                        </> : null
                }
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

export default EmergencyDetails;
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
    viewinput: {
        width: '100%',
        color: colors.twoATwoD,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.twoATwoD,
        fontFamily: fonts.Poppins.Regular,
        marginVertical: 10,
        height: "10%",
        paddingLeft: "5%",
    }
});
