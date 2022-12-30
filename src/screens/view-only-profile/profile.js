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
import Countryinput from '../view-profile/dropdownphone';
import Dropdowns from '../view-profile/dropdownpicker';
import Countries from '../../assets1/countries'
import { value } from 'deprecated-react-native-prop-types/DeprecatedTextInputPropTypes';
import axios from 'axios';

const ViewEditProfile = ({ navigation, edit }) => {
    console.log(edit);
    const { getUserFullName, getUserImage, getUserEmail, user } = useUser();

    const [Fullname, onChangeName] = React.useState('');      ///getUserFullName()
    const [phone, onChangePhone] = React.useState(user?.UserProfile?.phone || '');
    const [address, onChangeAddress] = React.useState(
        user?.UserProfile?.address || '',
    );
    const [city, onChangeCity] = React.useState(user?.UserProfile?.city || '');
    const [state, onChangestate] = React.useState(
        user?.UserProfile?.state || '',
    );
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
    // const [countryval,setCountryval]=useState()
    // console.log("selectedcountry", country)

    const [isPicker, setPicker] = useState(false);
    const [image, setImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isPopup, setPopup] = useState(false);
    const [number, onChangenumber] = useState()
    console.log("number got in profile js", number);
    console.log("image", image);

    const data = [
        { label: 'Male', value: 1 },
        { label: 'Female', value: 2 },
        { label: 'other', value: 3 },
    ]

    const countries = Countries.map((item, index) => { return { label: item.country, value: index } })
    // countries.forEach(element => {
    //     console.log(element)
    // });

    // var states;
    // Countries.forEach(item=>{
    //     if(item.country===country)
    //     {
    //         for (let index = 0; index < item.states.length; index++) {
    //            states={label:item.states,value:index} 
    //         }
    //     }
    // })

    const selectedCountry = Countries.find(item => item.country === country)
    console.log('selectedCountry')
    console.log(selectedCountry)
    let states = []
    if(selectedCountry) {
        states = selectedCountry.states.map((state, index) => ({label: state, value: index.toString()}))
    }
    console.log(states)

    // const states = Countries.filter((item) => {
    //     if (item.country === country) {
    //         console.log(item)
    //         return item
    //     }
    // })
    // console.log(states)
    // console.log("************states****************");
    // states.forEach(element => {
    //     console.log(element)
    // });

    // const selstates = states.map((item, index) => { return { label: item.states, value: index } })
    // selstates.forEach(element => {
    //     console.log("selstate", element)
    // });

    const onClosePicker = () => setPicker(false);

    const onSave = async () => {
        Keyboard.dismiss();
        if (validator.isEmpty(Fullname)) {
            return showError('The full name is required');
        }
        else if (!validator.isAlpha(Fullname)) {
            return showError("Name should be in alphabetical form")
        }
        else if (!validator.isLength(Fullname, 3, 50)) {
            return showError("Form name should be between 3 to 50 alphabets")
        }
        else if (validator.isEmpty(phone)) {
            return showError('The phone number is required');
        }
        else if (validator.isMobilePhone(phone)) {
            return showError('The phone number is should be in correct format');
        } else if (!validator.isLength(phone, 7, 15)) {
            return showError("Phone number should be between 7 to 15 digits")
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
        else if (!validator.isLength(city, 3, 20)) {
            return showError("City should be between 3 to 20 alphabets")
        } else if (validator.isNumeric(taxfilenumber)) {
            return showError('Tax file number should be numeric');
        } else if (!validator.isLength(taxfilenumber, 4, 30)) {
            return showError("Tax file number should be between 4 to 30 digits")
        } else if (validator.isNumeric(additionaltax)) {
            return showError('Additional tax field should be numeric');
        } else if (!validator.isLength(taxfilenumber, 4, 30)) {
            return showError("Additional tax should be between 4 to 30 digits")
        } else if (validator.isEmpty(postalcode)) {
            return showError('The postalcode is required');
        } else if (validator.isEmpty(dob)) {
            return showError('The date of birth is required');
        }

        // let payload = {
        //     address:address,
        //     city:city,
        //     state,
        //     dateOfBirth: dob ? new Date(dob).toISOString() : '',
        //     countryCode: '+92',
        //     fullName: Fullname,
        //     phone:phone,
        //     taxFileNumber:taxfilenumber,
        //     avatar:image
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
        // const formData = new FormData();
        // formData.append("image", image);

        // axios.post('api/v1/userProfiles/updateAvatar', formData, {
        //     headers: {
        //         'Content-Type': 'multipart/form-data'
        //     }
        // }).then(res => {
        //     if (res?.status === 200) {
        //         setPopup(true)
        //     }
        //     console.log('updated successfully')
        //     console.log("***********", res?.image?.uri)
        //     console.log('success')
        //     // setImage(res?)
        // }).catch(e => {
        //     console.log('error while uploading image')
        //     console.log(e.response.data)
        // })

        else {

            axios.put(
                "https://securitylinksapi.herokuapp.com/api/v1/employee/profile/13",
                {
                    address: address,
                    city: city,
                    state: state,
                    dateOfBirth: dob ? new Date(dob).toISOString() : '',
                    name: Fullname,
                    phone: phone,
                    taxFileNumber: taxfilenumber,
                    avatar: image,
                    taxDecFileUrl: taxfiledeclaration,
                    taxScale: taxscale,
                    additionalTax: additionaltax
                }
            ).then(res => {
                if (res?.status === 200) {
                    setPopup(true)
                }
                console.log('updated successfully')
                console.log(res)
                console.log('success')
            }).catch(e => {
                console.log('error')
                console.log(e.response.data)
            })
        };
    }

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

                <Countryinput onchange={(number) => {
                    onChangenumber(number)
                }} />

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

                    <Dropdowns ph={'State'} data={states} onchange={(statee) => {
                        onChangestate(statee)
                    }} />
                    <Dropdowns ph={'Country'} data={countries} onchange={(countryy) => {
                        onChangecountry(countryy)
                    }} />
                </View>
                <View>
                    <Dropdowns ph={'Gender'} width={"200%"} data={data} />
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

export default ViewEditProfile;
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
