import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { DocsContext } from "contexts/DocsContext";
import React, { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import Dropdowns from "screens/view-profile/dropdownpicker";
import fonts from "theme/fonts";

export default function Document({ navigation }) {
    const [responses, setresponses] = useState('')
    const [data, setdata] = useState()

    var createdat;

    const docsCtx = useContext(DocsContext);
    console.log("Data consoled in documents of docsContext", docsCtx.data)


    console.log("response.data", responses[0]?.Document?.name)

    const datas = [
        { label: '1', value: '1' },
        { label: "2", value: '2' },
        { label: "3", value: '3' },
        { label: "4", value: '4' },
        { label: "5", value: '5' },
        { label: "6", value: '6' },
        { label: "7", value: '7' },
        { label: "8", value: '8' },
        { label: "9", value: '9' },
        { label: "10", value: '10' },
    ]

    const isFocused=useIsFocused()
    useEffect(() => {
        if(isFocused)
        {
            axios.get(
                "https://securitylinksapi.herokuapp.com/api/v1/employee/13/docs",
            ).then(res => {
                console.log('successfully get response in documents')
                console.log("!!!!!!!!!>>>>>>>>>", res.data.data)
                setresponses(res?.data?.data)
                setdata(res?.data?.data)
                docsCtx.setData(res?.data?.data)
                // createdat=res?.data?.data?.createdAt
                // expirydate=res?.data?.data?.expiryDate
            }).catch(e => {
                console.log('error')
                console.log(e.response.data)
            })
        }
    }, [isFocused])
    const Card = () => {
    }

    const clickhandler = () => {

    }
    var newdate;
    const dateconverter = (date) => {
        createdat = new Date(date)
        var month = createdat.toLocaleString('default', { month: 'short' });
        newdate=createdat.getFullYear() + ' ' + month + ' ' + createdat.getDate()          //createdat.getMonth() + 1
        return newdate
    }


    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    docsCtx.data ? docsCtx.data.map((item, index) => (    //pehlay responses tha yahan
                        <View key={index} style={{ height: "auto", width: "100%", borderWidth: 1.5, borderRadius: 10, marginTop: '3%' }}>
                            <View style={{ flexDirection: "row" }}>
                                <Text style={{ padding: "3%", width: '60%', height: "auto", fontSize: 17, color: '#2A2D43', fontFamily: fonts.Poppins.Medium }}>
                                    {item?.Document?.name}
                                    <Text style={{ fontSize: 12, color: '#2A2D43', fontStyle: 'italic', fontFamily: fonts.Poppins.Regular }}>
                                        {'\n'}
                                        {item?.Document?.type}
                                    </Text>
                                    <Text style={{ color: '#2A2D43',fontSize: 14, fontFamily: fonts.Poppins.Medium }}>
                                        {'\n'}
                                        Date Added: {dateconverter(item?.Document?.createdAt)}    {'\n'}
                                        Date Expire: {dateconverter(item?.Document?.expiryDate)}
                                        {'\n'}
                                    </Text>
                                    <View style={{flexDirection:"row"}}>
                                        <Text style={{ color: '#2A2D43', fontFamily: 'Poppins', fontStyle: 'italic', fontFamily: fonts.Poppins.Regular}}>
                                            Renewal Period
                                        </Text>
                                        <Dropdowns data={datas} disable={true}/>
                                    </View>
                                    {/* <View> */}
                                    {/* </View> */}
                                </Text>
                                <View style={{ flexDirection: 'row',padding:4 }}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('ViewDocument', {
                                            props: item
                                        })
                                    }} style={{ marginTop: 20, marginLeft: 60 }}>
                                        <Image source={require('../../assets/images/view.png')} style={{ height: 25, width: 25 }} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('EditDocument', {
                                            props: item
                                        })
                                    }} style={{ marginTop: 20, marginLeft: 4 }}>
                                        <Image source={require('../../assets/images/Status.png')} style={{ height: 25, width: 25 }} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View style={{ position: 'absolute', top: 100, right: 20 }}>
                                <TouchableOpacity style={[styles.appButtonContainerLarge, { borderColor: '#F2385F' }]} onPress={clickhandler}>
                                    <Text style={[styles.appButtonTextLarge, { paddingHorizontal: 15, paddingVertical: 8 }]}>Expired</Text>
                                </TouchableOpacity>
                            </View>
                        </View>)) : null
                }
            </ScrollView>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'center',
        alignItems: 'center',
        backgroundColor: "white",
    },
    appButtonContainer: {
        width: 80,
        height: 30,
        backgroundColor: '#F2385F',
        borderRadius: 8,
        justifyContent: "center"
    },
    appButtonText: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center'
    },
    appButtonContainerLarge: {
        padding: 0,
        width: "100%",
        height: "100%",
        backgroundColor: '#F2385F',
        borderRadius: 8,
        justifyContent: "center",
        marginTop: '0.2%',
        marginLeft: "0%"
    },
    appButtonTextLarge: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 'bold',
        fontSize: 10,
        color: 'white'
    }
})