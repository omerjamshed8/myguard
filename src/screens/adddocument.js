import React,{useState} from 'react';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import {Colors, Fonts, Images} from 'theme';
import fonts from 'theme/fonts';
import colors from 'theme/colors';

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
// import {Colors, Fonts, Images} from 'theme';

function AddDocument({navigation}) {
  const [text, onChangeText] = React.useState('Full Name');
  const [names, onChangeName] = React.useState('');
  const [entry, onChangeentry] = React.useState('');
  const [submission, onChangeSubmission] = React.useState('');
  const [fname, onChangefname] = React.useState('');
  const [reqaction, onChangereqaction] = React.useState('');
  const [reqAction, onChangereqAction] = React.useState('');
  const [desc, onChangedesc] = React.useState(null);
  const [note,setnote]=useState();

  const clickhandler = () => {
    navigation.navigate('CreateEmployee');
  };

  return (
    <SafeAreaView style={styles.splashView}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>

            {/* <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#2A2D43',margin:30,fontSize:15,fontWeight:'600'}}>New Incident</Text>
            </View> */}
        {/* Input Wrapper */}
        <View style={{flex: 1, paddingHorizontal: 30,marginTop:"20%"}}>
          <View>
            <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Document Name</Text>
            <CustomInput
              value={names}
              placeholder="Name"
              onChangeText={onChangeName}
              placeholderTextColor={'black'}
            />

            <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Document Type</Text>
            <CustomInput
              value={entry}
              placeholder="Select Site"  //pehlay yahan Entry tha 
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

            <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Expiry Date</Text>
            <DatePick/>
            {/* <CustomInput
              value={fname}
              placeholder="Select Date"
              onChangeText={onChangefname}
              placeholderTextColor={'black'}
            /> */}

            <Text style={{color: Colors.twoATwoD,fontWeight:'500'}}>Note</Text>
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
        
        <View style={{flexDirection:'row',justifyContent:'center'}}>
          <View style={{justifyContent:'center',alignItems:'center',margin:10,borderColor:'black',borderRadius:2}}>
              <TouchableOpacity><Image source={require('../assets/images/icon69.png')} style={{height: 100, width: 130}}/></TouchableOpacity>
          </View>
        </View>

        <View>
          <CustomButton
            buttonWrapper={styles.profileButton}
            title={'Add Document'}
          />
          <Text style={styles.cancelText} onPress={() => navigation.goBack()}>
                    Cancel
                </Text>
          </View>
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
  inputs:{
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
  inputs:{
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
