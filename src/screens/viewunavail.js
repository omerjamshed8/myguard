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

const Context = createContext();
const ViewUnavail = ({ route, navigation }) => {

    const { props } = route.params;
    console.log("Props in ViewUnavail", props)
    console.log("props id", props.id)

    const { getUserFullName, getUserImage, getUserEmail, user } = useUser();
    const unavailCtx = useContext(UnavailContext)
    const [title, settitle] = useState(props?.title);
    const [type, settype] = useState(props?.type);
    const [note, setnote] = useState(props?.note);
    const [status, onChangestatus] = useState(props?.status)
    const [startdate, onChangestartdate] = useState(props?.startDate)
    const [enddate, onChangeenddate] = useState(props?.endDate)
    console.log("type::::::", type);
    console.log("status::::::", status);

    const arr = [title, type, status, note]

    const data = [
        { label: 'Pending', value: 1 },
        { label: 'Reject', value: 2 },
        { label: 'Approved', value: 3 },
    ];

    const types = [
        { label: 'casual', value: 1 },
        { label: 'annual', value: 2 },
        { label: 'sick', value: 3 },
    ]
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
                        editable={false}
                    />
                </View>
                <Text style={{ color: 'black', fontWeight: '500' }}>Type</Text>
                <View style={styles.postalCodeWrapper}>
                    <Dropdowns width={"200%"} disable={true} ph={'Select Type'} data={types} onchange={value => {
                        settype(value)
                    }} />
                </View>
                <Text style={{ color: 'black', fontWeight: '500' }}>Status</Text>
                <View style={styles.postalCodeWrapper}>
                    <Dropdowns width={"200%"} disable={true} ph={'Select Status'} data={data} onchange={value => {
                        onChangestatus(value)
                    }} />
                </View>
                <View style={{ flexDirection: 'row', marginBottom: -10, marginTop: 20 }}>
                    <Text style={{ color: Colors.twoATwoD, fontWeight: '500' }}>Start Date</Text>
                    <Text style={{ color: Colors.twoATwoD, fontWeight: '500', marginLeft: '35%' }}>End Date</Text>
                </View>
                <View style={styles.postalCodeWrapper}>
                    <DatePick width={"90%"} fontsize={12} open={false} onChange={date => {
                        onChangestartdate(date)
                    }} />
                    <DatePick width={"90%"} fontsize={12} open={false} onChange={date => {
                        onChangeenddate(date)
                    }} />
                </View>
                <Text style={{ color: Colors.twoATwoD, fontWeight: '500', marginTop: 12 }}>Note</Text>
                <TextInput
                    value={note}
                    style={styles.inputs}
                    placeholder="Type here..."
                    onChangeText={setnote}
                    placeholderTextColor={'black'}
                    multiline={true}
                    numberOfLines={4}
                    editable={false}
                />
                <View>
                </View>
            </ScrollView>
        </Screen>
    );
};

export default ViewUnavail;
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
