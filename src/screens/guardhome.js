import CustomButton from 'components/custom-button';
import React, { useEffect, useState } from 'react';
import { View, SafeAreaView, StyleSheet, Image, FlatList, Text, Modal } from 'react-native';
import { useDispatch } from 'react-redux';
import { onLogout } from 'redux/reducer/auth-reducer';
import { getUserDetail } from 'services/auth';
import { commonStyle, Images } from 'theme';
import colors from 'theme/colors';
import axios from 'axios';
import GetTime from './getcurrenttime/time';
// import QRCodeScanner from 'react-native-qrcode-scanner';
import { compose } from 'redux';
import { result } from 'lodash';
import { TouchableOpacity } from 'react-native-gesture-handler';
import QRScanner from './QRcodeScanner/qrscanner';
import useUser from 'hooks/useUser';
// import QRCodeScanner from 'react-native-qrcode-scanner';

function GuardHome({ navigation }) {
  const [clockin, setclockin] = useState('Clock in')
  const [scan, setscan] = useState(false);
  const [result, setresult] = useState('')
  const [modalVisible, setModalVisible] = useState(true);
  const {getUserID}=useUser();
  const [employeeId,setemployeeid]=useState('')
  let userID=getUserID();

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

  var hours = new Date().getHours(); //To get the Current Hours
  var min = new Date().getMinutes(); //To get the Current Minutes
  var sec = new Date().getSeconds(); //To get the Current Seconds

  const [time,setTime]=useState()


  const [state, setState] = useState({});

  const listData = [
    // {title: 'Team Schedule',id:3},
    { title: 'Submit Unavailability', id: 4 },
    { title: 'Incident/Forms', id: 5 },
    // {title: 'Team Message'},
    // {title: 'Electronic Sign on Register',id:6},
    { title: 'Training Module', id: 2 },
    // {title: 'Certificate',id:1},
    { title: 'Staff Profile', id: 7 },
    {title: 'Logout', id: 0},
  ];
  const dispatch = useDispatch();

  const [qrVisible, setQrVisible] = useState(false)

  const clickhandler = item => {
    switch (item?.id) {
      case 0:
        handleLogout();
        break;

      case 1:
        navigation.navigate('Certificate');
        break;

      case 2:
        // navigation.navigate('TrainingModule');
        break;

      case 3:
        navigation.navigate('Team', {
          venue: 'Charter Hall-CH VIC(Geelong)',
          time1: '08:00-15:30',
          name1: 'Harley Hunter',
          icon1: '',
          time2: '15:30-23:10',
          name2: 'Abdul Waheed',
          icon2: ''
        });
        break;

      case 4:
        navigation.navigate('SubmitUnavailability', {
          description: 'draft/For Approval',
          radio_props_draft: [
            { label: 'Unavailable', value: 0 },
            { label: 'Partly Unavailable', value: 1 }
          ],
          radioAction: 0,
        });
        break;

      case 5:
        navigation.navigate('Toptab', {
          screen1: 'ForgotPassword',
          screen2: 'Profile',
        });
        break;

      case 6:
        navigation.navigate('ElectronicSignOnRegister');
        break;

      case 7:
        navigation.navigate('ViewProfile')
        break;

      default:
        break;
    }
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  const handleLogout = () => {
    dispatch(onLogout());
  };

  onSuccess = (e) => {
    setresult(e.data);
    setscan(false)
  }

  startScan = () => {
    setscan(true)
    setresult()
  }

  return (
    <SafeAreaView style={styles.container}>
      {
        
      }
      <View
        style={{
          backgroundColor: colors.twoATwoD,
          height: '30%',
          width: '100%',
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image style={styles.appIcon} source={Images.userPic} />
        </View>

        <View
          style={{
            width: '50%',
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            alignSelf: 'center',
            marginBottom: 20,
          }}>
          <CustomButton
            buttonWrapper={styles.clockInContainer}
            titleStyle={styles.clockInText}
            title={clockin}
            onButtonPress={(event) => {
              if (clockin == 'Clock in') {
                setclockin("Clock out")
                setTime(hours + ":" + min + ":" + sec);
                console.log("settime",time)
                console.log(hours + ":" + min + ":" + sec)
                axios.post(
                  `https://securitylinksapi.herokuapp.com/api/v1/employee/${employeeId}/checkin`,
                  {
                    checkinTime:time,    
                  }
              ).then(res => {
                  console.log('successfully clocked in')
                  console.log(res)
              }).catch(e => {
                  console.log('error')
                  console.log(e.response.data)
              }) 
              } else if (clockin == 'Clock out') {
                setclockin('Clock in')
                setTime(hours + ":" + min + ":" + sec)
                axios.post(
                  `https://securitylinksapi.herokuapp.com/api/v1/employee/${employeeId}/checkin`,
                  {
                    checkinTime:time,    
                  }
              ).then(res => {
                  console.log('successfully clocked out')
                  console.log(res)
              }).catch(e => {
                  console.log('error')
                  console.log(e.response.data)
              }) 
              }
            }}
          />
          <CustomButton
            buttonWrapper={styles.clockInContainer}
            titleStyle={styles.clockInText}
            title={'Scan QR'}
            onButtonPress={() => {
              // const hamza = axios.get('http://54.171.172.119:3001/api/v1/employee/profile/135').then((res) => setState(res))
              // console.log(state)
             setQrVisible(true)
            }}
            />
        </View>
      </View>

      {
        qrVisible
        ?
        <Modal visible={true} onRequestClose={()=>{setModalVisible(false);setQrVisible(false)}}>
          <QRScanner empid={employeeId}/>
        </Modal>
        :
        null
      }

      <FlatList
        data={listData}
        style={commonStyle.screenPadding}
        contentContainerStyle={{ paddingVertical: 20 }}
        renderItem={({ item }) => (
          <View style={{ marginVertical: 8 }}>
            <CustomButton
              title={item.title}
              onButtonPress={() => clickhandler(item)}
            />
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
    </SafeAreaView>
  );
}

export default GuardHome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  appButtonContainer: {
    width: 80,
    height: 30,
    backgroundColor: '#F2385F',
    borderRadius: 8,
    justifyContent: 'center',
  },
  appButtonText: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  appButtonContainerLarge: {
    width: 320,
    height: 50,
    backgroundColor: '#F2385F',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    margin: '2%',
  },
  appButtonTextLarge: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: 17,
    color: 'white',
  },
  appIcon: {
    height: 100,
    width: 100,
    marginTop: 20,
  },
  clockInContainer: {
    width: '40%',
    height: 30,
  },
  clockInText: {
    fontSize: 12,
  },
});
