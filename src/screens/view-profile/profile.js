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

const EditProfile = ({ navigation }) => {
    const { getUserImage, user } = useUser();

    const [responses,setresponses]=useState('')
    const [data,setdata]=useState('')

    const [Fullname, onChangeName] = React.useState(responses?.name||'');      //getUserFullName()
    const [phone, onChangePhone] = React.useState(responses?.phone||'');            //getUserPhone()
    console.log("Phone",phone);
    const [address, onChangeAddress] = React.useState(
        responses?.address || '',
    );
    const [city, onChangeCity] = React.useState(responses?.city || '');
    const [state, onChangestate] = React.useState(
        user?.UserProfile?.state || '',
    );
    const [dob, onChangeDob] = React.useState(
        user?.UserProfile?.dateOfBirth || '',
    );

    const [gender, onChangegender] = useState(user?.UserProfile?.gender||'')
    const [status, onChangestatus] = useState("State"||'')
    const [startdate, onChangestartdate] = useState(user?.UserProfile?.startdate||'')
    const [enddate, onChangeenddate] = useState(user?.UserProfile?.enddate||'')
    const [taxfilenumber, onChangetaxfilenumber] = useState(user?.UserProfile?.taxfilenumber||'')
    const [taxfiledeclaration, onChangetaxfiledeclaration] = useState(user?.UserProfile?.taxfiledeclaration||'')
    const [taxscale, onChangetaxscale] = useState(user?.UserProfile?.taxscale||'')
    const [additionaltax, onChangeadditionaltax] = useState(user?.UserProfile?.additionaltax||'');
    const [country, onChangecountry] = useState(user?.UserProfile?.country||'');

    const [isPicker, setPicker] = useState(false);
    const [image, setImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isPopup, setPopup] = useState(false);

    const isFocused=useIsFocused()

    useEffect(() => {
        if(isFocused)
        {
            axios.get(
                "https://securitylinksapi.herokuapp.com/api/v1/employee/profile/135",
            ).then(res => {
                setresponses(res?.data?.employee)
                setdata(res?.data?.employee)
                onChangeName(res?.data?.employee?.name)
                onChangePhone(res?.data?.employee?.phone)
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


    const onClosePicker = () => setPicker(false);

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
                    {/* <TouchableOpacity
                        style={{ marginTop: 3, flexDirection: 'row' }}
                        onPress={() => setPicker(true)}
                    >
                        <View style={{ marginTop: 3 }}>
                            <EvilIcons name="pencil" size={17} color={colors.twoATwoD} />
                        </View>
                        <Text style={styles.changeProfileImgText}>
                            Change Profile Picture
                        </Text>
                    </TouchableOpacity> */}
                </View>
                <View style={{ marginTop: 15 }} />
                <TextInput
                    value={Fullname}
                    placeholder="Full Name"
                    editable={false}
                    style={styles.viewinput}
                    placeholderTextColor={colors.twoATwoD}
                />

                <Countryinput disabled={true} value={phone} />

                <TextInput
                    value={address}
                    placeholder="Address"
                    editable={false}
                    style={styles.viewinput}
                    placeholderTextColor={colors.twoATwoD}
                />

                <TextInput
                    value={city}
                    placeholder="City"
                    editable={false}
                    style={styles.viewinput}
                    placeholderTextColor={colors.twoATwoD}
                />
                <View style={styles.postalCodeWrapper}>

                    <Dropdowns ph={state?state:"State"} disable={true} />
                    <Dropdowns ph={country?country:'Country'} disable={true}/>

                </View>

                <View style={styles.postalCodeWrapper}>
                    <Dropdowns ph={gender?gender:'Gender'} disable={true}/>
                    <Dropdowns ph={status?status:'Status'} disable={true}/>
                </View>
                <View style={styles.postalCodeWrapper}>
                    <Dropdowns ph={startdate?startdate:'Start Date'} disable={true}/>
                    <Dropdowns ph={enddate?enddate:'End Date'} disable={true}/>
                </View>
                <TextInput
                    value={taxfilenumber}
                    placeholder="Tax File Number"
                    editable={false}
                    style={styles.viewinput}
                    placeholderTextColor={colors.twoATwoD}
                />

                <TextInput
                    value={taxfiledeclaration}
                    placeholder="Tax File Declaration"
                    editable={false}
                    style={styles.viewinput}
                    placeholderTextColor={colors.twoATwoD}
                />

                <TextInput
                    value={taxscale}
                    placeholder="Tax Scale"
                    editable={false}
                    style={styles.viewinput}
                    placeholderTextColor={colors.twoATwoD}
                />

                <TextInput
                    value={additionaltax}
                    placeholder="Additional Tax"
                    editable={false}
                    style={styles.viewinput}
                    placeholderTextColor={colors.twoATwoD}
                />
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
                            navigation.navigate('ViewProfile');
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
