import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import {Colors, Fonts, Images} from 'theme';

export function MyTabBar({state, descriptors, navigation}) {
  const renderIcon = index => {
    switch (index) {
      case 0:
        return {
          src: Images.home,
          iconStyle: styles.homeIcon,
        };

      case 1:
        return {
          src: Images.calendar,
          iconStyle: styles.calendarIcon,
        };

      case 2:
        return {
          src: Images.clock,
          iconStyle: styles.clockIcon,
        };

      case 3:
        return {
          src: Images.notesTabIcon,
          iconStyle: {height: 29, width: 26},
        };

      case 4:
        return {
          src: Images.contactUsTabIcon,
          iconStyle: {height: 28, width: 35},
        };

      case 5:
        return {
          src: Images.profileTabIcon,
          iconStyle: styles.userIcon,
        };

      default:
        return {
          src: Images.home,
          iconStyle: styles.homeIcon,
        };
    }
  };

  return (
    <View style={styles.tabWrapper}>
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

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        let {src, iconStyle} = renderIcon(index);

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? {selected: true} : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabContainer}>
            <Image
              style={[iconStyle, isFocused && styles.focusedColor]}
              source={src}
            />

            <Text
              numberOfLines={1}
              style={[styles.tabLabel, !isFocused && {color: 'transparent'}]}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabWrapper: {
    flexDirection: 'row',
    backgroundColor: Colors.white,
    height: 65,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
  },
  tabContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // backgroundColor: 'pink',
    paddingBottom: 5,
  },
  tabLabel: {
    fontFamily: Fonts.Poppins.SemiBold,
    color: Colors.secondary,
    fontSize: 11,
  },
  homeIcon: {
    height: 25,
    width: 29,
    resizeMode: 'contain',
  },
  userIcon: {
    height: 29,
    width: 29,
    resizeMode: 'contain',
  },
  focusedColor: {
    tintColor: Colors.secondary,
  },
  bellIcon: {
    height: 27,
    width: 27,
    resizeMode: 'contain',
  },
  calendarIcon: {
    height: 29,
    width: 28,
    resizeMode: 'contain',
  },
  clockIcon: {
    width: 30,
    height: 29,
  },
});
