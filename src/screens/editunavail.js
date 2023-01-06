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
import Axios from 'axios';
import Dropdowns from './view-profile/dropdownpicker';
import axios from 'axios';
import { useEffect } from 'react';

const Context = createContext();
const EditUnavail = ({ route,navigation }) => {
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

    const {props}=route.params;
    console.log("Props in EditUnavail",props)
    console.log("props id",props.id)

    const { getUserFullName, getUserImage, getUserEmail, user } = useUser();
    const unavailCtx = useContext(UnavailContext)
    const [title, settitle] = useState(props?.title);
    const [type, settype] = useState(props?.type);
    const [note, setnote] = useState(props?.note);
    const [status, onChangestatus] = useState(props?.status)
    const [startdate, onChangestartdate] = useState(props?.startDate)
    const [enddate, onChangeenddate] = useState(props?.endDate)
    const [employeeid,setemployeeid]=useState('')
    console.log("type::::::",type);
    console.log("status::::::",status);

    const [isPicker, setPicker] = useState(false);
    const [image, setImage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [isPopup, setPopup] = useState(false);

    const arr = [title, type, status, note]

    const data=[
        {label: 'Pending', value: 1},
        {label: 'Reject', value: 2},
        {label: 'Approved', value: 3},
    ];

    const types=[
        {label: 'casual', value: 1},
        {label: 'annual', value: 2},
        {label: 'sick', value: 3},
    ]

    const onClosePicker = () => setPicker(false);

    const onUpdateProfile = async () => {

        if(validator.isEmpty(title))
        {
            return showError("Title field is required")
        }
        if(!validator.isAlpha(title,'en-US',{ignore:' '}))
        {
            return showError("Title should be in alphabets")
        }
        if(!validator.isLength(title,3,20))
        {
            return showError("Title should be between 3 to 20 characters")
        }
        if(validator.isEmpty(type))
        {
            return showError("Type field is required")
        }
        if(validator.isEmpty(startdate))
        {
            return showError("Start date is required")
        }
        if(validator.isEmpty(enddate))
        {
            return showError("End date is required")
        }
        if(validator.isEmpty(note))
        {
            return showError("Note is required")
        }
        if(!validator.isAlphanumeric(note,'en-US',{ignore:' ~!@#$%^&*()-_+={}[]|/\:;"<>,.?'}))
        {
            return showError("Note should be in alpha numeric form")
        }if(!validator.isLength(note,3,1000))
        {
            return showError("Note should be between 3 to 1000 alpha-numeric characters")
        }

        console.log('clicked')
        //api k liye set data ka function use krna hai
        unavailCtx.add({
            title,
            note,
            type,
            status,
            startdate,
            enddate
        })

        console.log(startdate)
        setPopup(true)
        Axios.put(
            `https://securitylinksapi.herokuapp.com/api/v1/employee/${employeeid}/unavails/${props.id}`,
            {
                title: title,
                type: type,
                status: status,
                note: note,
                startDate: startdate,
                endDate: enddate
            }
        ).then(res => {
            console.log('updated successfully')
            console.log(res)
        }).catch(e => {
            console.log('error')
            console.log(e.response.data)
        }) 
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
                <Dropdowns width={"200%"} ph={type?type:"Select Type"} data={types} initialtype={type} onchange={valuee => {
                        settype(valuee)
                }}/>
                </View>
                <Text style={{ color: 'black', fontWeight: '500' }}>Status</Text>
                <View style={styles.postalCodeWrapper}>
                   <Dropdowns width={"200%"} ph={status?status:"Status"} disable={true} initialtype={status} data={data} onchange={valueee => {
                        onChangestatus(valueee)
                   }}/>
                </View>
                <View style={{ flexDirection: 'row',marginBottom:-10,marginTop:20}}>
                    <Text style={{ color: Colors.twoATwoD, fontWeight: '500' }}>Start Date</Text>
                    <Text style={{ color: Colors.twoATwoD, fontWeight: '500', marginLeft: '35%' }}>End Date</Text>
                </View>
                <View style={styles.postalCodeWrapper}>
                    <DatePick width={"90%"} fontsize={12} open={true} date={startdate?startdate:props?.startDate} onChange={date => {
                        onChangestartdate(date)
                    }} />
                    <DatePick width={"90%"} fontsize={12} date={enddate?enddate:props?.endDate} open={true} onChange={date => {
                        onChangeenddate(date)
                    }} />
                </View>
                <Text style={{ color: Colors.twoATwoD, fontWeight: '500',marginTop:12 }}>Note</Text>
                <TextInput
                    value={note}
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
                    title={'Save Changes'}
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
                        title={'Unavailability edited successfully.'}
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

export default EditUnavail;
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
