import axios from "axios";
import { UnavailContext } from 'contexts/UnavailContext';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView, SafeAreaView, StyleSheet, Dimensions } from 'react-native';
import { Context } from 'screens/unavailform';
import useUser from "hooks/useUser";
import Dropdowns from "screens/view-profile/dropdownpicker";
import { useIsFocused } from "@react-navigation/native";

export default function UnavailabilityCard({ navigation }) {
    const { getUserID, user } = useUser();
    let userID = getUserID();
    console.log("USER ID consoled in unavailability card", userID)
    const unavailCtx = useContext(UnavailContext)
    const [datas, setdata] = useState(unavailCtx.data)
    console.log("data in unavailability context",unavailCtx.data)
    const [responses, setresponses] = useState('')
    const [label,setLabel]=useState('')
    const [copy,setcopy]=useState();
    const [empId,setempId]=useState()

    const dataa=[{label: 'Pending', value: '1'},
    {label: 'rejected', value: '2'},
    {label: 'Approved', value: '3'},]

    const isFocused=useIsFocused()
    useEffect(() => {
      
        if(isFocused)
        {
            // async function fetchData() {
            //     try {
            //         const response = await fetch(
            //             `https://securitylinksapi.herokuapp.com/api/v1/employee/profile/${userID}`,
            //         );
            //         const json = await response.json();
            //         setempId(json.employee.id);
            //         console.log("Employee ID",json.employee.id);
            //     } catch (e) {
            //         console.error(e);
            //     }
            // };
            // async function fetchUnavail() {
            //     try {
            //         const response = await fetch(
            //             `https://securitylinksapi.herokuapp.com/api/v1/employee/${empId}/unavails`,
            //         );
            //         const json = await response.json();
            //         console.log("Unavailabilities",json);
            //         setresponses(json?.data)
            //         setcopy(json?.data)
            //         unavailCtx.setData(response?.data?.data)

            //     } catch (e) {
            //         console.error(e);
            //     }
            // };
            // fetchData();
            // fetchUnavail();
            // (async function fetchEmployeeId () {
            //     await axios.get(
            //         `https://securitylinksapi.herokuapp.com/api/v1/employee/profile/${userID}`,
            //     ).then(res => {
            //         console.log('successfully got employeeid')
            //         console.log("***********", res.data.employee.id)
            //         setempId(res.data.employee.id)
            //     }).catch(e => {
            //         console.log('error')
            //         console.log(e.response.data)
            //     })
            //     await axios.get(
            //         `https://securitylinksapi.herokuapp.com/api/v1/employee/${empId}/unavails`,
            //     ).then(res => {
            //         console.log('successfully get response')
            //         console.log("!!!!!!!!!>>>>>>>>>", res.data.data)
            //         setresponses(res?.data?.data)
            //         setcopy(res.data.data)
            //         unavailCtx.setData(res?.data?.data)
            //     }).catch(e => {
            //         console.log('error')
            //         console.log(e.response.data)
            //     })
            // })
            (async () => {
                let employeeResponse = await axios.get(`https://securitylinksapi.herokuapp.com/api/v1/employee/profile/${userID}`)
                console.log(1)
                if(employeeResponse.data.employee) {
                    console.log(2)
                    let employee = employeeResponse.data.employee
                    let unavailsResponse = await axios.get(`https://securitylinksapi.herokuapp.com/api/v1/employee/${employee.id}/unavails`)
                    let unavails = unavailsResponse.data.data 
                    setcopy(unavails)
                    setresponses(unavails)
                } else {
                    console.log(3)
                }
                console.log(4)
            })()
        }
    }, [isFocused])

    const clickhandler = () => {

    }
    const presshandler = () => {

    }

    const getColor = (item) => {
        if (item.status.toLowerCase() === 'pending') {
            return '#B90027'
        }
        else if (item.status.toLowerCase() === 'reject') {
            return '#FF0D40'
        }
        else if (item.status.toLowerCase() === 'approved') {
            return '#20A53D'
        }
    }
    const filterstatus=(label)=>{
        console.log('came here')
        console.log("*************",label)
        const arr=responses.filter((item)=>item.status===label.toLowerCase())
        // const arr=responses;
        // console.log("/////////////////",arr)
        setcopy(arr)
    }

    return (
        <SafeAreaView style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
            <View style={{justifyContent:'center',marginTop:-24}}>
            <Dropdowns width={Dimensions.get('window').width} bgcolor="#F2385F" ph={"All"} phcolor={"white"} borderradius={-1} data={dataa}
                onchange={(label)=>{
                    // setLabel(label)
                    filterstatus(label)
                }}
            />
            </View>
            <ScrollView showsVerticalScrollIndicator={false}>
                {   //unavailCtx.data
                    copy ? copy.map((item, index) => (    //data ki jagah responses tha
                        <View key={index} style={[styles.container, { borderRadius: 10, borderWidth: 1.5, width: "98%", marginTop: "2%" }]}>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ backgroundColor: getColor(item), width: "35%", height: "100%", justifyContent: 'center', borderRadius: 6, left: 0 }}>
                                    <Text style={{ color: 'white', paddingHorizontal: 30, fontWeight: '600', textAlign: "center" }}>{item.status}</Text>
                                </View>
                                <Text style={[styles.tex, { paddingLeft: "5%" }]}>
                                {/* <Text style={{ color: '#2A2D43', fontSize: 14, fontWeight: '500' }}>{JSON.stringify(item)} {'\n'}</Text> */}
                                    <Text style={{ color: '#2A2D43', fontSize: 14, fontWeight: '500' }}>{item.title} {'\n'}</Text>
                                    <Text style={{ color: '#2A2D43', fontStyle: 'italic' }}>{item?.startDate} {'\n'}</Text>
                                    <Text style={{ color: '#2A2D43', fontSize: 12 }}>{item?.endDate} {'\n'}</Text>
                                    <Text style={{ color: '#2A2D43', fontSize: 14, fontWeight: '500' }}>{item.type} {'\n'}</Text>
                                </Text>
                                <View style={{ flexDirection: "row", position: "absolute", right: 10, top: 15 }}>
                                    <TouchableOpacity onPress={() => {
                                        navigation.navigate('ViewUnavail', {
                                            props: item
                                        })
                                    }} style={{ paddingRight: 4 }}>
                                        <Image source={require('../../assets/images/view.png')} />
                                    </TouchableOpacity>
                                    {
                                        item.status === 'pending' ?
                                            <TouchableOpacity onPress={() => {
                                                navigation.navigate('EditUnavail', {
                                                    props: item
                                                })
                                            }} style={{}}>
                                                <Image source={require('../../assets/images/Status.png')} />
                                            </TouchableOpacity> : null
                                    }
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
        marginTop: '4%',
        width: "65%"
    }
})