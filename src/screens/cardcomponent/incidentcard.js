import { useIsFocused } from "@react-navigation/native";
import axios from "axios";
import { UnavailContext } from 'contexts/UnavailContext';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Context } from 'screens/unavailform';
import Dropdowns from "screens/view-profile/dropdownpicker";
import { Fonts } from "theme";
import fonts from "theme/fonts";

export default function UnavailabilityCard({ navigation }) {
    const unavailCtx = useContext(UnavailContext)
    console.log(unavailCtx.data)
    const [data, setdata] = useState(unavailCtx.data)
    console.log("??????????", data)
    const [copy,setcopy]=useState();
    const [responses, setresponses] = useState('')
    const [label,setLabel]=useState('')
    console.log(label)
    // console.log("RESPONSE copy in incident card",copy)
    // console.log("customer status in incident card:",responses[0].Customer.status)
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused ) {
            axios.get(
                "https://securitylinksapi.herokuapp.com/api/v1/admin/incidents",
            ).then(res => {
                console.log('successfully get response in incidentcard')
                console.log("!!!!!!!!!>>>>>>>>>", res.data.data)
                setresponses(res.data.data)
                setcopy(res.data.data)
            }).catch(e => {
                console.log('error')
                console.log(e.response.data)
            })
        }
    }, [isFocused])

    const datas=[{label: 'Pending', value: '1'},
    {label: 'rejected', value: '2'},
    {label: 'Approved', value: '3'},]

    const clickhandler = () => {

    }
    const presshandler = () => {

    }
    const getColor = (item) => {
        if (item.status.toLowerCase() === 'pending') {
            return '#B90027'
        }
        else if (item.status.toLowerCase() === 'rejected') {
            return '#FF0D40'
        }
        else if (item.status.toLowerCase() === 'approved') {
            return '#20A53D'
        }
    }

    const filterstatus=(label)=>{
        console.log("*************",label)
        const arr=responses.filter((item)=>item.status===label.toLowerCase())
        // const arr=responses;
        console.log("/////////////////",arr)
        setcopy(arr)
    }
    const dateconverter = (date) => {
        createdat = new Date(date)
        newdate=createdat.getFullYear() + '-' + (createdat.getMonth() + 1) + '-' + createdat.getDate()
        return newdate
    }

    return (
        <SafeAreaView style={[styles.container,{justifyContent:'center',alignItems:'center'}]}>
            {
                responses===''?
                        <Text style={{fontFamily: fonts.Poppins.Medium,color: '#2A2D43',textAlign:'center',fontSize:16}}>No Available Report</Text>
                    :null
            }

            <View style={{justifyContent:'center',marginTop:-24}}>
            <Dropdowns width={Dimensions.get('window').width} bgcolor="#F2385F" ph={"All"} phcolor={"white"} borderradius={-1} data={datas}
                onchange={(label)=>{
                    // setLabel(label)
                    filterstatus(label)
                }}
            />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {
                    copy ? copy.map((item,index) => (
                        //height mein view mein nai thi aur pehly text waly view mein 100% thi
                        <View key={index} style={[styles.container, { borderRadius: 10, borderWidth: 1.5,height:130, width: "98%", marginTop: "5%",justifyContent:"center",alignItems:"center" }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{backgroundColor: getColor(item), width: "35%", height: 128, justifyContent: 'center', borderRadius: 6, left: 0 }}>
                                    <Text style={{ color: 'white', paddingHorizontal: 20, textAlign: "center",fontFamily:Fonts.Poppins.Bold }}>{item.status}</Text>
                                </View>
                                <Text style={[styles.tex, { paddingLeft: "5%",alignItems:"center" }]}>
                                    <Text style={{ color: '#2A2D43', fontSize: 14,fontFamily:fonts.Poppins.Medium }}>{item.Customer.name} {'\n'}</Text>
                                    <Text style={{ color: '#2A2D43', fontStyle: 'italic',fontFamily:fonts.Poppins.SemiBold }}>{item.Customer.locationId} {'\n'}</Text>
                                    <Text style={{ color: '#2A2D43', fontSize: 12,fontFamily:fonts.Poppins.Medium }}>{dateconverter(item.Customer.createdAt)} {'\n'}</Text>
                                    <Text style={{ color: '#2A2D43', fontSize: 16, fontWeight: '500' }}>{item.type} {'\n'}</Text>
                                </Text>
                                <View style={{ flexDirection: "row", position: "absolute", right: 10, top: 15 }}>
                                    <TouchableOpacity onPress={()=>{
                                        navigation.navigate('ViewIncident',{
                                            props:item
                                        }
                                        )
                                    }} style={{ paddingRight: 4 }}>
                                        <Image source={require('../../assets/images/view.png')} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('EditIncident', {
                                            props: item
                                        })
                                    }} style={{}}>
                                        <Image source={require('../../assets/images/Status.png')} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        // <View style={{ flexDirection: "row", borderWidth: 1, width: '95%', height: '18%', marginTop: '2%', borderRadius: 6, justifyContent: 'center', alignItems: 'center' }}>
                        //     <View style={{ position: 'absolute', backgroundColor: 'red', width: "34%", height: "100%", justifyContent: 'center', borderRadius: 6, left: 2 }}>
                        //         <Text style={{ color: 'white', paddingHorizontal: 30, fontWeight: '600', textAlign: "center" }}>{item.status}</Text>
                        //     </View>
                        //     <View style={{ position: "absolute", left: "36%", top: 30 }}>
                        //         <Text style={{ color: '#2A2D43', fontSize: 14, fontWeight: '500' }}>{item.title} {'\n'}</Text>
                        //     </View>
                        //     <View style={{ position: "absolute", left: "36%", top: 50 }}>
                        //         <Text style={{ color: '#2A2D43', fontStyle: 'italic' }}>{item.startDate} {'\n'}</Text>
                        //     </View>
                        //     <View style={{ position: "absolute", left: "36%", top: 70 }}>
                        //         <Text style={{ color: '#2A2D43', fontSize: 12 }}>{item.endDate} {'\n'}</Text>
                        //     </View>
                        //     <View style={{ position: "absolute", left: "36%", top: 90 }}>
                        //         <Text style={{ color: '#2A2D43', fontSize: 14, fontWeight: '500' }}>{item.type} {'\n'}</Text>
                        //     </View>
                        //     <View style={{ flexDirection: 'row', position: 'absolute', left: "80%", top: 20 }}>
                        //         <TouchableOpacity onPress={clickhandler} style={{ paddingRight: 4 }}>
                        //             <Image source={require('../../assets/images/view.png')} />
                        //         </TouchableOpacity>
                        //         <TouchableOpacity onPress={()=>{navigation.navigate('EditUnavail',{
                        //             props:item
                        //         })}} style={{}}>
                        //             <Image source={require('../../assets/images/Status.png')} />
                        //         </TouchableOpacity>
                        //     </View>
                        // </View>
                    )) : null
                }
            </ScrollView>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent:'center',
    },
    userImage: {
        width: 80,
        height: 80,
        borderRadius: 10,
        // position:'absolute',
        // left:24,
        // marginTop:10,
        margin: 15
    },
    tex: {
        color: 'black',
        marginTop: '12%',
        width: "65%"
    }
})

