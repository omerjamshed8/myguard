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

function EditDocument({ route, navigation }) {
    useEffect(() => {
        setfile([])
        setpressed(false)
    }, []);
    const { props } = route.params;
    console.log("Props in EditDocument", props)
    console.log("props id", props)

    const dateconverter = (date) => {
        createdat = new Date(date)
        var month = createdat.toLocaleString('default', { month: 'short' });
        newdate=createdat.getFullYear() + '-' + month + '-' + createdat.getDate()          //createdat.getMonth() + 1
        return newdate
    }

    const [text, onChangeText] = React.useState('Full Name');
    const [names, onChangeName] = React.useState(props.Document.name);
    const [entry, onChangeentry] = React.useState(props.Document.type ? props.Document.type : '');
    const [submission, onChangeSubmission] = React.useState('');
    const [fname, onChangefname] = React.useState('');
    const [reqaction, onChangereqaction] = React.useState('');
    const [reqAction, onChangereqAction] = React.useState('');
    const [desc, onChangedesc] = React.useState(null);
    const [note, setnote] = useState(props?.Document?.note);
    const [file, setfile] = useState([]);
    const [pressed, setpressed] = useState(false)
    const [date, setdate] = useState(props.Document.expiryDate ? dateconverter(props.Document.expiryDate) : '')
    const [succed, setsucced] = useState(false)
    const [isPopup, setPopup] = useState(false);


    console.log(pressed)
    console.log("response file", file[0]?.uri)
    //   const clickhandler = () => {
    //     navigation.navigate('CreateEmployee');
    //   };


    const presshandler = () => {
        if (validator.isEmpty(names)) {
            return showError("Name field is required")
        }
        else if (!validator.isAlpha(names,'en-US',{ignore:' '})) {
            return showError("name should be in alphabets")
          }
          else if (!validator.isLength(names, 3, 20)) {
            return showError("name should be between 3 to 20 characters")
          }
        else if (validator.isEmpty(entry)) {
            return showError("Document type is required")
        }  else if (!validator.isAlpha(entry,'en-US',{ignore:' '})) {
            return showError("Document type should be in alphabetical form")
        }   
        else if (validator.isEmpty(date)) {
            return showError("Date is required")
        }
        else if (validator.isEmpty(note)) {
            return showError("Note is required")
        }
        // else if (validator.isEmpty(file[0]?.uri)) {
        //     return showError("File is required");
        // }
        else {
            setsucced(true)
            axios.put(
                `https://securitylinksapi.herokuapp.com/api/v1/employee/${props.employeeId}/docs/${props.id}`,
                {
                    name: names,
                    type: entry,
                    expiryDate: date,
                    note: note,
                    url: file.uri||''

                }
            ).then(res => {
                if (res?.status === 200) {
                    setPopup(true)
                  }
                console.log('updated successfully')
                console.log(res)
            }).catch(e => {
                console.log('error')
                console.log(e.response.data)
            })
        }
    }

    const handleUpload = async () => {
        try {
            const res = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.allFiles],
            });
            for (const respons of res) {
                console.log('res: ' + JSON.stringify(respons));
                console.log('URI ' + respons.uri);
                console.log('Type ' + respons.type);
                console.log('File name ' + respons.name)
                console.log('File Size ' + respons.size)
            }
            setfile(res)

        } catch (error) {
            if (DocumentPicker.isCancel(error)) {
                alert('User cancelled document picker')
            } else {
                alert('Unknown error:' + JSON.stringify(error));
                throw error;
            }
        }
        
    }
    return (
        <SafeAreaView style={styles.splashView}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={styles.contentContainer}>

                <View style={{alignItems:'center'}}>
                <Text style={{color:'#2A2D43',marginTop:30,fontSize:15,fontWeight:'600'}}>New Incident</Text>
            </View>
                {/* Input Wrapper */}
                <View style={{ flex: 1, paddingHorizontal: 30, marginTop: "10%" }}>
                    <View>
                        <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600',marginTop:10,marginBottom:-10 }}>Document Name</Text>
                        <CustomInput
                            value={names}
                            placeholder="Name"
                            onChangeText={onChangeName}
                            placeholderTextColor={'black'}
                        />

                        <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600',marginTop:10,marginBottom:-10 }}>Document Type</Text>
                        <CustomInput
                            value={entry}
                            placeholder="Licence,cnic,etc"  //pehlay yahan Entry tha 
                            onChangeText={onChangeentry}
                            placeholderTextColor={'black'}
                            inputType={'description'}
                        />

                        {/* <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Submitted By</Text>
            <CustomInput
              value={submission}
              placeholder="Name"
              onChangeText={onChangeSubmission}
              placeholderTextColor={'black'}
            /> */}

                        <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600',marginTop:10,marginBottom:-10 }}>Expiry Date</Text>
                        <DatePick date={date?date:dateconverter(props.Document.expiryDate)} width={"100%"} open={true} calendarbgcolor={"#FFFFFF"} onChange={(date) => {
                            setdate(date)
                        }} />
                        {/* <CustomInput
              value={fname}
              placeholder="Select Date"
              onChangeText={onChangefname}
              placeholderTextColor={'black'}
            /> */}

                        <Text style={{ color: Colors.twoATwoD, fontWeight: '500',marginTop:10 }}>Note</Text>
                        <TextInput
                            value={note}
                            style={styles.inputs}
                            placeholder="Type here..."
                            onChangeText={setnote}
                            placeholderTextColor={'black'}
                            multiline={true}
                            numberOfLines={4}
                        />

                        {/* <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Required Action</Text>
            <CustomInput
              value={reqAction}
              placeholder="Name"
              onChangeText={onChangereqAction}
              placeholderTextColor={'black'}
            /> */}
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

                {
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
                />

                <View>
                    <Text>{'\n'}</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default EditDocument;

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
