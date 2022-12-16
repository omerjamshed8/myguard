//================================ React Native Imported Files ======================================//

import React from 'react';
import { StyleSheet } from 'react-native';
// import fonts from '../../assets/fonts/fonts';

//================================ Local Imported Files ======================================//
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import colors from '../assets1/assets/colors/colors';

const styles = StyleSheet.create({

    container: {
        flex: 1,
        marginTop: hp(0)    //3
    },
    topContainer: {
        flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'center', backgroundColor: colors.red, paddingVertical: wp(3), marginBottom: hp(2.5),
        borderTopWidth: wp(0), borderTopColor: colors.black  //wp(2)
    },
    iconRight: {
        transform: [{ rotate: '180deg' }], 
        tintColor: colors.white, 
        width: wp(2.5),
         height: wp(2.5)
    },
    iconLeft: {
        tintColor: colors.white,
         width: wp(2.5), 
         height: wp(2.5),
    }

});

export default styles;
