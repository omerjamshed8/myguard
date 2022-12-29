import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ViewBankingDetails from './bankingdetails';
import ViewEmergencyDetails from './emergencydetails';
import ViewEditProfile from './profile';

const Tab = createMaterialTopTabNavigator();

const ViewProfileTabNav = ({screen1,screen2,screen3,edit}) => {
  screen1='Profile';
  screen2='Emergency Details';
  screen3='Banking Details';
  console.log("??????????????????????????",edit)

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        tabBar={({state, descriptors, navigation, position}) => {
          return (
            <View style={{flexDirection: 'row'}}>
              {state.routes.map((route, index) => {
                const {options} = descriptors[route.key];
                const label =
                  options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                  const event = navigation.emit({
                    type: 'tabPress',
                    target: route.key,
                    canPreventDefault: true,
                  });

                  if (!isFocused && !event.defaultPrevented) {
                    // The `merge: true` option makes sure that the params inside the tab screen are preserved
                    navigation.navigate({name: route.name, merge: true});
                  }
                };

                return (
                  <TouchableOpacity
                    key={index}
                    onPress={onPress}
                    style={{
                      flex: 1,
                      backgroundColor: isFocused ? 'rgba(242, 56, 95, 1)' : '#F5F5F5',
                      justifyContent: 'center',
                      alignItems: 'center',
                      paddingVertical: 10,
                    }}>
                    <Text
                      style={{
                        color: isFocused ? 'white' : 'black',
                        fontWeight: isFocused ? '600' : '600',
                        fontSize: 12,
                      }}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}>
          {screen1 && <Tab.Screen name={screen1} component={ViewEditProfile} />}
        {screen2 && <Tab.Screen name={screen2} component={ViewEmergencyDetails} />}
        {screen3 && <Tab.Screen name={screen3} component={ViewBankingDetails} />}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ViewProfileTabNav;