// import React from 'react';
// import {View,Text,TouchableOpacity,Image} from 'react-native';

// export default function IncidentCard(){

//     const clickhandler=()=>{

//     }

//     return(
//         <View style={{flexDirection:"row",borderWidth:1,width:'95%',height:'40%',marginTop:'2%',borderRadius:6,justifyContent:'center'}}>
//             <View style={{position:'absolute',backgroundColor:'red',height:"100%",justifyContent:'center',borderRadius:6,left:2}}>
//                 <Text style={{color:'white',paddingHorizontal:30,fontWeight:'600'}}>Pending</Text>
//             </View>
//             <View style={{position:"absolute",left:"36%",top:30}}>
//                 <Text style={{color:'black',fontWeight:'500'}}>Customer {'\n'}</Text>
//             </View>
//             <View style={{position:"absolute",left:"36%",top:54}}>
//                 <Text style={{color:'black',fontStyle:'italic'}}>location {'\n'}</Text>
//             </View>
//             <View style={{position:"absolute",left:"36%",top:78}}>
//                 <Text style={{color:'black',fontSize:12,fontWeight:'500'}}>2022 June 27,02:47Pm {'\n'}</Text>
//             </View>
//             <View style={{flexDirection:'row',position:'absolute',left:"80%",top:20}}>
//                     <TouchableOpacity onPress={clickhandler} style={{paddingRight:4}}>
//                             <Image source={require('../../assets/images/view.png')}/>
//                     </TouchableOpacity>
//                     <TouchableOpacity onPress={clickhandler} style={{}}>
//                             <Image source={require('../../assets/images/Status.png')}/>
//                     </TouchableOpacity>
//                 </View>
               
//         </View>
//     )
// }