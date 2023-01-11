import React, { useEffect, useState } from 'react';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import { Colors, Fonts, Images } from 'theme';
import fonts from 'theme/fonts';
import colors from 'theme/colors';

import DocumentPicker from 'react-native-document-picker';

import {
    Text,
    View,
    StyleSheet,
    SafeAreaView,
    ScrollView,
    Image,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import DatePick from './view-profile/datepicker';
import DocUploader from './docuploader';
import axios from 'axios';
import validator from 'validator';
import { showError } from 'utils/toast';
import CommonModal from 'components/common-modal';
import ResetSuccess from 'components/reset-success';
// import {Colors, Fonts, Images} from 'theme';

function ViewDocument({ route, navigation }) {
    useEffect(() => {
        setfile([])
        setpressed(false)
    }, []);
    const { props } = route.params;
    console.log("Props in EditDocument", props)
    console.log("props id", props)

    const [names, onChangeName] = React.useState(props.Document.name);
    const [entry, onChangeentry] = React.useState(props.Document.type ? props.Document.type : '');
    const [note, setnote] = useState(props.Document.note);
    const [file, setfile] = useState([]);
    const [pressed, setpressed] = useState(false)
    const [date, setdate] = useState(props.Document.expiryDate ? props.Document.expiryDate : '')

    console.log("DDDDDAAAATTTTEEEEE", date)
    console.log("Document type in edit document", props.Document.type)

    console.log(pressed)
    console.log("response file", file[0]?.uri)
    console.log(props.id)

    let createdat;

    const dateconverter = (date) => {
        createdat = new Date(date)
        newdate = createdat.getFullYear() + '/' + (createdat.getMonth() + 1) + '/' + createdat.getDate()
        return newdate
    }

    return (
        <SafeAreaView style={styles.splashView}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={{ color: '#2A2D43', marginTop: 20, fontSize: 15, fontWeight: '600' }}>New Incident</Text>
                </View>
                <View style={{ flex: 1, paddingHorizontal: 30, marginTop: "15%" }}>
                    <View>
                        <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600',marginTop:10,marginBottom:-10 }}>Document Name</Text>
                        <CustomInput
                            value={names}
                            placeholder="Name"
                            onChangeText={onChangeName}
                            placeholderTextColor={'black'}
                            editable={false}
                        />

                        <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600',marginTop:10,marginBottom:-10 }}>Document Type</Text>
                        <CustomInput
                            value={entry}
                            placeholder="Licence,cnic,etc"  //pehlay yahan Entry tha 
                            onChangeText={onChangeentry}
                            placeholderTextColor={'black'}
                            inputType={'description'}
                            editable={false}
                        />

                        <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600',marginTop:10,marginBottom:-10 }}>Expiry Date</Text>
                        <DatePick width={"100%"} date={dateconverter(props?.Document?.expiryDate)} onChange={(date) => {
                            setdate(date)
                        }} />

                        <Text style={{ color: Colors.twoATwoD, fontWeight: '500',marginTop:10 }}>Note</Text>
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
                    </View>

                </View>

                {
                    file != '' ?
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Text>{'\n'}</Text>
                            <Image source={require('../assets1/images/PDF.png')} style={{ height: 60, width: 40 }} />
                            <Text style={{ color: 'black' }}>{file[0].name}</Text>
                        </View> : null
                }

                {/* {
                    succed === false ?
                        <>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderRadius: 2 }}>
                                    <TouchableOpacity onPress={handleUpload}><Image source={require('../assets/images/icon69.png')} style={{ height: 100, width: 130 }} /></TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <CustomButton
                                    buttonWrapper={styles.profileButton}
                                    title={'Save Changes'}
                                    onButtonPress={() => { setpressed(true); presshandler() }}
                                />
                                <Text style={styles.cancelText} onPress={() => { navigation.goBack(); setfile('') }}>
                                    Cancel
                                </Text>
                            </View>
                        </> : null
                }

                <CommonModal
                    isVisible={isPopup}
                    component={
                        <ResetSuccess
                            title={'Document edited successfully.'}
                            onDone={() => {
                                setPopup(false);
                                navigation.goBack();
                            }}
                        />
                    }
                /> */}

                <View>
                    <Text>{'\n'}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ViewDocument;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    splashView: {
        flex: 1,
    },
    splashText: {
        fontSize: 30,
        color: 'black',
        fontWeight: 'bold',
    },
    input: {
        borderColor: '#7A7C8A',
        borderWidth: 2,
        width: 320,
        borderRadius: 10,

        paddingLeft: 20,
        color: 'black',
        margin: 10,
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
    },
    splashTextInput: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        margin: 10,
    },
    appButtonContainer: {
        borderColor: 'black',
        color: 'green',
        elevation: 8,
        backgroundColor: '#F2385F',
        borderRadius: 10,
        padding: 10,
        marginTop: 12,
        marginLeft: 10,
        justifyContent: 'center',
        width: 320,
        alignItems: 'center',
    },
    appButtonText: {
        fontSize: 18,
        color: 'grey',
        fontWeight: 'bold',
        alignItems: 'center',

        color: 'white',
    },
    tex: {
        color: Colors.twoATwoD,
        fontFamily: Fonts.Poppins.Regular,
        fontSize: 12,
    },
    splashTextInputrow: {
        fontSize: 15,
        color: 'black',
        fontWeight: 'bold',
        margin: 10,
        width: 50,
    },
    inputrow: {
        width: '48%',
    },
    editWrapper: {
        flexDirection: 'row',
        marginTop: 10,
        alignItems: 'center',
        marginLeft: 10,
    },
    pencilIcon: {
        height: 11,
        width: 11,
        marginRight: 2,
    },
    contentContainer: {
        flexGrow: 1,
    },
    postalCodeWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    profileButton: {
        width: '85%',
    },
    skipText: {
        alignSelf: 'center',
        color: Colors.black,
        marginTop: 20,
        fontFamily: Fonts.Poppins.Regular,
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
    },
    cancelText: {
        fontSize: 16,
        fontFamily: fonts.Poppins.Regular,
        color: colors.twoATwoD,
        textAlign: 'center',
        marginVertical: 13,
    },
});
