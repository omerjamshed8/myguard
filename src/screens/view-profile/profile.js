import React, { useState } from 'react';
import CustomButton from 'components/custom-button';
import CustomDOBInput from 'components/custom-dob-input';
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
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CommonModal from 'components/common-modal';
import PickerPopup from 'components/picker-popup';
import { avatarUpload, getUserDetail, updateProfile } from 'services/auth';
import { showError, showSuccess } from 'utils/toast';
import validator from 'validator';
import ResetSuccess from 'components/reset-success';
import _ from 'lodash';
import Countryinput from './dropdownphone';
import Dropdowns from './dropdownpicker';

const EditProfile = ({ navigation,edit }) => {
    console.log(edit);
    const { getUserFullName, getUserImage, getUserEmail, user } = useUser();

    const [Fullname, onChangeName] = React.useState(getUserFullName());
    const [phone, onChangePhone] = React.useState(user?.UserProfile?.phone || '');
    const [address, onChangeAddress] = React.useState(
        user?.UserProfile?.address || '',
    );
    const [city, onChangeCity] = React.useState(user?.UserProfile?.city || '');
    const [state, onChangestate] = React.useState(
        user?.UserProfile?.state || '',
    );
    //   const [postalcode, onChangePostalcode] = React.useState(
    //     user?.UserProfile?.postalCode || '',
    //   );
    const [dob, onChangeDob] = React.useState(
        user?.UserProfile?.dateOfBirth || '',
    );

    const [gender, onChangegender] = useState(user?.UserProfile?.gender)
    const [status, onChangestatus] = useState(user?.UserProfile?.status)
    const [startdate, onChangestartdate] = useState(user?.UserProfile?.startdate)
    const [enddate, onChangeenddate] = useState(user?.UserProfile?.enddate)
    const [taxfilenumber, onChangetaxfilenumber] = useState(user?.UserProfile?.taxfilenumber)
    const [taxfiledeclaration, onChangetaxfiledeclaration] = useState(user?.UserProfile?.taxfiledeclaration)
    const [taxscale, onChangetaxscale] = useState(user?.UserProfile?.taxscale)
    const [additionaltax, onChangeadditionaltax] = useState(user?.UserProfile?.additionaltax);
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
            // postalCode: "123456",
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
                    <Image
                        style={styles.userImage}
                        resizeMode={'contain'}
                        source={image ? { uri: image?.uri } : getUserImage()}
                    //{uri: 'data:image/png;base64,' + image?.base64}
                    />
                    <TouchableOpacity
                        style={{ marginTop: 3, flexDirection: 'row' }}
                        onPress={() => setPicker(true)}
                    >
                        <View style={{ marginTop: 3 }}>
                            <EvilIcons name="pencil" size={17} color={colors.twoATwoD} />
                        </View>
                        <Text style={styles.changeProfileImgText}>
                            Change Profile Picture
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 15 }} />
                <CustomInput
                    value={Fullname}
                    placeholder="Full Name"
                    onChangeText={onChangeName}
                />

                <Countryinput/>

                {/* <CustomInput
                    value={phone}
                    placeholder="419 733 112"
                    onChangeText={onChangePhone}
                    inputType={'phone'}
                    keyboardType="number-pad"
                /> */}

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
                <View style={styles.postalCodeWrapper}>
                    {/* for state */}

                    <Dropdowns ph={'State'}/>
                    <Dropdowns ph={'Country'}/>

                    {/* <CustomInput
                        containerStyle={styles.inputrow}
                        value={country}
                        placeholder="Country"
                        onChangeText={onChangecountry}
                    /> */}
                </View>
                <View style={styles.postalCodeWrapper}>
                    <Dropdowns ph={'Gender'} />
                    <Dropdowns ph={'Status'}/>
                    {/* <CustomInput
                        containerStyle={styles.inputrow}
                        value={gender}
                        placeholder="Gender"
                        onChangeText={onChangegender}
                    />
                    <CustomInput
                        containerStyle={styles.inputrow}
                        value={status}
                        placeholder="Status"
                        onChangeText={onChangestatus}
                    /> */}
                </View>
                <View style={styles.postalCodeWrapper}>
                    <Dropdowns ph={'Start Date'}/>
                    <Dropdowns ph={'End Date'}/>
                    {/* <CustomInput
                        containerStyle={styles.inputrow}
                        value={startdate}
                        placeholder="Start Date"
                        onChangeText={onChangestartdate}
                    />

                    <CustomInput
                        containerStyle={styles.inputrow}
                        value={enddate}
                        placeholder="End Date"
                        onChangeText={onChangeenddate}
                    /> */}
                    </View>
                    <View>
                    <CustomInput
                        value={taxfilenumber}
                        placeholder="Tax File Number"
                        onChangeText={onChangetaxfilenumber}
                    />

                    <CustomInput
                        value={taxfiledeclaration}
                        placeholder="Tax File Declaration"
                        onChangeText={onChangetaxfiledeclaration}
                    />

                    <CustomInput
                        value={taxscale}
                        placeholder="Tax Scale"
                        onChangeText={onChangetaxscale}
                    />

                    <CustomInput
                        value={additionaltax}
                        placeholder="Additional Tax"
                        onChangeText={onChangeadditionaltax}
                    />

                    {/* for postal code */}
                </View>
                {/* <CustomDOBInput value={dob} onChange={date => onChangeDob(date)} /> */}

                <CustomButton
                    isLoading={isLoading}
                    // onButtonPress={onSave}
                    onButtonPress={onUpdateProfile}
                    title={'Save Changes'}
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

export default EditProfile;
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
