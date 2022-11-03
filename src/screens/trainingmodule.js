import React from "react";
import { View,Text,StyleSheet,TouchableOpacity,ScrollView,SafeAreaView,Image } from "react-native";
import { color } from "react-native-reanimated";

export default function TrainingModule()
{
    const TrainingCard=()=>{
        return(
            <View style={styles.container}>
                <View style={{flexDirection:'row'}}>
                    <Image source={require('../assets/images/yellow.png')} style={styles.userImage}/>
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
    margin:"3%"
  },
  tex:{
    color:'black',
    marginTop:'4%',
    width:"65%"
  }
})