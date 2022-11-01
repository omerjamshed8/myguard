import React from "react";
import {View,Text,StyleSheet,TouchableOpacity} from 'react-native';

export default function Cards(){
    const Card=()=>{
    }

    const clickhandler=()=>{

    }
    return(
        <View style={styles.container}>
        {/* <ScrollView> */}
        <View style={{height:"95%",width:"95%",borderWidth:1.5,borderRadius:10,margin:10,marginBottom:15}}>
            <View style={{flexDirection:"row"}}>
                <Text style={{color:'black',padding:20,width:'50%',height:"100%",fontWeight:'bold',color:'#2A2D43'}}>
                Air Menzies
                <Text style={{fontWeight:"normal",color:'#2A2D43'}}>
                    {'\n'}
                Tzouroutis
                </Text>
                <Text style={{fontWeight:"bold",color:'#2A2D43',fontFamily:'Poppins'}}>
                {'\n'}
                Mon June 27
                Start : 04:00 (My time : 04:00)
                End : 14:00 (My time : 14:00)
                </Text>
                </Text>
                <View style={{flexDirection:'column',marginLeft:50}}>
                    <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Approve</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Decline</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
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
        width:"95%",
        height:"50%",
        backgroundColor:'#F2385F',
        borderRadius:8,
        justifyContent:"center",
        alignItems:'center',
        marginTop:'0.2%',
        marginLeft:"10%"
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