import React from "react";
import { View,Text, SafeAreaView } from "react-native";
import DetailsCard from "./DetailsCard";

export default function Team(props)
{
    console.log("props= ",props.route.params);
    return(
        <SafeAreaView>
            <DetailsCard props={props.route.params}/>
        </SafeAreaView>
    )
}