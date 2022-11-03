import React from "react";
import {View,Text} from 'react-native';
import RadioComponent from "./Radiocomponent";

export default function SubmitUnavailability(props){
    console.log("props= ",props.route.params);
    return(
        <View>
            <RadioComponent props={props.route.params}/>
        </View>
    )
}