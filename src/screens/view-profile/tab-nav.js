import React, { useEffect } from 'react';
import {Alert, Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import EditProfile from './profile';
import BankingDetails from './bankingdetails';
import EmergencyDetails from './emergencydetails';

const Tab = createMaterialTopTabNavigator();

const ProfileTabNav = ({route,navigation}) => {
  const {edit}=route.params;
  let screen1='Profile';
  let screen2='Emergency Details';
  let screen3='Banking Details';
    // Alert.alert("Edit value",`edit value: ${edit}`)

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
          {screen1 && <Tab.Screen name={screen1} children={()=><EditProfile edit={edit} navigation={navigation} />} />}
        {screen2 && <Tab.Screen name={screen2} children={()=><EmergencyDetails edit={edit} navigation={navigation}/>} />}
        {screen3 && <Tab.Screen name={screen3} children={()=><BankingDetails edit={edit} navigation={navigation}/>}/>}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default ProfileTabNav;
