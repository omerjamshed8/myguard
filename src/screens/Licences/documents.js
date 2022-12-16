import React from "react";
import {View,Text,StyleSheet,TouchableOpacity, Image} from 'react-native';

export default function Document(){
    const Card=()=>{
    }

    const clickhandler=()=>{

    }
    return(
        <View style={styles.container}>
        {/* <ScrollView> */}
        <View style={{height:"auto",width:"95%",borderWidth:1.5,borderRadius:10,margin:10,marginBottom:15}}>
            <View style={{flexDirection:"row"}}>
                <Text style={{color:'black',padding:20,width:'50%',height:"100%",fontWeight:'bold',color:'#2A2D43'}}>
                Document Name
                <Text style={{fontWeight:"normal",color:'#2A2D43',fontStyle:'italic'}}>
                    {'\n'}
                Document Type
                </Text>
                <Text style={{color:'#2A2D43',fontWeight:'500'}}>
                {'\n'}
                Date Added: 2022 June 20
                Date Expire: 2024 June 20
                {'\n'}
                </Text>
                <Text style={{color:'#2A2D43',fontFamily:'Poppins',fontStyle:'italic'}}>
                Renewal Period
                </Text>
                </Text>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={clickhandler} style={{marginTop:20,marginLeft:80,padding:4}}>
                            <Image source={require('../../assets/images/view.png')} style={{height:30,width:30}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={clickhandler} style={{padding:4,marginTop:20,marginLeft:4}}>
                            <Image source={require('../../assets/images/Status.png')} style={{height:30,width:30}}/>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{display:'flex',position:'absolute',top:100,right:20}}>
                <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={[styles.appButtonTextLarge,{paddingHorizontal:15,paddingVertical:8}]}>Expired</Text>
                    </TouchableOpacity>
            </View>
        </View>
    </View>
    )
}


const styles=StyleSheet.create({
    container:{
        flex:1,
        // justifyContent:'center',
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
        padding:0,
        width:"100%",
        height:"100%",
        backgroundColor:'#F2385F',
        borderRadius:8,
        justifyContent:"center",
        marginTop:'0.2%',
        marginLeft:"0%"
    },
    appButtonTextLarge:{
        textAlign:'center',
        justifyContent:'center',
        alignItems:'center',
        fontWeight:'bold',
        fontSize:10,
        color:'white'
    }
})