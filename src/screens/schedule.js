import React from "react";
import { Text,View,SafeAreaView,StyleSheet,TouchableOpacity, ScrollView } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';


function Schedule(){
    const clickhandler=()=>{

    }
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
            <View style={{marginTop:"10%"}}>
                <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Ace Body Corporate Managemnet</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Air Menzies</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Associated Projetcs</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Aston Commercial</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Avenue Village Shopping Centre</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Axiom Security</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Baxter Road Holdings Pty Ltd</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Bellrock TS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Black Camps Pre School</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Bluestone</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.appButtonContainerLarge,{borderColor:'#F2385F'}]} onPress={clickhandler}>
                            <Text style={styles.appButtonTextLarge}>Bowans Hardware</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default Schedule;
const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white'
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
        width:320,
        height:50,
        backgroundColor:'#F2385F',
        borderRadius:8,
        justifyContent:"center",
        alignItems:'center',
        margin:"2%"
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