// // import { NavigationContainer } from '@react-navigation/native';
// // import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// // import HomeScreen from '../../Screens/HomeScreen';
// // import SettingsScreen from '../../Screens/SettingsScreen';

// // const Tab = createMaterialTopTabNavigator();

// // export default function MyTabs({}) {

// //   return (
// //     <NavigationContainer>
// //     <Tab.Navigator>
// //       <Tab.Screen name={"TAB1"} component={HomeScreen} />
// //       <Tab.Screen name="Settings" component={SettingsScreen} />
// //     </Tab.Navigator>
// //     </NavigationContainer>
// //   );
// // }



// import * as React from 'react';
// import { Text, View } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// function HomeScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Home!</Text>
//     </View>
//   );
// }

// function SettingsScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <Text>Settings!</Text>
//     </View>
//   );
// }

// const Tab = createMaterialTopTabNavigator();

// export default function CustomeBottomTabNavigation() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator
//         screenOptions={{
//           tabBarLabelStyle: { fontSize: 9,fontWeight: '600',flex:1,},
//           tabBarActiveTintColor: "white",
//           tabBarPressColor:'red',
//           tabBarInactiveTintColor: "black",
//           tabBarIndicatorStyle:{backgroundColor:'red'},
//           tabBarStyle: { backgroundColor: 'white',borderBottomWidth:1,borderBottomColor: 'rgba(42, 45, 67, 1)'},
//         }}
//       >
//         <Tab.Screen name="Home" component={HomeScreen} />
//         <Tab.Screen name="Settings" component={SettingsScreen} />
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Reports from './reports';

const Tab = createMaterialTopTabNavigator();

const Home = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{color:'black'}}>Home</Text>
    </View>
  );
};
const Setting = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text style={{color:'black'}}>Settings</Text>
    </View>
  );
};
const About = () => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <Text>About</Text>
    </View>
  );
};
const TopTab = ({screen1,screen2}) => {
  screen1='My Reports';
  screen2='Site Reports';
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
                        fontSize: 16,
                      }}>
                      {label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          );
        }}>
          {screen1 && <Tab.Screen name={screen1} component={Reports} />}
        {screen2 && <Tab.Screen name={screen2} component={Setting} />}
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TopTab;
