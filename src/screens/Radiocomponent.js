import { View, Text } from 'react-native'
import React from 'react'
import RadioForm from 'react-native-simple-radio-button';
 


const RadioComponent = (prop) => {
  // console.log("Radio= ",prop.props)
  var props=prop.props;
  var description=props.description;
  console.log(description)
  // var radio_props_draft=props.radio_props_draft;
  // var radioAction=props.radioAction;
      var radio_props_approved = [
        {label: 'Unavailable', value: 0 },
        {label: 'Partly Unavailable', value: 1 }
      ];
  return (
    <View>

      <Text style={{
        fontSize: 12,
        fontWeight:"700",
        lineHeight:18,
        color:'#000',
        marginVertical:10

      }}>{description}</Text>
      <RadioForm
       buttonSize={13}
       buttonColor={'#BEBBBB'}
       selectedButtonColor={'#BEBBBB'}
        radio_props={radio_props_approved}
        initial={0}
        formHorizontal={true}
        // style={{marginHorizontal:10, backgroundColor:'red'}}
        labelStyle={{marginRight:10}}
        onPress={ () => {console.log("approved")}}
        />

      {/* <RadioForm
       buttonColor={'#BEBBBB'}
       buttonSize={13}
       selectedButtonColor={'#BEBBBB'}
        radio_props={radio_props_draft}
        initial={0}
        formHorizontal={true}
        // style={{marginHorizontal:10, backgroundColor:'red'}}
        labelStyle={{marginRight:10}}
        onPress={radioAction}
        /> */}
          <Text style={{
        fontSize: 12,
        fontWeight:"700",
        lineHeight:18,
        color:'#000',
        marginVertical:10

      }}>Approved</Text>
      
      <RadioForm
       buttonSize={13}
       buttonColor={'#BEBBBB'}
       selectedButtonColor={'#BEBBBB'}
        radio_props={radio_props_approved}
        initial={0}
        formHorizontal={true}
        // style={{marginHorizontal:10, backgroundColor:'red'}}
        labelStyle={{marginRight:10}}
        onPress={ () => {console.log("approved")}}
        />

    </View>
  )
}

export default RadioComponent;