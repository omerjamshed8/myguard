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
import axios from 'axios';
import { useEffect } from 'react';

const ViewBankingDetails = ({ navigation }) => {

    const {getUserID}=useUser()
    const userID=getUserID()
    useEffect(() => {
        (async () => {
            let employeeResponse = await axios.get(`https://securitylinksapi.herokuapp.com/api/v1/employee/profile/${userID}`)
            console.log(1)
            if (employeeResponse.data.employee) {
                console.log(2)
                let employee = employeeResponse.data.employee
                setemployeeid(employee.id)
            } else {
                console.log(3)
            }
            console.log(4)
        })()
    }, [])
    const [employeeId,setemployeeid]=useState('')
    const {  user } = useUser();
    const [bankname,setbankname]=useState(user?.UserProfile?.bankname||'');
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
    const [isLoading, setLoading] = useState(false);
    const [isPopup, setPopup] = useState(false);


    const onClosePicker = () => setPicker(false);

    const onSave = async () => {
        Keyboard.dismiss();
        if (validator.isEmpty(bankname)) {
            return showError('Bank name is required');
        }
        else if (!validator.isLength(bankname, 3, 50)) {
            return showError('Bank name should be between 3 to 50 alphabets');
        } else if (!validator.isAlpha(bankname,'en-US',{ignore:' '})) {
            return showError('Bank name should be in alphabetical format');
        }else if (!validator.isLength(accountname, 3, 50)) {
            return showError('Account name should be between 3 to 50 alphabets');
        }else if (!validator.isAlpha(accountname,'en-US',{ignore:' '})) {
            return showError('The account name should be in alphabetical format');
        } else if (validator.isEmpty(BSB)) {
            return showError('BSB is required');
        } else if (!validator.isNumeric(BSB)) {
            return showError("BSB should be in numeric form")
        }
        else if (!validator.isLength(BSB, 4, 10)) {
            return showError("BSB should be between 4 to 10 digits")
        } else if (validator.isEmpty(accountnumber)) {
            return showError('Account number is required');
        } else if (!validator.isNumeric(accountnumber)) {
            return showError("Account number should be in numeric form")
        }
        else if (!validator.isLength(accountnumber, 6, 30)) {
            return showError("Account number should be between 6 to 30 digits")
        }
        else
        {

            
            // let payload = {
                //     BSB,
                //     accountnumber,
                //     state,
                //     postalCode: postalcode,
                //     dateOfBirth: dob ? new Date(dob).toISOString() : '',
                //     countryCode: '+92',
                //     fullName: Fullname,
                //     accountname,
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
                    bankName:bankname,
                    accountName:accountname,
                    bsb:BSB,
                    accountNumber:accountnumber
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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ marginTop: "30%" }} />
                <CustomInput
                    value={bankname}
                    placeholder="Bank Name"
                    onChangeText={setbankname}
                />

                <CustomInput
                    value={accountname}
                    placeholder="Account Name"
                    onChangeText={onChangeaccountname}
                    // inputType={'phone'}
                    keyboardType="default"
                />

                <CustomInput
                    value={BSB}
                    placeholder="BSB"
                    onChangeText={onChangeBSB}
                    keyboardType={"numeric"}
                />
                <CustomInput
                    value={accountnumber}
                    placeholder="Account Number"
                    onChangeText={onChangeaccountnumber}
                    keyboardType={"numeric"}
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
                        title={'Banking details updated successfully.'}
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

export default ViewBankingDetails;
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
