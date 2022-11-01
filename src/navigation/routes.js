import {Image, StyleSheet} from 'react-native';
import CreateEmployee from 'screens/createprofileEmployee';
import CreateGuard from 'screens/createprofileGuard';
import ForgotPassword from 'screens/forgotpassword';
import GuardHome from 'screens/guardhome';
import EditProfile from 'screens/profile/edit-profile';
import ProfileDetail from 'screens/profile/profile-detail';
import ResetPassword from 'screens/resetpassword';
import Schedule from 'screens/schedule';
import SecurityCode from 'screens/securitycode';
import SelectAccount from 'screens/selectaccount';
import SignIn from 'screens/signin';
import SignUp from 'screens/signup';
import {Images} from 'theme';
import colors from 'theme/colors';
import fonts from 'theme/fonts';

const {createStackNavigator} = require('@react-navigation/stack');

const Stack = createStackNavigator();
const AppStack = createStackNavigator();

export const AppNav = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="Home"
        component={GuardHome}
        options={{headerShown: false}}
      />
    </AppStack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen
        name="ProfileDetail"
        component={ProfileDetail}
        options={{headerShown: false}}
      />
      <AppStack.Screen
        name="editProfile"
        component={EditProfile}
        options={{
          headerShown: true,
          headerStyle: styles.headerStyle,
          headerTitle: 'Edit Profile',
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: 'center',
          headerBackImage: () => (
            <Image
              source={Images.headerBack}
              resizeMode={'contain'}
              style={styles.headerBackIconStyle}
            />
          ),
        }}
      />
    </AppStack.Navigator>
  );
  //
};

export const AuthNav = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SelectAccount"
        component={SelectAccount}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateGuard"
        component={CreateGuard}
        options={({route, navigation}) => {
          return {
            title:
              route?.params?.type == 'guard'
                ? 'Create Guard'
                : 'Create Employee',
            headerShown: true,
            headerStyle: {backgroundColor: '#2A2D43'},
            headerTitleStyle: styles.headerTitleStyle,
            headerTitleAlign: 'center',
            headerBackImage: () => (
              <Image
                source={Images.headerBack}
                resizeMode={'contain'}
                style={styles.headerBackIconStyle}
              />
            ),
          };
        }}
      />
      <Stack.Screen
        name="CreateEmployee"
        component={CreateEmployee}
        options={{
          headerShown: true,
          headerStyle: {backgroundColor: '#2A2D43'},
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: 'center',
          headerBackImage: () => (
            <Image
              source={Images.headerBack}
              resizeMode={'contain'}
              style={styles.headerBackIconStyle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{
          headerShown: true,
          headerStyle: styles.headerStyle,
          headerTitle: 'Forgot Password',
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: 'center',
          headerBackImage: () => (
            <Image
              source={Images.headerBack}
              resizeMode={'contain'}
              style={styles.headerBackIconStyle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="SecurityCode"
        component={SecurityCode}
        options={{
          headerShown: true,
          headerStyle: styles.headerStyle,
          headerTitle: 'Verification',
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: 'center',
          headerBackImage: () => (
            <Image
              source={Images.headerBack}
              resizeMode={'contain'}
              style={styles.headerBackIconStyle}
            />
          ),
        }}
      />
      <Stack.Screen
        name="ResetPassword"
        component={ResetPassword}
        options={{
          headerShown: true,
          headerStyle: styles.headerStyle,
          headerTitle: 'New Password',
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: 'center',
          headerBackImage: () => (
            <Image
              source={Images.headerBack}
              resizeMode={'contain'}
              style={styles.headerBackIconStyle}
            />
          ),
        }}
      />
      {/* Edited by me from line 178-189 */}
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={{
          headerShown: true,
          headerStyle: styles.headerStyle,
          headerTitle: 'Schedule',
          headerTitleStyle: styles.headerTitleStyle,
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );
};

export const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
  },

  childView: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 300,
    height: 200,
    borderWidth: 2,
    borderColor: '#BF360C',
    padding: 25,
  },

  text: {
    fontSize: 24,
    color: '#BF360C',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  headerBackImg: {
    width: 9,
    height: 14,
  },
  headerTitleStyle: {
    color: colors.white,
    fontFamily: fonts.Poppins.SemiBold,
    fontSize: 18,
  },
  headerBackIconStyle: {width: 12, height: 20},
  headerStyle: {
    backgroundColor: colors.twoATwoD,
  },
});
