import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react';

const DetailsCard = (prop) => {
    console.log("DetailsCard= ",prop.props);
    var props=prop.props;
    return (
        <View style={{flex:1}}>
        <View style={styles.maincontainer}>
            <View style={styles.head}>

                <Text style={styles.headingtext}>{props.venue}</Text>
            </View>
            <View style={styles.box2}>
                <View style={styles.avatarbox}>
                    <Image style={styles.avatarimg} source={props.icon1?{uri:icon1}:require('../assets/images/personicon.png')} />
                </View>
                <View style={styles.contentbox}>
                    <Text style={styles.datetext}>{props.time1}</Text>
                    <Text style={styles.nametext}>{props.name1}</Text>
                </View>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: "#E2E8F0" }} />
            <View style={styles.box2}>
                <View style={styles.avatarbox}>
                    <Image style={styles.avatarimg} source={require('../assets/images/personicon.png')} />
                </View>
                <View style={styles.contentbox}>
                    <Text style={styles.datetext}>{props.time2}</Text>
                    <Text style={styles.nametext}>Harley Hunter </Text>
                </View>
            </View>
            <View style={{ width: '100%', height: 1, backgroundColor: "#E2E8F0" }} />
        </View>
        </View>
    )
}

export default DetailsCard;

const styles = StyleSheet.create({
    maincontainer: {
        width: '100%',
        height: 222,
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
        width: 46,
        height: 46,
        borderRadius: 6
    },
    contentbox: {
        justifyContent: 'center',
        marginHorizontal: 15
    },
    datetext: {
        color: 'black',
        fontSize: 12,
        fontStyle: 'italic',
        fontWeight: '500',
        lineHeight: 18
    },
    nametext: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
        lineHeight: 18
    }

})