import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
  } from 'react-native';
  import React, {useState} from 'react';
  import {Calendar} from 'react-native-calendars';
  import {DATE_PICK} from '../../assets1/images';
  import {FONTS} from '../../assets1/Style/font';
  
  const DatePick = ({width,open, onChange,fontsize,calendarbgcolor}) => {
    console.log("open",open)
    const [cal, setCal] = useState(false);
    const [selectedDATE, setDATE] = useState('');
    function OPEN() {
      open===true?
      setCal(!cal)
      :null
    }
    const calenderClick = date => {
      console.log(date, 'DATE--->');
      setDATE(date);
  
      setCal(!cal);
    };
    let Today = new Date().toDateString();
    return (
      <View style={{flex: 1, alignItems: 'center', marginTop: 20}}>
        <View
          style={{
            width: width,  //"100%"
            height: 45,
            backgroundColor: '#fff',
            borderColor: '#F2385F',
            borderWidth: 2,
            borderRadius: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 10,
          }}>
          <Text style={{fontFamily: FONTS.MEDIUM,color:'black',fontSize:fontsize}}>
            {selectedDATE.dateString || Today}
          </Text>
          <TouchableOpacity
            style={{height: 30, width: 30}}
            onPress={() => OPEN()}>
            <Image
              source={DATE_PICK}
              resizeMode={'contain'}
              style={{height: 25, width: 30,position:'absolute',right:0}}
            />
          </TouchableOpacity>
        </View>
        {cal && (
          <Calendar
            enableSwipeMonths
            disabledDaysIndexes={[0, 6]}
            style={{
              width: Dimensions.get('screen').width,
              // height: 150,
            }}
            theme={{
              calendarBackground: calendarbgcolor?calendarbgcolor:'#000',
              textMonthFontFamily: FONTS.MEDIUM,
              dayTextColor: '#F2385F',
              textDisabledColor: '#4A5660',  //#ff3 #4A5660
              monthTextColor: '#ff0000',
              selectedDayTextColor: '#4A5660', //#ff0000
              indicatorColor: '#4A5660',
              textDayFontFamily: FONTS.MEDIUM,
              textMonthFontFamily: FONTS.MEDIUM,
              textDayHeaderFontFamily: FONTS.MEDIUM,
              selectedDayBackgroundColor:"#F2385F",
              selectedDayTextColor:"white",
              // textDayFontWeight: '300',
              textSectionTitleDisabledColor: '#d9e1e8',
  
              // textMonthFontWeight: 'bold',
              // textDayHeaderFontWeight: '300',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 16,
            }}
            minDate={new Date().toDateString()}
            //   pastScrollRange={20}
            // Max amount of months allowed to scroll to the future. Default = 50
            //   futureScrollRange={2}
            // Enable or disable scrolling of calendar list
            //   scrollEnabled={true}
            // Enable or disable vertical scroll indicator. Default = false
            showScrollIndicator={true}
            onDayPress={date => {
              console.log('selected day============>', date);
              calenderClick(date);
              if(typeof onChange === 'function') {
                onChange(date.dateString.split('-').join('/'))
              }
            }}
          />
        )}
      </View>
    );
  };
  
  export default DatePick;
  
  const styles = StyleSheet.create({});