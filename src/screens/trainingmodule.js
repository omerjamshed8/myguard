import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,ScrollView,SafeAreaView,Image } from "react-native";
import { color } from "react-native-reanimated";
import Playerss from './videoplayer';

export default function TrainingModule({navigation})
{
    const presshandler=()=>{
        navigation.navigate('Playerss');
    }
    const TrainingCard=()=>{
        return(
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <TouchableOpacity onPress={presshandler}>
                    <Image source={require('../assets/images/videoicon.png')} style={styles.userImage}/>
                    </TouchableOpacity>
                    <Text style={styles.tex}>
                        <Text style={{fontWeight:"bold",fontSize:15,fontFamily:'Poppins'}}>Clock out with customer {'\n'}</Text>
                        <Text style={styles.tex}>This video will show you how to clock out using the customer approval feature</Text>
                    </Text>
                </View>
                <View
                    style={{
                        borderBottomColor: 'black',
                        borderBottomWidth: StyleSheet.hairlineWidth,
                    }}
                    />
            </View>
        )
    }

    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TrainingCard/>
                <TrainingCard/>
                <TrainingCard/>
                <TrainingCard/>
                <TrainingCard/>
                <TrainingCard/>
                <TrainingCard/>
                <TrainingCard/>
                <TrainingCard/>
                <TrainingCard/>
            </ScrollView>
            
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    // justifyContent:'center',
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    // position:'absolute',
    // left:24,
    // marginTop:10,
    margin:15
  },
  tex:{
    color:'black',
    marginTop:'4%',
    width:"65%"
  }
})