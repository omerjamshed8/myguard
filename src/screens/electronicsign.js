import { View, Text, TouchableOpacity, SafeAreaView,StyleSheet } from 'react-native';
import React from 'react';
import DatePickerComponent from './datepicker';
import SmallText from '../components/SmallText/SmallText';
import fonts from '../assets1/assets/fonts/fonts'
// import { styles } from 'navigation/routes';

export default function ElectronicSignOnRegister(){
    return(
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <DatePickerComponent/>
            </View>

            <View style={{flex:1,position:'absolute',top:'22%',left:"3%"}}>
                <Text style={styles.tex}>Site Name:</Text>
            </View>

            <View style={{flex:1,justifyContent:'center',alignItems:'center',marginTop:0,position:'absolute',top:"50%"}}>
                <Text style={styles.tex}>You have to be clocked in to enable this feature</Text>
            </View>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    tex:{
        color:'#2A2D43',
        textAlign:'left',
        marginLeft:'3%',
        fontFamily:fonts.semiBold,
        fontWeight:'600'
    }
})