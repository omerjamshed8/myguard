import React from 'react';
import {StyleSheet, View, Text, Image, ScrollView} from 'react-native';
import Screen from 'components/screen';
import useUser from 'hooks/useUser';
import moment from 'moment';
import colors from 'theme/colors';
import fonts from 'theme/fonts';

const ProfileDetail = () => {
  const {user, getUserFullName, getUserImage, getUserEmail} = useUser();

  const renderUserField = (title, desc) => {
    return (
      <View style={styles.userDetailContainer}>
        <Text style={styles.titleText}>{title}</Text>
        <Text style={styles.descText}>{desc}</Text>
      </View>
    );
  };

  return (
    <Screen>
      <ScrollView>
        <View style={{alignItems: 'center', paddingTop: 20}}>
          <Image
            style={styles.userImage}
            resizeMode={'contain'}
            source={getUserImage()}
          />
          <Text style={styles.userName}>{getUserFullName()}</Text>
        </View>

        {renderUserField('Email', getUserEmail())}
        {renderUserField('Phone', user?.UserProfile?.phone || '')}
        {renderUserField('Address', user?.UserProfile?.address)}
        {renderUserField('City', user?.UserProfile?.city)}
        {renderUserField('Province', user?.UserProfile?.province)}
        {renderUserField('Postal Code', user?.UserProfile?.postalCode)}
        {renderUserField(
          'Date of Birth',
          user?.UserProfile?.dateOfBirth
            ? moment(user?.UserProfile?.dateOfBirth).format('DD-MM-YYYY')
            : '',
        )}
      </ScrollView>
    </Screen>
  );
};

export default ProfileDetail;
const styles = StyleSheet.create({
  userImage: {
    width: 129,
    height: 131,
    borderRadius: 10,
  },
  userName: {
    fontSize: 25,
    fontFamily: fonts.Poppins.SemiBold,
    color: colors.twoATwoD,
    marginTop: 15,
  },
  userDetailContainer: {
    borderBottomColor: colors.seprator,
    borderBottomWidth: 1.5,
    paddingVertical: 8,
    marginTop: 5,
  },
  titleText: {
    fontSize: 14,
    fontFamily: fonts.Poppins.Regular,
    color: colors.twoATwoD,
  },
  descText: {
    fontSize: 16,
    fontFamily: fonts.Poppins.SemiBold,
    color: colors.twoATwoD,
  },
});
