import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
// import DropDownPicker from 'react-native-dropdown-picker';
import {Dropdown} from 'react-native-element-dropdown';
import {FONTS} from './font';

import DateTimePicker from 'react-native-modal-datetime-picker';
const data = [
  {label: 'Punjab', value: '1'},
  {label: 'Sindh', value: '2'},
  {label: 'Baloch', value: '3'},
  {label: 'jeorgea', value: '4'},
  {label: 'Sharga', value: '5'},
];
const statess=[{
  countrys:"Pakistan",id:1,states:"Punjab",genders:"Male",startdates:"16-12-2022",enddates:"20-12-2022",statuss:"Active"
},
{
  countrys:"India",id:2,states:"Punjab",genders:"female",startdates:"16-12-2022",enddates:"20-12-2022",statuss:"inActive"
},
{
  countrys:"Argentina",id:3,states:"Punjab",startdates:"16-12-2022",enddates:"20-12-2022"
},
{
  countrys:"Portugal",id:4,states:"Punjab",startdates:"16-12-2022",enddates:"20-12-2022"
}
]
const Dropdowns = ({navigation,ph}) => {
  console.log(ph)
  const [gender, setGender] = useState('male');
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    {label: 'Punjab', value: 1},
    {label: 'Sindh', value: 2},
  ]);

  function onSelect(item) {
    // console.log(item);
    let Arr = [];
    Arr.push(item);
    setItems(Arr);
    console.log(items);
  }
  const [value, setValue] = useState(null);
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
      <View style={{justifyContent:'space-between',width:'49%'}}>
        <Text
          style={{fontFamily: FONTS.MEDIUM}}>
          Poppin medium
        </Text>
        {/* <View style={{height: 100}}>
          <DropDownPicker />
        </View> */}
        <View style={{width:"100%"}}>
          <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}    //data tha pehlay yahan
            maxHeight={200}
            labelField="label"
            valueField="value"
            placeholder={ph}
            searchPlaceholder="Search..."
            value={value}
            onChange={item => {
              console.log(item.value);
              setValue(item.value);
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
    color: '#000',
    // backgroundColor: '#000',
    borderColor: '#000',
    backgroundColor: 'white',
    borderWidth: 1,
    // padding: 15,
    borderRadius: 10,
    borderWidth:1.5
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
    textAlign:'center'
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: FONTS.MEDIUM,
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