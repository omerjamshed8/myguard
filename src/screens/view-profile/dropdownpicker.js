import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
// import DropDownPicker from 'react-native-dropdown-picker';
import { Dropdown } from 'react-native-element-dropdown';
import { FONTS } from './font';

import DateTimePicker from 'react-native-modal-datetime-picker';
const datas = [
  { label: 'Punjab', value: '1' },
  { label: 'Sindh', value: '2' },
  { label: 'Baloch', value: '3' },
  { label: 'jeorgea', value: '4' },
  { label: 'Sharga', value: '5' },
];

const Dropdowns = ({ navigation, ph, disable, width,height, bgcolor, phcolor, initialtype, borderradius, data, onchange }) => {
  const [gender, setGender] = useState('male');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: 'Punjab', value: 1 },
    { label: 'Sindh', value: 2 },
  ]);

  function onSelect(item) {
    // console.log(item);
    let Arr = [];
    Arr.push(item);
    setItems(Arr);
    console.log(items);
  }
  const [value, setValue] = useState(null);
  // console.log("Value=",value);
  const [isFocus, setIsFocus] = useState(false);

  const renderItem = item => {
    return (
      <View style={styles.item}>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };
  return (
    <>
      <View style={{ justifyContent: 'space-between', width: '49%' }}>
        <Text
          style={{ fontFamily: FONTS.MEDIUM }}>
        </Text>
        {/* <View style={{height: 100}}>
          <DropDownPicker />
        </View> */}
        <View style={{ width: width }}>
          <Dropdown
            style={[styles.dropdown, {height:height?height:50, backgroundColor: bgcolor, borderRadius: borderradius ? borderradius : 10 }]}
            placeholderStyle={[styles.placeholderStyle, { color: phcolor ? phcolor : '#000' }]}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data ? data : datas}    //data tha pehlay yahan
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={ph}  //pehlay ph tha
            searchPlaceholder="Search..."
            disable={disable}
            value={value}
            onChange={item => {
              console.log(item.value);
              setValue(item.label);
              if (typeof onchange === 'function') {
                onchange(item.label,item.value)
              }
            }}
            renderItem={renderItem}
          />
        </View>
      </View>
    </>
  );
};

export default Dropdowns;

const styles = StyleSheet.create({
  touchable: {
    backgroundColor: '#000',
    borderRadius: 20,
    width: 200,
    height: 60,
  },
  dropdown: {
    height: 50,
    width: '100%',
    fontSize: 12,
    color: '#2A2D43',
    // backgroundColor: '#000',
    borderColor: '#2A2D43',
    backgroundColor: 'white',
    borderWidth: 1,
    // padding: 15,
    borderRadius: 10,
    borderWidth: 2
  },
  containerStyle: {
    backgroundColor: '#ff3',
    fontSize: 12,
    fontWeight: '100',
  },
  //   dropdown: {
  //     margin: 16,
  //     height: 50,
  //     backgroundColor: 'white',
  //     borderRadius: 12,
  //     padding: 12,
  //     shadowColor: '#000',
  //     shadowOffset: {
  //       width: 0,
  //       height: 1,
  //     },
  //     shadowOpacity: 0.2,
  //     shadowRadius: 1.41,

  //     elevation: 2,
  //   },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: '#000',
  },
  placeholderStyle: {
    fontSize: 12,
    fontFamily: FONTS.MEDIUM,
    color: '#000',
    textAlign: 'center'
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    textAlign: 'center',
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
    color: '#000',
  },
});