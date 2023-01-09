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
    Alert,
} from 'react-native';
import colors from 'theme/colors';
import fonts from 'theme/fonts';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import CommonModal from 'components/common-modal';
import PickerPopup from 'components/picker-popup';
import { avatarUpload, updateProfile } from 'services/auth';
import { showError, showSuccess } from 'utils/toast';
import validator from 'validator';
import ResetSuccess from 'components/reset-success';
import _ from 'lodash';
import Countryinput from './dropdownphone';
import Dropdowns from './dropdownpicker';
import { TextInput } from 'react-native-gesture-handler';
import { useEffect } from 'react';
import axios from 'axios';
import { useIsFocused } from '@react-navigation/native';
import Countries from 'assets1/countries';

const EditProfile = ({ edit,navigation }) => {
    // const {edit}=route.params
    // Alert.alert("Edit value",`edit value: ${edit}`)
    console.log("Edit value is", edit);

    const { getUserImage, user } = useUser();

    const [responses, setresponses] = useState('')
    const [data, setdata] = useState('')

    const [Fullname, onChangeName] = React.useState(responses?.name || '');      //getUserFullName()
    const [phone, onChangePhone] = React.useState(responses?.phone?responses.phone:'');            //getUserPhone()
    const [number, onChangenumber] = useState('')
    console.log("Phone", phone);
    const [address, onChangeAddress] = React.useState(
        responses?.address || '',
    );
    const [city, onChangeCity] = React.useState(responses?.city || '');
    const [state, onChangestate] = React.useState('');
    const [dob, onChangeDob] = React.useState('');

    const {getUserID}=useUser()
    const userID=getUserID();

    const [gender, onChangegender] = useState('')
    const [status, onChangestatus] = useState('')
    const [startdate, onChangestartdate] = useState('')
    const [enddate, onChangeenddate] = useState('')
    const [taxfilenumber, onChangetaxfilenumber] = useState('')
    const [taxfiledeclaration, onChangetaxfiledeclaration] = useState('')
    const [taxscale, onChangetaxscale] = useState('')
    const [additionaltax, onChangeadditionaltax] = useState('');
    const [country, onChangecountry] = useState('');

    const [isPicker, setPicker] = useState(false);
    const [image, setImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isPopup, setPopup] = useState(false);

    const [employeeId,setemployeeid]=useState('')

    const isFocused = useIsFocused()

    useEffect(() => {
        if (isFocused) {
            axios.get(
                `https://securitylinksapi.herokuapp.com/api/v1/employee/profile/${userID}`,
            ).then(res => {
                setresponses(res?.data?.employee)
                setemployeeid(res?.data?.employee?.id)
                setdata(res?.data?.employee)
                onChangeName(res?.data?.employee?.name)
                onChangePhone(res?.data?.employee?.phone)
                // console.log("******////////////////////////*****",res?.data?.employee?.phone);
                // console.log("Location*******",res?.data?.employee?.Location);
                onChangeAddress(res?.data?.employee?.Location?.address)
                onChangeCity(res?.data?.employee?.Location?.city)
                onChangeadditionaltax((res?.data?.employee?.EmployeeHrDetail?.additionalTax))
                onChangetaxfiledeclaration((res?.data?.employee?.EmployeeHrDetail?.taxDecFileUrl))
                onChangetaxfilenumber((res?.data?.employee?.EmployeeHrDetail?.taxFileNumber))
                onChangetaxscale((res?.data?.employee?.EmployeeHrDetail?.taxScale))
                onChangestate(res?.data?.employee?.Location?.state)
                onChangecountry(res?.data?.employee?.Location?.country)
                onChangegender(res?.data?.employee?.gender)
                onChangestatus(res?.data?.employee?.status)
                onChangestartdate(res?.data?.employee?.EmployeeHrDetail?.startDate)
                onChangeenddate(res?.data?.employee?.EmployeeHrDetail?.endDate)
            }).catch(e => {
                console.log('error fetching data from profile api')
                console.log(e.response.data)
            })
        }
    }, [isFocused])

    const datas = [
        { label: 'Male', value: "1" },
        { label: 'Female', value: "2" },
        { label: 'other', value: "3" },
    ]

    const countries = Countries.map((item, index) => { return { label: item.country, value: index.toString() } })
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
    if (selectedCountry) {
        states = selectedCountry.states.map((state, index) => ({ label: state, value: index.toString() }))
    }
    console.log(states)

    const onClosePicker = () => setPicker(false);

    const onSave = async () => {
        Keyboard.dismiss();
        if (validator.isEmpty(Fullname)) {
            return showError('The full name is required');
        }
        if (!validator.isAlpha(Fullname, 'en-US', { ignore: " " })) {
            return showError("Name should be in alphabetical form")
        }
        if (!validator.isLength(Fullname, 3, 50)) {
            return showError("Form name should be between 3 to 50 alphabets")
        }
        if (validator.isEmpty(phone)) {
            return showError('The phone number is required');
        }
        if (!validator.isMobilePhone(phone)) {
            return showError('The phone number should be in correct format');
        }
        if (!validator.isLength(phone, 7, 15)) {
            return showError("Phone number should be between 7 to 15 digits")
        }
        if (validator.isEmpty(address)) {
            return showError('The address is required');
        }
        if (!validator.isAlphanumeric(address, 'en-US', { ignore: ' ' })) {
            return showError("Address should be in alpha numeric form")
        }
        if (!validator.isLength(address, 1, 100)) {
            return showError("Address should be between 1 to 100 alphabets")
        }
        if (validator.isEmpty(city)) {
            return showError('The city is required');
        }
        if (!validator.isAlpha(city)) {
            return showError("City should be in alphabetical form")
        }
        if (!validator.isLength(city, 3, 20)) {
            return showError("City should be between 3 to 20 alphabets")
        }
        if(validator.isEmpty(country))
        {
            return showError("Country is required")
        }
        if(validator.isEmpty(state))
        {
            return showError("state is required")
        }
        if(validator.isEmpty(gender))
        {
            return showError("Gender is required")
        }
        if (!validator.isNumeric(taxfilenumber)) {
            return showError('Tax file number should be numeric');
        }
        if (!validator.isLength(taxfilenumber, 4, 30)) {
            return showError("Tax file number should be between 4 to 30 digits")
        }
        if (!validator.isNumeric(taxfiledeclaration)) {
            return showError("Tax file declaration should be numeric")
        }
        if (!validator.isLength(taxfiledeclaration, 3, 20)) {
            return showError("Tax file declaration should be between 3 to 20")
        } 
        if (!validator.isNumeric(taxscale)) {
            return showError('Tax scale field should be numeric');
        }
        if (!validator.isLength(taxscale, 4, 30)) {
            return showError("Additional tax should be between 4 to 30 digits")
        }
        if (!validator.isNumeric(additionaltax)) {
            return showError('Additional tax field should be numeric');
        }
        if (!validator.isLength(additionaltax, 4, 30)) {
            return showError("Additional tax should be between 4 to 30 digits")
        }
        else {

            axios.put(
                `https://securitylinksapi.herokuapp.com/api/v1/employee/profile/${employeeId}`,
                {
                    address: address,
                    city: city,
                    state: state ? state : '',
                    dateOfBirth: dob ? new Date(dob).toISOString() : '',
                    name: Fullname,
                    phone: phone,
                    taxFileNumber: taxfilenumber ? taxfilenumber : '',
                    // avatar: image,
                    taxDecFileUrl: taxfiledeclaration ? taxfiledeclaration : '',
                    taxScale: taxscale ? taxscale : '',
                    additionalTax: additionaltax ? additionaltax : '',
                    country: country ? country : '',
                    gender: gender ? gender : ''
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
            // navigation.navigate('Home')
        };
        //  else if (validator.isEmpty(postalcode)) {
        //     return showError('The postalcode is required');
        // } else if (validator.isEmpty(dob)) {
        //     return showError('The date of birth is required');
        // }

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
            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{ alignItems: 'center', paddingTop: 20 }}>
                    <Image
                        style={styles.userImage}
                        resizeMode={'contain'}
                        source={image ? { uri: image?.uri } : getUserImage()}
                    //{uri: 'data:image/png;base64,' + image?.base64}
                    />
                    {
                        edit===true?
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
                    </TouchableOpacity>:null
                    }
                </View>
                <View style={{ marginTop: 15 }} />
                <TextInput
                    value={Fullname}
                    placeholder="Full Name"
                    editable={edit}
                    style={styles.viewinput}
                    onChangeText={onChangeName}
                    placeholderTextColor={colors.twoATwoD}
                />

                <Countryinput disabled={!edit} value={phone} onchange={(number) => {
                    onChangePhone(number)
                }}/>

                <TextInput
                    value={address}
                    placeholder="Address"
                    editable={edit}
                    style={styles.viewinput}
                    onChangeText={onChangeAddress}
                    placeholderTextColor={colors.twoATwoD}
                />

                <TextInput
                    value={city}
                    placeholder="City"
                    editable={edit}
                    style={styles.viewinput}
                    onChangeText={onChangeCity}
                    placeholderTextColor={colors.twoATwoD}
                />

                {
                    edit === false ?
                        <>
                            <View style={styles.postalCodeWrapper}>
                                <Dropdowns ph={state ? state : "State"} data={states} disable={true} />
                                <Dropdowns ph={country ? country : 'Country'} data={countries} disable={true} />

                            </View>

                            <View style={styles.postalCodeWrapper}>
                                <Dropdowns ph={gender ? gender : 'Gender'} disable={true} data={datas} onchange={(statee) => {
                                    onChangestate(statee)
                                }} />
                                <Dropdowns ph={status ? status : 'Status'} disable={true} onchange={(countryy) => {
                                    onChangecountry(countryy)
                                }} />
                            </View>

                            <View style={styles.postalCodeWrapper}>
                                <Dropdowns ph={startdate ? startdate : 'Start Date'} disable={true} />
                                <Dropdowns ph={enddate ? enddate : 'End Date'} disable={true} />
                            </View>
                        </>
                        :
                        <>
                            <View style={styles.postalCodeWrapper}>
                                <Dropdowns ph={state ? state : 'State'} data={states} onchange={(statee) => {
                                    onChangestate(statee)
                                }} />
                                <Dropdowns ph={selectedCountry ? selectedCountry.country : 'Country'} data={countries} onchange={(countryy) => {
                                    onChangecountry(countryy)
                                }} />
                            </View>
                            <View>
                                <Dropdowns ph={gender ? gender : 'Gender'} width={"200%"} data={datas} onchange={(gender) => {
                                    onChangegender(gender)
                                }} />
                            </View>
                        </>
                }

                <TextInput
                    value={taxfilenumber}
                    placeholder="Tax File Number"
                    editable={edit}
                    style={styles.viewinput}
                    onChangeText={onChangetaxfilenumber}
                    placeholderTextColor={colors.twoATwoD}
                />

                <TextInput
                    value={taxfiledeclaration}
                    placeholder="Tax File Declaration"
                    editable={edit}
                    style={styles.viewinput}
                    onChangeText={onChangetaxfiledeclaration}
                    placeholderTextColor={colors.twoATwoD}
                />

                <TextInput
                    value={taxscale}
                    placeholder="Tax Scale"
                    editable={edit}
                    style={styles.viewinput}
                    onChangeText={onChangetaxscale}
                    placeholderTextColor={colors.twoATwoD}
                />

                <TextInput
                    value={additionaltax}
                    placeholder="Additional Tax"
                    editable={edit}
                    style={styles.viewinput}
                    onChangeText={onChangeadditionaltax}
                    placeholderTextColor={colors.twoATwoD}
                />
                {
                    edit === true
                        ?
                        <>
                            <CustomButton
                                isLoading={isLoading}
                                // onButtonPress={onSave}
                                onButtonPress={onUpdateProfile}
                                title={'Save Changes'}
                                buttonWrapper={{ marginTop: 30 }}
                            />
                            <Text style={styles.cancelText} onPress={() => {
                                // navigation.navigate('Homer')
                                console.log('******************')
                                console.log(navigation)
                                console.log('******************')
                                navigation.goBack()
                            }}>
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
                        title={'User profile updated successfully.'}
                        onDone={() => {
                            setPopup(false);
                            navigation.goBack()
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
    viewinput: {
        width: '100%',
        color: colors.twoATwoD,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: colors.twoATwoD,
        fontFamily: fonts.Poppins.Regular,
        marginVertical: 10,
        height: "5%",
        paddingLeft: "5%",
    }
});
