import React from "react";
import { View,Text,StyleSheet,TouchableOpacity, SafeAreaView, ScrollView } from "react-native";
import fonts from "assets1/assets/fonts/fonts";

export default function Certificate(){

    const Certificates=()=>{
        return(
            <View style={{height:130,width:"97%",position:'relative',borderWidth:1.5,borderRadius:10,marginTop:"5%",justifyContent:'center'}}>
                <View style={{flexDirection:"row"}}>
                    <Text style={{color:'#2A2D43',textAlign:'center',textAlignVertical:"center",width:"35%",fontFamily:fonts.regular,fontWeight:'400'}}>
                        Hello World
                    </Text>
                    <Text style={{color:'#2A2D43',textAlign:'center',textAlignVertical:"center",width:"35%",fontFamily:fonts.regular,fontWeight:'800'}}>
                        August 17,2021
                    </Text>
                    <View style={{flexDirection:'column'}}>
                        <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                                <Text style={styles.appButtonTextLarge}>Invalid</Text>
                        </TouchableOpacity>
                    </View>
                 </View>
            </View>
        )
    }
    const clickhandler=()=>{

    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Certificates/>
                <Certificates/>
                <Certificates/>
                <Certificates/>
                <Certificates/>
                <Certificates/>
                <Certificates/>
                <Certificates/>
                <Certificates/>
                <Certificates/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
        alignItems:'center',
        margin:10
        // backgroundColor:"white",
    },
    appButtonContainer:{
        width:80,
        height:30,
        backgroundColor:'#F2385F',
        borderRadius:8,
        justifyContent:"center"
    },
    appButtonText:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center'
    },
    appButtonContainerLarge:{
        padding:2,
        width:'auto',
        height:'auto',
        backgroundColor:'#F2385F',
        borderRadius:8,
        justifyContent:"center",
        alignItems:'center',
        margin:"5%"
    },
    appButtonTextLarge:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        fontWeight:'bold',
        fontSize:15,
        color:'white'
    }
})