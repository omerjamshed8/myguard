import React from "react";
import { useState } from "react";
import { View,StyleSheet,SafeAreaView,Text, TextInput, Image, TouchableOpacity } from "react-native";

export default function TeamMessage(){
    const [msg,setmsg]=useState("");

    function MsgCard(){
        console.log("in msg component");
        return(
            <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#2A2D43'}}>
                <Text style={{color:'white'}}>{msg}</Text>
            </View>
        )
    }

    const clickhandler=()=>{
        console.log(msg);
        return (
        <View>
            <MsgCard/>
        </View>
        )
    }

    return(
        <View style={{flex:1,justifyContent:'flex-end'}}>
            <View style={{flexDirection:'row',justifyContent:'center'}}>
                <TextInput 
                    placeholder="Type a message"
                    placeholderTextColor={'#2A2D43'}
                    style={{borderColor:"#2A2D43",borderWidth:1,width:'90%',height:'100%',color:'#2A2D43'}}
                    multiline={true}
                    numberOfLines={4}
                    value={msg}
                    onChangeText={setmsg}
                >
                </TextInput>
                <View style={{position:'absolute',top:7,right:25}}>
                <TouchableOpacity onPress={clickhandler}><Image source={require('../assets/images/sendicon.png')}/></TouchableOpacity>
                </View>
            </View>
        </View> 
    )
}