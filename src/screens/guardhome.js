import CustomButton from 'components/custom-button';
import React, {useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Image, FlatList} from 'react-native';
import {useDispatch} from 'react-redux';
import {onLogout} from 'redux/reducer/auth-reducer';
import {getUserDetail} from 'services/auth';
import {commonStyle, Images} from 'theme';
import colors from 'theme/colors';

function GuardHome() {
  const listData = [
    {title: 'Team Schedule'},
    {title: 'Submit Unavailability'},
    {title: 'Incident/Forms'},
    {title: 'Team Message'},
    {title: 'Electronic Sign on Register'},
    {title: 'Training Module'},
    {title: 'Certificate'},
    {title: 'Logout', id: 0},
  ];
  const dispatch = useDispatch();

  const clickhandler = item => {
    switch (item?.id) {
      case 0:
        handleLogout();
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

  return (
    <SafeAreaView style={styles.container}>
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
            title={'Clock in'}
          />
          <CustomButton
            buttonWrapper={styles.clockInContainer}
            titleStyle={styles.clockInText}
            title={'Scan QR'}
          />
        </View>
      </View>

      <FlatList
        data={listData}
        style={commonStyle.screenPadding}
        contentContainerStyle={{paddingVertical: 20}}
        renderItem={({item}) => (
          <View style={{marginVertical: 8}}>
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
