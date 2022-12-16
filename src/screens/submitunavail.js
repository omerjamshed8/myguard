import React from "react";
import {View,Text} from 'react-native';
import DatePickerComponent from "./datepicker";
import RadioComponent from "./Radiocomponent";

export default function SubmitUnavailability(props){
    console.log("props= ",props.route.params);
    return(
        <View style={{flex:1}}>
            <View style={{flex:1}}>
                <DatePickerComponent/>
            </View>
            <View style={{flex:5,justifyContent:'center',alignItems:'flex-start',marginLeft:'3%'}}>
                <RadioComponent props={props.route.params}/>
                {/* <RadioComponent props={props.route.params}/> */}
            </View>
        </View>
    )
}