import React, { createContext, useState } from 'react';
import CustomButton from 'components/custom-button';
import CustomDOBInput from 'components/custom-dob-input';
import CustomInput from 'components/custom-input';
import Screen from 'components/screen';
import useUser from 'hooks/useUser';
import { Colors, Fonts, Images } from 'theme';
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
import UnavailabilityCard from './cardcomponent/unavailabilitycard';
import { useContext } from 'react';
import { UnavailContext } from 'contexts/UnavailContext';
// import Countryinput from './dropdownphone';
import Axios from 'axios';
import Dropdowns from './view-profile/dropdownpicker';
import { useEffect } from 'react';
import axios from 'axios';

const Context = createContext();
const UnavailForm = ({ navigation }) => {
    const { getUserFullName, getUserImage, getUserEmail,getUserID, getEmployeeId, user } = useUser();
    const unavailCtx = useContext(UnavailContext)
    const [title, settitle] = useState('');
    const [type, settype] = useState('');
    const [note, setnote] = useState('');
    const [status, onChangestatus] = useState('')
    const [startdate, onChangestartdate] = useState('')
    const [enddate, onChangeenddate] = useState('')
    console.log("type::::::", type);
    console.log("status::::::", status);
    let userID=getUserID()
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

    const [isPicker, setPicker] = useState(false);
    const [image, setImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isPopup, setPopup] = useState(false);
    const [empid, setemployeeid] = useState('')

    const arr = [title, type, status, note]

    const data = [
        { label: 'Pending', value: 1 },
        { label: 'Reject', value: 2 },
        { label: 'Approved', value: 3 },
    ]

    const types = [
        { label: 'casual', value: 1 },
        { label: 'annual', value: 2 },
        { label: 'sick', value: 3 },
    ]

    const onClosePicker = () => setPicker(false);

    const onUpdateProfile = async () => {
        if (validator.isEmpty(title)) {
            return showError("Title should not be empty")
        }
        else if (!validator.isAlpha(title)) {
            return showError("Title should be in alphabets")
        }
        else if (!validator.isLength(title, 3, 20)) {
            return showError("Title should be between 3 to 20 characters")
        }
        else if (validator.isEmpty(type)) {
            return showError("Type is required")
        }
        else if (validator.isEmpty(status)) {
            return showError("Status is required")
        }
        else if (validator.isEmpty(startdate)) {
            return showError("Start date is required")
        }
        else if (validator.isEmpty(enddate)) {
            return showError("End date is required")
        }
        else if (validator.isEmpty(note)) {
            return showError("Note is required")
        }
        else {
            console.log('*****************')
            console.log('clicked')
            //api k liye set data ka function use krna hai
            unavailCtx.add({
                title: title,
                note: note,
                type: type,
                status: status,
                startDate: startdate,
                endDate: enddate
            })
            console.log(title, note, type, status, startdate, enddate)

            console.log(startdate)


            Axios.post(
                `https://securitylinksapi.herokuapp.com/api/v1/employee/${empid}/unavails/create`,
                {
                    title: title,
                    type: type,
                    status: status,
                    note: note,
                    startDate: startdate,
                    endDate: enddate
                }
            ).then(res => {
                console.log('success')
                console.log(res)
                setPopup(true)
            }).catch(e => {
                console.log('error')
                console.log(e.response.data)
            })
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
                <Text style={{ color: 'black', fontWeight: '500' }}>Title</Text>
                <View style={styles.postalCodeWrapper}>
                    <CustomInput
                        containerStyle={styles.inputsrow}
                        value={title}
                        placeholder="Add Title"
                        onChangeText={settitle}
                    />
                </View>
                <Text style={{ color: 'black', fontWeight: '500' }}>Type</Text>
                <View style={styles.postalCodeWrapper}>
                    <Dropdowns width={"200%"} ph={'Select Type'} data={types} onchange={value => {
                        settype(value)
                    }} />
                </View>
                <Text style={{ color: 'black', fontWeight: '500' }}>Status</Text>
                <View style={styles.postalCodeWrapper}>
                    <Dropdowns width={"200%"} ph={'Select Status'} data={data} onchange={value => {
                        onChangestatus(value)
                    }} />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: -10, marginTop: 20 }}>
                    <Text style={{ color: Colors.twoATwoD, fontWeight: '500' }}>Start Date</Text>
                    <Text style={{ color: Colors.twoATwoD, fontWeight: '500', marginLeft: '35%' }}>End Date</Text>
                </View>
                <View style={styles.postalCodeWrapper}>
                    <DatePick open={true} width={"90%"} fontsize={12} onChange={date => {
                        onChangestartdate(date)
                    }} />
                    <DatePick open={true} width={"90%"} fontsize={12} onChange={date => {
                        onChangeenddate(date)
                    }} />

                </View>
                <Text style={{ color: Colors.twoATwoD, fontWeight: '500', marginTop: 12 }}>Note</Text>
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
                <Text style={styles.cancelText} onPress={() => navigation.navigate('Home')}>
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
                        title={'Unavailability added successfully.'}
                        onDone={() => {
                            setPopup(false);
                            navigation.navigate('Home');
                        }}
                    />
                }
            />
        </Screen>
    );
};

export default UnavailForm;
export { Context };

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
    inputs: {
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
