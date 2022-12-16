import React, {useEffect,useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AppNav, AuthNav, styles as routeStyles} from './routes';
import Splash from 'screens/splash';
import {useSelector} from 'react-redux';
import TabNav from './tabs';
import EditProfile from 'screens/profile/edit-profile';
import {Image,TouchableOpacity,StyleSheet,Text} from 'react-native';
import {commonStyle} from 'theme';
import {Images} from 'theme';
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
const Stack = createStackNavigator();

const edit=createContext()

export default function MyStack() {
  const {accessToken} = useSelector(state => {
    console.log(state, "stae")
   return state.auth});
  //  const [edit,setedit]=useState(false);
  console.log(accessToken, "accessTokenPPPPP")
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

  // const HeaderTabs=()=>{
  //   <NavigationContainer>
  //     <Stack.Navigator>
  //       <Stack.Screen name="IncidentForm" component={IncidentForm}/>
  //     </Stack.Navigator>
  //   </NavigationContainer>
  // }

  const presshandler=()=>{
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
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Toptab"
              component={IncidentCard}  //Tabnav tha pehlay
              options={({ route,navigation }) => ({
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
                    onPress={()=>{navigation.navigate('IncidentForm')}}
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
                headerShown:true,
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
                headerShown:true,
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
                }}/>

              <Stack.Screen name='Team' component={Team} 
              options={{
                headerShown:true,
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
              options={({ route,navigation }) => ({
                headerShown:true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'Submit Unavailability',
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
                  headerShown:true,
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
                  headerShown:true,
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
                 options={({route,navigation})=>({
                  headerShown:true,
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
                        // navigation.navigate('ViewProfile',edit)   //editProfile pehlay yeh tha
                        // console.log("pressed")
                      }}>
                      
                      {/* <Image
                        source={require('../assets/images/share.png')}
                        resizeMode={'contain'}
                        style={styles.profileEditIcon}
                      /> */}
                      <Text style={{color:'white',fontSize:16,fontWeight:'600'}}>Edit</Text>
                    </TouchableOpacity>
                  ),
                })}
              />
              <Stack.Screen name='Playerss' component={Playerss} options={{headerShown:false}}/>
          </>
        ) : (
          <Stack.Screen
            name="AuthNav"
            component={AuthNav}
            options={{headerShown: false}}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles=StyleSheet.create({
  profileEditIcon: {
    width: 24,
    height: 24,
  },
})