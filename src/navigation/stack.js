import React, { useEffect, useRef, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { AppNav, AuthNav, styles as routeStyles } from './routes';
import Splash from 'screens/splash';
import { useSelector } from 'react-redux';
import TabNav from './tabs';
import EditProfile from 'screens/profile/edit-profile';
import { Image, TouchableOpacity, StyleSheet, Text,Animated,Dimensions, View } from 'react-native';
import { commonStyle } from 'theme';
import { Images } from 'theme';
import SplashScreen from 'react-native-splash-screen';
import TrainingModule from 'screens/trainingmodule';
import Certificate from 'screens/certificate';
import SubmitUnavailability from 'screens/submitunavail';
import DetailsCard from 'screens/DetailsCard';
import Team from 'screens/team';
import Tabnav from 'screens/tabnav';
import IncidentForm from 'screens/incidentform';
import ElectronicSignOnRegister from 'screens/electronicsign';
import Playerss from 'screens/videoplayer';
import ProfileTabNav from 'screens/view-profile/tab-nav';
import IncidentCard from 'screens/cardcomponent/incidentcard';
import UnavailabilityCard from 'screens/cardcomponent/unavailabilitycard';
import UnavailForm from 'screens/unavailform';
import AddDocument from 'screens/adddocument';
import { setGestureState } from 'react-native-reanimated/lib/reanimated2/NativeMethods';
import { createContext } from 'react';
import ViewProfileTabNav from 'screens/view-only-profile/tab-navigator';
import QRScanner from 'screens/QRcodeScanner/qrscanner';
import IncidentListing from 'screens/incidentlisting';
import EditUnavail from 'screens/editunavail';
import EditDocument from 'screens/editdocument';
import ViewDocument from 'screens/viewdocument';
import ViewUnavail from 'screens/viewunavail';
import ViewIncident from 'screens/viewincident';
import EditIncident from 'screens/editincident';
import { delay } from 'lodash';
import AnimatedSplash from 'screens/animatedsplash';

const Stack = createStackNavigator();

const edit = createContext()

export default function MyStack() {
  const { accessToken } = useSelector(state => {
    console.log(state, "stae")
    return state.auth
  });
  //  const [edit,setedit]=useState(false);
  console.log(accessToken, "accessTokenPPPPP")
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  },[])

  //   Animated.sequence([
  //     Animated.timing(moveAnim,{
  //       duration:2000,
  //       toValue:Dimensions.get('window').width/1.6,
  //       delay:0,
  //       useNativeDriver:false,
  //     }),
  //     Animated.timing(moveAnim,{
  //       duration:2000,
  //       toValue:0,
  //       delay:0,
  //       useNativeDriver:false,
  //     })
  //   ]).start();
  //   Animated.timing(fadeAnim,{
  //     duration:2000,
  //     toValue:1,
  //     delay:2000,
  //     useNativeDriver:false
  //   }).start()
  // }, [moveAnim,fadeAnim]);

  // const HeaderTabs=()=>{
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen name="IncidentForm" component={IncidentForm}/>
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // }

  const presshandler = () => {
    navigation.navigate('IncidentForm')
  }

  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        {/* <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        /> */}
        {accessToken ? (
          <>
            <Stack.Screen
              name="AppNav"
              component={TabNav}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Toptab"
              component={IncidentCard}  //IncidentListing tha pehlay  //Tabnav tha pehlay
              options={({ route, navigation }) => ({
                headerShown: true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'Incident/Forms',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    style={[commonStyle.screenPadding]}
                    onPress={() => { navigation.navigate('IncidentForm') }}
                  >
                    <Image
                      source={require('../assets/images/plusbtn.png')}
                      resizeMode={'contain'}
                      style={styles.profileEditIcon}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen
              name="editProfile"
              component={EditProfile}
              options={{
                headerShown: true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'Edit Profile',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="unavailForm"
              component={UnavailForm}
              options={{
                headerShown: true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'Unavailability',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }}
            />
            <Stack.Screen
              name="addDocument"
              component={AddDocument}
              options={{
                headerShown: true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'Add Document',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }}
            />
            <Stack.Screen name='TrainingModule' component={TrainingModule}
              options={{
                headerShown: true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'Training Module',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }}
            />
            <Stack.Screen name='Certificate' component={Certificate}
              options={{
                headerShown: true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'Certificates',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    style={[commonStyle.screenPadding]}
                    onPress={() => navigation.navigate('editProfile')}>
                    <Image
                      source={require('../assets/images/upload.png')}
                      resizeMode={'contain'}
                      style={styles.profileEditIcon}
                    />
                  </TouchableOpacity>
                ),
              }} />

            <Stack.Screen name='Team' component={Team}
              options={{
                headerShown: true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'Team Schedule',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }}
            />
            <Stack.Screen name='SubmitUnavailability' component={UnavailabilityCard}  //SubmitUnavailability 
              options={({ route, navigation }) => ({
                headerShown: true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'Unavailability',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    style={[commonStyle.screenPadding]}
                    onPress={() => navigation.navigate('unavailForm')}>
                    <Image
                      source={require('../assets/images/plusbtn.png')}
                      resizeMode={'contain'}
                      style={styles.profileEditIcon}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name='IncidentForm' component={IncidentForm}
              options={{
                headerShown: true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'Incident/Forms',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }}
            />
            <Stack.Screen name='ElectronicSignOnRegister' component={ElectronicSignOnRegister}
              options={{
                headerShown: true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'Electronic Sign On Register',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    style={[commonStyle.screenPadding]}
                    onPress={() => navigation.navigate('editProfile')}>
                    <Image
                      source={require('../assets/images/share.png')}
                      resizeMode={'contain'}
                      style={styles.profileEditIcon}
                    />
                  </TouchableOpacity>
                ),
              }}
            />
            <Stack.Screen name='ViewProfile' component={ProfileTabNav} initialParams={edit}
              options={({ route, navigation }) => ({
                headerShown: true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'View Profile',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
                headerRight: () => (
                  <TouchableOpacity
                    style={[commonStyle.screenPadding]}
                    onPress={() => {
                      // setedit(!edit)
                      navigation.navigate('ViewProfileTabNav')   //editProfile pehlay yeh tha
                      console.log("pressed")
                    }}>

                    {/* <Image
                        source={require('../assets/images/share.png')}
                        resizeMode={'contain'}
                        style={styles.profileEditIcon}
                      /> */}
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: '600' }}>Edit</Text>
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name='Playerss' component={Playerss} options={{ headerShown: false }} />
            <Stack.Screen name='ViewProfileTabNav' component={ViewProfileTabNav}
              options={{
                headerShown: true, headerStyle: routeStyles.headerStyle,
                headerTitle: 'View Profile',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }} />
            <Stack.Screen name='EditUnavail' component={EditUnavail}
              options={{
                headerShown: true, headerStyle: routeStyles.headerStyle,
                headerTitle: 'Unavailability',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }}
            />
            <Stack.Screen name='ViewUnavail' component={ViewUnavail}
              options={{
                headerShown: true, headerStyle: routeStyles.headerStyle,
                headerTitle: 'Unavailability',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }}
              ViewUnavail

            />
            <Stack.Screen name='EditDocument' component={EditDocument}
              options={{
                headerShown: true, headerStyle: routeStyles.headerStyle,
                headerTitle: 'Add Document',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }} />

            <Stack.Screen name='ViewDocument' component={ViewDocument}
              options={{
                headerShown: true, headerStyle: routeStyles.headerStyle,
                headerTitle: 'Add Document',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }} />

            <Stack.Screen name='ViewIncident' component={ViewIncident}
              options={{
                headerShown: true, headerStyle: routeStyles.headerStyle,
                headerTitle: 'Incident/Forms',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }} />

            <Stack.Screen name='EditIncident' component={EditIncident}
              options={{
                headerShown: true, headerStyle: routeStyles.headerStyle,
                headerTitle: 'Incident/Forms',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
                headerBackImage: () => (
                  <Image
                    source={Images.headerBack}
                    resizeMode={'contain'}
                    style={routeStyles.headerBackIconStyle}
                  />
                ),
              }} />
          </>
        ) : (
          <>
          {/* <Stack.Screen name="AnimatedSplash" component={AnimatedSplash} options={{headerShown:false}}/> */}

          <Stack.Screen
            name="AuthNav"
            component={AuthNav}
            options={{ headerShown: false }}
            />
            </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  profileEditIcon: {
    width: 24,
    height: 24,
  },
})