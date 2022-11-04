import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {AppNav, AuthNav, styles as routeStyles} from './routes';
import Splash from 'screens/splash';
import {useSelector} from 'react-redux';
import TabNav from './tabs';
import EditProfile from 'screens/profile/edit-profile';
import {Image,TouchableOpacity,StyleSheet} from 'react-native';
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
const Stack = createStackNavigator();

export default function MyStack() {
  const {accessToken} = useSelector(state => state.auth);

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);

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
              component={Tabnav}
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
                headerRight: () => (
                  <TouchableOpacity
                    style={[commonStyle.screenPadding]}>
                    <Image
                      source={require('../assets/images/plusbtn.png')}
                      resizeMode={'contain'}
                      style={styles.profileEditIcon}
                    />
                  </TouchableOpacity>
                ),
              }}
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
              }}
              />
              <Stack.Screen name='SubmitUnavailability' component={SubmitUnavailability} 
              options={{
                headerShown:true,
                headerStyle: routeStyles.headerStyle,
                headerTitle: 'Submit Unavailability',
                headerTitleStyle: routeStyles.headerTitleStyle,
                headerTitleAlign: 'center',
              }}
              />
              <Stack.Screen name='IncidentForm' component={IncidentForm}/>
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