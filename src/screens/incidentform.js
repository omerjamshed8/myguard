import React from 'react';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
} from 'react-native';
import {Colors, Fonts, Images} from 'theme';

function IncidentForm({navigation}) {
  const [text, onChangeText] = React.useState('Full Name');
  const [names, onChangeName] = React.useState('');
  const [entry, onChangeentry] = React.useState('');
  const [submission, onChangeSubmission] = React.useState('');
  const [fname, onChangefname] = React.useState('');
  const [reqaction, onChangereqaction] = React.useState('');
  const [reqAction, onChangereqAction] = React.useState('');
  const [desc, onChangedesc] = React.useState(null);

  const clickhandler = () => {
    navigation.navigate('CreateEmployee');
  };

  return (
    <SafeAreaView style={styles.splashView}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}>

            <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#2A2D43',margin:30,fontSize:15,fontWeight:'600'}}>New Incident</Text>
            </View>
        {/* Input Wrapper */}
        <View style={{flex: 1, padding: 25}}>

          <View>
            <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Customer Name</Text>
            <CustomInput
              value={names}
              placeholder="Name"
              onChangeText={onChangeName}
              placeholderTextColor={'black'}
            />

            <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Entry</Text>
            <CustomInput
              value={entry}
              placeholder="Entry"
              onChangeText={onChangeentry}
              placeholderTextColor={'black'}
            />

            <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Submitted By</Text>
            <CustomInput
              value={submission}
              placeholder="Name"
              onChangeText={onChangeSubmission}
              placeholderTextColor={'black'}
            />

            <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Form Name</Text>
            <CustomInput
              value={fname}
              placeholder="Name"
              onChangeText={onChangefname}
              placeholderTextColor={'black'}
            />

            <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Required Action</Text>
            <CustomInput
              value={reqaction}
              placeholder="Name"
              onChangeText={onChangereqaction}
              placeholderTextColor={'black'}
            />
            
            <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Required Action</Text>
            <CustomInput
              value={reqAction}
              placeholder="Name"
              onChangeText={onChangereqAction}
              placeholderTextColor={'black'}
            />

            <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Description</Text>
            <CustomInput
              value={desc}
              placeholder="Name"
              onChangeText={onChangedesc}
              placeholderTextColor={'black'}
              inputType={'multiline'}
            />
          </View>

        </View>

        <View style={{justifyContent:'center',alignItems:'center',margin:10}}>
            <Image source={require('../assets/images/upload.png')} style={{height: 50, width: 50}}/>
        </View>

        <View>
          <CustomButton
            buttonWrapper={styles.profileButton}
            title={'Add Incident'}
          />
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default IncidentForm;

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
    width: '92%',
  },
  skipText: {
    alignSelf: 'center',
    color: Colors.black,
    marginTop: 20,
    fontFamily: Fonts.Poppins.Regular,
  },
});
