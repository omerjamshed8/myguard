import React from "react";
import { Text,View,StyleSheet,TouchableOpacity, ScrollView } from "react-native";
import Cards from "./card";
import IncidentCard from "./cardcomponent/incidentcard";
import Document from "./Licences/documents";

export default function TimeSheet(){

    const Card=()=>{
    }

    const clickhandler=()=>{

    }

    return(
        <View style={[styles.container,{marginTop:20}]}>
            <ScrollView>
                <Cards/>
                <Cards/>
                <IncidentCard/>
                <Cards/>
                <Cards/>
                <Cards/>
                <Document/>
            </ScrollView>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:"white",
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
        padding:10,
        width:100,
        height:100,
        backgroundColor:'#F2385F',
        borderRadius:8,
        justifyContent:"center",
        alignItems:'center',
        margin:"1%"
    },
    appButtonTextLarge:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        fontWeight:'bold',
        fontSize:17,
        color:'white'
    }
})