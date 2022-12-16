import React from "react";
import { View } from "react-native";


export default function GetTime(){
    var hours = new Date().getHours(); //To get the Current Hours
    var min = new Date().getMinutes(); //To get the Current Minutes
    var sec = new Date().getSeconds(); //To get the Current Seconds

    const getTime=()=>{
        console.log(hours+":"+min+":"+sec);
    }
    return(
        <View>
            <button
                onClick={getTime}
                title='get time'
            />
        </View>
    )
}