import React from "react";
import { View } from 'react-native'
import IncidentCard from "./cardcomponent/incidentcard";
import Dropdowns from "./view-profile/dropdownpicker";
import { Dimensions } from "react-native";
import colors from 'theme/colors';


export default function IncidentListing() {
    const data=[{label: 'Pending', value: '1'},
    {label: 'Reject', value: '2'},
    {label: 'Approved', value: '3'},]
    return (
        <View style={{marginTop:-25}}>
            <Dropdowns width={Dimensions.get('window').width} bgcolor="#F2385F" ph={"All"} phcolor={"white"} borderradius={-1} data={data}/>
            <IncidentCard />
        </View>
    )
}