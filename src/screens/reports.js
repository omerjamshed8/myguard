import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';

const Reports = (prop) => {
    console.log("DetailsCard= ",prop.props);
    // var props=prop.props;
    var props={
        Time: '15:00 - 22:00',
        venue:'Sydney Hotel',
        status:'Removal',
        attitude:'Agressive Behavior' 
    }
    return (
        <View style={styles.maincontainer}>
            <View style={styles.box2}>
                <View style={styles.avatarbox}>
                    <Image style={styles.avatarimg} source={props.icon1?{uri:icon1}:require('../assets/images/yellow.png')} />
                </View>
                <View style={styles.contentbox}>
                    <Text style={[styles.datetext,{fontWeight:'bold'}]}>{props.Time}</Text>
                    <Text style={styles.datetext}>{props.venue}</Text>
                    <Text style={styles.datetext}>{props.status}</Text>
                    <Text style={styles.nametext}>{props.attitude} </Text>
                </View>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: "#E2E8F0" }} />
        </View>
    )
}

export default Reports;

const styles = StyleSheet.create({
    maincontainer: {
        width: '100%',
        height: 120,
        flexDirection: 'column',


    },
    head: {
        height: 50,
        backgroundColor: '#F2385F',
        flex: 2,
        justifyContent: 'center',
        paddingHorizontal: 15,
    },
    headingtext: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#FFFFFF'
    },
    box2: {
        flex: 3,
        flexDirection: 'row',
        paddingHorizontal: 15

    },
    avatarbox: {
        justifyContent: 'center',
        width: 46,
    },
    avatarimg: {
        width: 80,
        height: 80,
        borderRadius: 6,
    },
    contentbox: {
        justifyContent: 'center',
        marginHorizontal: 40
    },
    datetext: {
        color: '#2A2D43',
        fontSize: 15,
        lineHeight: 18,
        marginLeft:15,
        paddingBottom:2
    },
    nametext: {
        color: '#2A2D43',
        fontSize: 15,
        lineHeight: 18,
        marginLeft:15
    }

})