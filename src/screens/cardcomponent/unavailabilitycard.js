import React from 'react';
import {View,Text,TouchableOpacity,Image} from 'react-native';

export default function UnavailabilityCard(){

    const clickhandler=()=>{

    }

    return(
        <View style={{flexDirection:"row",borderWidth:1,width:'95%',height:'18%',marginTop:'2%',borderRadius:6,justifyContent:'center'}}>
            <View style={{position:'absolute',backgroundColor:'red',height:"100%",justifyContent:'center',borderRadius:6,left:2}}>
                <Text style={{color:'white',paddingHorizontal:30,fontWeight:'600'}}>Pending</Text>
            </View>
            <View style={{position:"absolute",left:"36%",top:30}}>
                <Text style={{color:'#2A2D43',fontSize:14,fontWeight:'500'}}>Title {'\n'}</Text>
            </View>
            <View style={{position:"absolute",left:"36%",top:50}}>
                <Text style={{color:'#2A2D43',fontStyle:'italic'}}>start date {'\n'}</Text>
            </View>
            <View style={{position:"absolute",left:"36%",top:70}}>
                <Text style={{color:'#2A2D43',fontSize:12}}>End date {'\n'}</Text>
            </View>
            <View style={{position:"absolute",left:"36%",top:90}}>
                <Text style={{color:'#2A2D43',fontSize:14,fontWeight:'500'}}>Type {'\n'}</Text>
            </View>
            <View style={{flexDirection:'row',position:'absolute',left:"80%",top:20}}>
                    <TouchableOpacity onPress={clickhandler} style={{paddingRight:4}}>
                            <Image source={require('../../assets/images/view.png')}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={clickhandler} style={{}}>
                            <Image source={require('../../assets/images/Status.png')}/>
                    </TouchableOpacity>
                </View>
               
        </View>
    )
}