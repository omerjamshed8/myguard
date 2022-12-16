import React, { useState } from 'react';
import CustomButton from 'components/custom-button';
import CustomDOBInput from 'components/custom-dob-input';
import CustomInput from 'components/custom-input';
import Screen from 'components/screen';
import useUser from 'hooks/useUser';
import {Colors, Fonts, Images} from 'theme';
import {
    StyleSheet,
    View,
    Text,
    Image,
    ScrollView,
    TouchableOpacity,
    Keyboard,
    TextInput,
} from 'react-native';
import colors from 'theme/colors';
import fonts from 'theme/fonts';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CommonModal from 'components/common-modal';
import PickerPopup from 'components/picker-popup';
import { avatarUpload, getUserDetail, updateProfile } from 'services/auth';
import { showError, showSuccess } from 'utils/toast';
import validator from 'validator';
import ResetSuccess from 'components/reset-success';
import _ from 'lodash';
import DatePick from './view-profile/datepicker';
// import Countryinput from './dropdownphone';

const UnavailForm = ({ navigation }) => {
    const { getUserFullName, getUserImage, getUserEmail, user } = useUser();
    const [title,setitle]=useState();
    const [type,settype]=useState();
    const [note,setnote]=useState();
    const [status, onChangestatus] = useState(user?.UserProfile?.status)
    const [startdate, onChangestartdate] = useState(user?.UserProfile?.startdate)
    const [enddate, onChangeenddate] = useState(user?.UserProfile?.enddate)


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
        // else if (validator.isEmpty(phone)) {
        //   return showError('The phone number is required');
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
            address,
            city,
            state,
            postalCode: postalcode,
            dateOfBirth: dob ? new Date(dob).toISOString() : '',
            countryCode: '+92',
            fullName: Fullname,
            phone,
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
                <View style={{ alignItems: 'center', paddingTop: 20 }}>
                </View>
                <View style={{ marginTop: 15 }} />
                <View style={styles.postalCodeWrapper}>
                </View>
                <Text style={{color:'black',fontWeight:'500'}}>Title</Text>
                <View style={styles.postalCodeWrapper}>
                    <CustomInput
                        containerStyle={styles.inputsrow}
                        value={status}
                        placeholder="Add Title"
                        onChangeText={onChangestatus}
                    />
                </View>
                <Text style={{color:'black',fontWeight:'500'}}>Type</Text>
                <View style={styles.postalCodeWrapper}>
                    <CustomInput
                        containerStyle={styles.inputsrow}
                        value={type}
                        placeholder="Select Type"
                        onChangeText={settype}
                    />
                </View>
                <Text style={{color:'black',fontWeight:'500'}}>Status</Text>
                <View style={styles.postalCodeWrapper}>
                    <CustomInput
                        containerStyle={styles.inputsrow}
                        value={status}
                        placeholder="Select Status"
                        onChangeText={onChangestatus}
                    />
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{color: Colors.twoATwoD,fontWeight:'500'}}>Start Date</Text>
                    <Text style={{color: Colors.twoATwoD,fontWeight:'500',marginLeft:'35%'}}>End Date</Text>
                </View>
                <View style={styles.postalCodeWrapper}>
                    {/* <CustomInput
                        containerStyle={styles.inputrow}
                        value={startdate}
                        placeholder="Select Date"
                        onChangeText={onChangestartdate}
                    /> */}
                    <DatePick/>
                    <DatePick/>
                    {/* <CustomInput
                        containerStyle={styles.inputrow}
                        value={enddate}
                        placeholder="Select Date"
                        onChangeText={onChangeenddate}
                    /> */}

                    </View>
                    <Text style={{color: Colors.twoATwoD,fontWeight:'500'}}>Note</Text>
                    <TextInput
                    style={styles.inputs}
                    placeholder="Type here..."
                    onChangeText={setnote}
                    placeholderTextColor={'black'}
                    multiline={true}
                    numberOfLines={4}
                    />
                    <View>
                </View>

                <CustomButton
                    isLoading={isLoading}
                    // onButtonPress={onSave}
                    onButtonPress={onUpdateProfile}
                    title={'Add'}
                    buttonWrapper={{ marginTop: 30 }}
                />
                <Text style={styles.cancelText} onPress={() => navigation.goBack()}>
                    Cancel
                </Text>
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

export default UnavailForm;
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
    inputsrow: {
        width: '100%',
    },
    inputs:{
        marginTop: 5,
    borderColor: Colors.twoATwoD,
    borderWidth: 2,
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 16,
    color: Colors.twoATwoD,
    fontFamily: Fonts.Poppins.Regular,
    fontSize: 14,
    }
});
