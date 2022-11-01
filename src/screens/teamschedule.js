import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,ScrollView,SafeAreaView } from "react-native";

export default function TeamSchedule(){
   return(
    <SafeAreaView style={styles.container}>
         <View style={{height:"10%",width:"100%",backgroundColor:"#F2385F",position:'absolute',top:0}}>
                <View style={{alignItems:'center',flex:1,marginTop:"12%"}}>
                    <Text style={{fontWeight:'bold',color:"white",fontSize:20,textAlign:'center'}}>Jun 27-Jul 03</Text>
                </View>
        </View>
        <ScrollView horizontal={true}>
            <View style={{justifyContent:'flex-start',alignItems:'center',marginTop:"30%",display:'flex'}}>
                <Text style={{color:'black',fontSize:16,textAlign:'center',display:'flex'}}>Mon   Tue    Wed     Thu     Fri     Sat     Sun</Text>
                <Text style={{color:'black',fontSize:16,textAlign:'center',display:'flex'}}>27    28     29      30       01      02      03</Text>
            </View>
        </ScrollView>
        {/* <ScrollView> */}
        <View style={{position:'absolute',height:50,width:428,left:0,top:198,backgroundColor:"#F2385F"}}>
            <Text style={{color:'white',display:'flex',textAlign:'left',marginTop:'3%',marginLeft:"4%",fontSize:18}}>Charter Hall - CH VIC (Geelong)</Text>
            <View style={{marginTop:"1%"}}>
                    <View style={{marginTop:'5%',marginLeft:"5%"}}>
                        <Text style={{textAlign:'left',color:'#2A2D43'}}>Email</Text>
                        <Text style={{textAlign:'left',color:'#2A2D43',fontWeight:'bold'}}>abc@xyz.com</Text>
                    </View>
                    <Text style={{marginTop:"3%",color:'#2A2D4314'}}>____________________________________________________</Text>
                </View>
                <View>
                    <View style={{marginTop:'3%',marginLeft:"5%"}}>
                        <Text style={{textAlign:'left',color:'#2A2D43'}}>Phone</Text>
                        <Text style={{textAlign:'left',color:'#2A2D43',fontWeight:'bold'}}>000-1234-567</Text>
                    </View>
                </View>
        </View>
        <View style={{position:'absolute',height:50,width:428,left:0,top:396,backgroundColor:"#F2385F"}}>
            <Text style={{color:'white',display:'flex',textAlign:'left',marginTop:'3%',marginLeft:"4%",fontSize:18}}>Charter Hall - CH VIC (Geelong)</Text>
            <View style={{marginTop:"1%"}}>
                    <View style={{marginTop:'5%',marginLeft:"5%"}}>
                        <Text style={{textAlign:'left',color:'#2A2D43'}}>Email</Text>
                        <Text style={{textAlign:'left',color:'#2A2D43',fontWeight:'bold'}}>abc@xyz.com</Text>
                    </View>
                    <Text style={{marginTop:"3%",color:'#2A2D4314'}}>____________________________________________________</Text>
                </View>
                <View>
                    <View style={{marginTop:'3%',marginLeft:"5%"}}>
                        <Text style={{textAlign:'left',color:'#2A2D43'}}>Phone</Text>
                        <Text style={{textAlign:'left',color:'#2A2D43',fontWeight:'bold'}}>000-1234-567</Text>
                    </View>
                </View>
        </View>
        <View style={{position:'absolute',height:50,width:428,left:0,top:592,backgroundColor:"#F2385F"}}>
            <Text style={{color:'white',display:'flex',textAlign:'left',marginTop:'3%',marginLeft:"4%",fontSize:18}}>Charter Hall - CH VIC (Geelong)</Text>
            <View style={{marginTop:"1%"}}>
                    <View style={{marginTop:'5%',marginLeft:"5%"}}>
                        <Text style={{textAlign:'left',color:'#2A2D43'}}>Email</Text>
                        <Text style={{textAlign:'left',color:'#2A2D43',fontWeight:'bold'}}>abc@xyz.com</Text>
                    </View>
                    <Text style={{marginTop:"3%",color:'#2A2D4314'}}>____________________________________________________</Text>
                </View>
                <View>
                    <View style={{marginTop:'3%',marginLeft:"5%"}}>
                        <Text style={{textAlign:'left',color:'#2A2D43'}}>Phone</Text>
                        <Text style={{textAlign:'left',color:'#2A2D43',fontWeight:'bold'}}>000-1234-567</Text>
                    </View>
                </View>
        </View>
        {/* </ScrollView> */}
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
})