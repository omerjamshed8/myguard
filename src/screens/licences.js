import React from "react";
import { Text,View,StyleSheet,TouchableOpacity,SafeAreaView, ScrollView } from "react-native";

export default function Licences(){

    const LicenceCard=()=>{
        return(
        <View style={{height:100,width:"97%",position:'relative',borderWidth:1.5,borderRadius:10,marginTop:"5%",justifyContent:'center'}}>
                <View style={{flexDirection:"row"}}>
                    <Text style={{color:'black',textAlign:'center',textAlignVertical:"center",width:"35%"}}>
                        Hello World
                    </Text>
                    <Text style={{color:'black',textAlign:'center',textAlignVertical:"center",width:"35%",fontWeight:'bold'}}>
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
            <View style={{height:"8%",width:"100%",backgroundColor:"#F2385F",position:'absolute',top:0,zIndex:22}}>
                <View style={{flexDirection:"row",justifyContent:'space-between',alignItems:'center',flex:1,marginTop:2,marginLeft:"10%",marginRight:'15%'}}>
                    <Text style={{fontWeight:'bold',color:"white",fontSize:17,margin:"auto"}}>Reminder</Text>
                    <Text style={{fontWeight:'bold',color:"white",fontSize:17,margin:"auto"}}>Due Date</Text>
                    <Text style={{fontWeight:'bold',color:"white",fontSize:17,margin:"auto"}}>Status</Text>
                </View>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center',position:'relative',marginTop:"20%",marginBottom:"20%"}}>
                <LicenceCard/>
                <LicenceCard/>
                <LicenceCard/>
                <LicenceCard/>
                <LicenceCard/>
                <LicenceCard/>
                <LicenceCard/>
                </View>
            </ScrollView>
        </SafeAreaView>
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