import React from "react";
import { View,Text, SafeAreaView, ScrollView } from "react-native";
import DatePickerComponent from "./datepicker";
import DetailsCard from "./DetailsCard";

export default function Team(props)
{
    console.log("props= ",props.route.params);
    return(
        <SafeAreaView style={{flex:1}}>
            <ScrollView>
            <View style={{position:'absolute'}}>
                <DatePickerComponent/>
            </View>
                <View style={{flex:1,marginTop:"37%"}}>
                     <DetailsCard props={props.route.params}/>
                    <DetailsCard props={props.route.params}/>
                    <DetailsCard props={props.route.params}/>
                    <DetailsCard props={props.route.params}/>
                    <DetailsCard props={props.route.params}/>
                </View>
           
            </ScrollView>
        </SafeAreaView>
    )
}