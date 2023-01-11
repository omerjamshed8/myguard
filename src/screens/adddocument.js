import React, { useContext, useEffect, useState } from 'react';
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
// import {Colors, Fonts, Images} from 'theme';
import axios from 'axios';
import CommonModal from 'components/common-modal';
import ResetSuccess from 'components/reset-success';
import { showError, showSuccess } from 'utils/toast';
import validator from 'validator';
import { DocsContext } from 'contexts/DocsContext';
import useUser from 'hooks/useUser';

function AddDocument({ navigation }) {

  const { getUserID } = useUser()
  const userID = getUserID()
  useEffect(() => {
    // setfile([])
    // setpressed(false)
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

  const [text, onChangeText] = React.useState('Full Name');
  const [names, onChangeName] = React.useState('');
  const [entry, onChangeentry] = React.useState('');
  const [submission, onChangeSubmission] = React.useState('');
  const [fname, onChangefname] = React.useState('');
  const [reqaction, onChangereqaction] = React.useState('');
  const [reqAction, onChangereqAction] = React.useState('');
  const [desc, onChangedesc] = React.useState('');
  const [note, setnote] = useState('');
  const [file, setfile] = useState([]);
  const [pressed, setpressed] = useState(false)
  const [date, setdate] = useState('')
  const [isPopup, setPopup] = useState(false);
  const [succed, setsucceed] = useState(false);
  const [empId, setemployeeid] = useState('')

  const docsCtx = useContext(DocsContext);

  console.log("DDDDDAAAATTTTEEEEE", date)

  console.log(pressed)
  console.log("resssss file", file)

  const clickhandler = () => {
    navigation.navigate('CreateEmployee');
  };


  const presshandler = () => {
    if (validator.isEmpty(names)) {
      console.log("in validator")
      return showError('Document name is required');
    }
    else if (!validator.isAlpha(names, 'en-US', { ignore: ' ' })) {
      return showError("Title should be in alphabets")
    }
    else if (!validator.isLength(names, 3, 20)) {
      return showError("Title should be between 3 to 20 characters")
    }
    else if (validator.isEmpty(entry)) {
      return showError("Document type is required")
    }
    else if (!validator.isAlpha(entry, 'en-US', { ignore: ' ' })) {
      return showError("Type should be in alphabets")
    }
    else if (!validator.isLength(entry, 3, 20)) {
      return showError("Type should be between 3 to 20 characters")
    }
    else {
      setsucceed(true)

      // let formData = new FormData();
      // formData.append('avatar', {
      //   name: file?.fileName,
      //   type: file?.type || 'image/jpeg',
      //   uri: file?.uri,
      // });

      // console.log('formData>>', formData);
      // return client
      //   .post('/api/v1/userProfiles/updateAvatar', formData, {
      //     headers: {
      //       // 'Content-Type': 'multipart/form-data',
      //       'Content-Type':
      //         'multipart/form-data; boundary=---------------------------9051914041544843365972754266',
      //     },
      //   })
      //   .then(res => res.data);
      // docsCtx.add({
      //   name: names,
      //   type: entry,
      //   note: note,
      //   expiryDate: date
      // })


      // const formData = new FormData();
      // formData.append("image", file);
      // axios.post('upload_file', formData, {
      //   headers: {
      //     'Content-Type': 'multipart/form-data'
      //   }
      // }).then(res=>{
      //   if (res?.status === 200) {
      //         setPopup(true)
      //       }
      //       console.log("success");
      // }).catch(err=>{
      //   console.log("error",err.response.data)
      // })

      // let fileData = new FormData();
      //       fileData.append("doc", file);

      //       let config = { headers: {
      //               'Content-Type': 'multipart/form-data'
      //           }}
      //       let url = 'https://securitylinksapi.herokuapp.com/api/v1/employee/docs/upload';

      //       axios.post(url, fileData,config)
      //           .then(function(response){
      //             console.log(response)
      //           })
      //           .catch(function(error){
      //             console.log(error)
      //           })

      axios.post(
        `https://securitylinksapi.herokuapp.com/api/v1/employee/${empId}/docs/create`,
        {
          name: names,
          type: entry,
          note: note,
          expiryDate: date
        }
      ).then(res => {
        if (res?.status === 200) {
          setPopup(true)
        }
        console.log('success')
        console.log(res)
      }).catch(e => {
        console.log('error')
        console.log(e.response.data)
      })
    }
  }

  console.log("Document context:::::::",docsCtx);

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

        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: '#2A2D43', marginTop: 20, fontSize: 15, fontWeight: '600' }}>New Incident</Text>
        </View>
        {/* Input Wrapper */}
        <View style={{ flex: 1, paddingHorizontal: 30, marginTop: "10%" }}>
          <View>
            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600', marginTop: 10, marginBottom: -10 }}>Document Name</Text>
            <CustomInput
              value={names}
              placeholder="Name"
              onChangeText={onChangeName}
              placeholderTextColor={'black'}
            />

            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600', marginTop: 10, marginBottom: -10 }}>Document Type</Text>
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

            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600', marginTop: 10, marginBottom: -10 }}>Expiry Date</Text>
            <DatePick width={"100%"} open={true} calendarbgcolor={"#FFFFFF"} onChange={(date) => {
              setdate(date)
            }} />
            {/* <CustomInput
              value={fname}
              placeholder="Select Date"
              onChangeText={onChangefname}
              placeholderTextColor={'black'}
            /> */}

            <Text style={{ color: Colors.twoATwoD, fontWeight: '500', marginTop: 10 }}>Note</Text>
            <TextInput
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

        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 20 }}>
          {
            file ? file.map((item, index) => (
              <View key={index} style={{ paddingHorizontal: 10, alignItems: "center" }} >
                <Image source={require('../assets1/images/PDF.png')} style={{ height: 60, width: 40 }} />
                <Text style={{ color: 'black', textAlign: "center" }}>{file[index].name}</Text>
              </View>
            )) : null
          }
        </View>

        {
          succed === false ? (
            <>
              <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                <View style={{ justifyContent: 'center', alignItems: 'center', margin: 10, borderColor: 'black', borderRadius: 2 }}>
                  <TouchableOpacity onPress={handleUpload}><Image source={require('../assets/images/icon69.png')} style={{ height: 100, width: 130 }} /></TouchableOpacity>
                </View>
              </View>
              <View>
                <CustomButton
                  buttonWrapper={styles.profileButton}
                  title={'Add Document'}
                  onButtonPress={() => { setpressed(true); presshandler() }}
                />
                <Text style={styles.cancelText} onPress={() => { setfile(''); navigation.goBack(); }}>
                  Cancel
                </Text>
              </View>
            </>) : (null)
        }

        <CommonModal
          isVisible={isPopup}
          component={
            <ResetSuccess
              title={'You have successfully submitted the document.'}
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

export default AddDocument;

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
