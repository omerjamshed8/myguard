import React, { useEffect, useState } from 'react';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors, Fonts, Images } from 'theme';
import Dropdowns from './view-profile/dropdownpicker';
import ImageUploadd from './imageuploader';
import axios from 'axios';

function ViewIncident({ route, navigation }) {

  const { props } = route.params;
  console.log("Props in ViewIncident", props)
  console.log("props id", props?.Customer?.name)

  const [customer, setcustomer] = useState();
  const [file, onchangeFile] = useState();
  const [video, onchangeVideo] = useState()
  const [isPopup, setPopup] = useState(false);
  console.log("video url got in incidentform", video)
  console.log("document url got in incidentform", file)
  console.log("file uri", file)
  console.log("video uri", video)
  console.log(customer)

  return (
    <SafeAreaView style={styles.splashView}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#2A2D43',margin:30,fontSize:15,fontWeight:'600'}}>New Incident</Text>
            </View> */}
        {/* Input Wrapper */}
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: '5%' }}>
          <View>
            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600' }}>Customer Name</Text>
            <Dropdowns disable={true} width={Dimensions.get('window').width - 40} ph={props?.Customer?.name} data={customer} />
            {/* <CustomInput
              value={names}
              placeholder="Name"
              onChangeText={onChangeName}
              placeholderTextColor={'black'}
            /> */}

            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600' }}>Select Site</Text>
            <View>
              <Dropdowns disable={true} width={Dimensions.get('window').width - 40} ph={props?.Site?.name} />
            </View>
            {/* <CustomInput
              value={entry}
              placeholder="Select Site"  //pehlay yahan Entry tha 
              onChangeText={onChangeentry}
              placeholderTextColor={'black'}
              inputType={'description'}
            /> */}

            {/* <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Submitted By</Text>
            <CustomInput
              value={submission}
              placeholder="Name"
              onChangeText={onChangeSubmission}
              placeholderTextColor={'black'}
            /> */}

            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600' }}>Form Name</Text>
            <CustomInput
              value={props?.formName}
              placeholder="Name"
              placeholderTextColor={'black'}
              editable={false}
            />

            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600' }}>Required Action</Text>
            <CustomInput
              value={props?.requiredAction}
              placeholder="Name"
              placeholderTextColor={'black'}
              editable={false}
            />

            {/* <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Required Action</Text>
            <CustomInput
              value={reqAction}
              placeholder="Name"
              onChangeText={onChangereqAction}
              placeholderTextColor={'black'}
            /> */}

            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600' }}>Description</Text>
            {/* <CustomInput
              value={desc}
              placeholder="Type here..."
              onChangeText={onChangedesc}
              placeholderTextColor={'black'}
              inputType={'multiline'}
            /> */}
            <TextInput
              value={props?.description}
              style={styles.inputs}
              placeholder="Type here..."
              placeholderTextColor={'black'}
              multiline={true}
              numberOfLines={4}
              editable={false}
            />
          </View>
        </View>
        <View>
          <Text>{'\n'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default ViewIncident;

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
});
