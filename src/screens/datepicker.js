import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import styles from './style';
import { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MediumTitle from '../components/MediumTitle/MediumTitle';
import SmallText from '../components/SmallText/SmallText';
import SemiMediumTitle from '../components/Semi Medium Title';
import icons from '../assets1/assets/icons/icons';
import colors from '../assets1/assets/colors/colors';


const DatePickerComponent = () => {
    const [checked, setChecked] = useState('first');
    const [fourMonth, setFourMonth] = useState([])
    const [check, setCheck] = useState(false);
    const [index, setIndex] = useState(0);
    const [weekIndex, setWeekIndex] = useState([])
    const [week, setWeek] = useState(["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"])
    const [months, setMonths] = useState(["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"])
    const [month, setMonth] = useState();
    const [page, setCurrentPage] = useState(0);
    const [changeColor, setChangeColors] = useState(false)
    const [data, setData] = useState([])

    useEffect(() => {
        storeNextFourMonthDates();
    }, [])

    const storeNextFourMonthDates = () => {
        for (let i = 0; i < 360; i++) {
            var day = new Date();
            day.setDate(day.getDate() + i);
            let date = day.getDate();
            let daysName = day.getDay();
            let month = day.getMonth();
            let year = day.getFullYear();

            data.push({
                dateStr: day,
                dateNumber: date,
                daysName: daysName,
                monthName: month,
                year: year,
                isSelected: "false"
            })
        }

        setCheck(true)
    }

    const updateDataArray = (position) => {
        let newArr = data.map((item, index) => {
            if (index == position) {
                return { ...item, isSelected: item.isSelected == "true" ? "false" : "true" }
            }
            return item;
        })
        setData(newArr);
        console.log(newArr);
    }

    return (
        <View style={styles.container}>
            <View style={styles.topContainer} >
                {/* <TouchableOpacity onPress={() => {}}>
                <MediumTitle title={data ? months[data[page]?.monthName]+", "+data[page]?.year+" >"  : '' }/>
            </TouchableOpacity> */}
                {/* <View style={{flexDirection:'row'}}> */}
                <TouchableOpacity onPress={() => { page > 7 ? setCurrentPage(page - 7) : setCurrentPage(0) }} style={{ paddingHorizontal: 10 }}>

                    <Image resizeMode="contain" source={icons.backArrow}
                        style={styles.iconRight} />

                </TouchableOpacity>
                <TouchableOpacity onPress={() => { }}>
                    <MediumTitle color={colors.white} title={data ? months[data[page]?.monthName] + ", " + data[page]?.year + " >" : ''} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { setCurrentPage(page + 7) }} style={{ paddingHorizontal: 10, }}>
                    <Image source={icons.backArrow}
                        resizeMode="contain"
                        style={styles.iconLeft} />
                </TouchableOpacity>
                {/* </View> */}
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around',width:"100%" }}>
                {
                    data.map((obj, index) => {
                        if (index >= page && index < page + 7) {
                            return (
                                <View>
                                    <SmallText text={week[obj.daysName]} />
                                    <TouchableOpacity
                                        style={{
                                            width: 45,
                                            height: 45,
                                            padding: 10,
                                            borderRadius: 45,
                                            backgroundColor: data[index]?.isSelected == "true" ? colors.headingBlack : "transparent",
                                        }}
                                        onPress={() => {
                                            setChangeColors(changeColor)
                                            updateDataArray(index);
                                        }}
                                    >
                                        <SemiMediumTitle title={obj.dateNumber} color={data[index]?.isSelected == "true" ? colors.white : colors.black} alignSelf='center' />
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                    })
                }
            </View>

        </View>
    )
}

export default DatePickerComponent