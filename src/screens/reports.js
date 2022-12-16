// import { Image, StyleSheet, Text, View } from 'react-native';
// import fonts from 'assets1/assets/fonts/fonts';
// import React from 'react';

// const Reports = (prop) => {
//     console.log("DetailsCard= ",prop.props);
//     // var props=prop.props;
//     var props={
//         date: '11 Feb',
//         Time: '15:00 - 22:00',
//         venue:'Sydney Hotel',
//         status:'Removal',
//         attitude:'Agressive Behavior' 
//     }
//     console.log(fonts);
//     return (
//         <View style={styles.maincontainer}>
//             <View style={styles.box2}>
//                 <View style={styles.avatarbox}>
//                     <Image style={styles.avatarimg} source={props.icon1?{uri:icon1}:require('../assets/images/yellow.png')} />
//                 </View>
//                 <View style={styles.contentbox}>
//                     <Text style={[styles.datetext,{fontWeight:'bold'}]}>{props.Time}</Text>
//                     <Text style={styles.datetext}>{props.venue}</Text>
//                     <Text style={styles.datetext}>{props.status}</Text>
//                     <Text style={styles.nametext}>{props.attitude} </Text>
//                 </View>
//             </View>
//             <View style={{ width: '100%', height: 1, backgroundColor: "#E2E8F0" }} />
//         </View>
//     )
// }

// export default Reports;

// const styles = StyleSheet.create({
//     maincontainer: {
//         width: '100%',
//         height: 120,
//         flexDirection: 'column',


//     },
//     head: {
//         height: 50,
//         backgroundColor: '#F2385F',
//         flex: 2,
//         justifyContent: 'center',
//         paddingHorizontal: 15,
//     },
//     headingtext: {
//         fontSize: 17,
//         fontWeight: 'bold',
//         color: '#FFFFFF'
//     },
//     box2: {
//         flex: 3,
//         flexDirection: 'row',
//         paddingHorizontal: 15

//     },
//     avatarbox: {
//         justifyContent: 'center',
//         width: 46,
//     },
//     avatarimg: {
//         width: 80,
//         height: 80,
//         borderRadius: 6,
//     },
//     contentbox: {
//         justifyContent: 'center',
//         marginHorizontal: 40
//     },
//     datetext: {
//         color: '#2A2D43',
//         fontSize: 15,
//         lineHeight: 18,
//         marginLeft:15,
//         paddingBottom:2,
//         fontFamily:fonts.regular,
//     },
//     nametext: {
//         color: '#2A2D43',
//         fontSize: 15,
//         lineHeight: 18,
//         marginLeft:15,
//         fontFamily:fonts.regular,
//     }

// })


// // import {
// //     View,
// //     Text,
// //     TouchableOpacity,
// //     ScrollView,
// //     Image,
// //     StyleSheet,
// //   } from 'react-native';
// //   import React from 'react';
// //   import { ThemeConsumer } from 'react-native-elements';
// //   import fonts from '../assets1/assets/fonts/fonts';
// //   import colors from '../assets1/assets/colors/colors';
// // //   import icons from '../assets1/assets/icons/icons';
// //   import SemiMediumTitle from '../components/Semi Medium Title';
// //   import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  
// //   export default function Reports({time,location,status,feedback,date,month }) {
// //     return (
// //       <View style={styles.container}>
// //         <View style={styles.rightContainer}>
// //           <View
// //             style={styles.innerContainer}
// //           >
// //             <SemiMediumTitle title={date} alignSelf="center" color={colors.white} marginBottom={-3} />
// //             <SemiMediumTitle title={month} alignSelf="center" color={colors.white} />
// //           </View>
// //         </View>
// //         <View style={styles.leftContainer}>
// //           <Text style={styles.venue}>{time}</Text>
// //           <Text style={styles.time}>{location}</Text>
// //           <Text style={styles.time}>{status}</Text>
// //           <Text style={styles.time}>{feedback}</Text>
// //         </View>
// //       </View>
  
// //     );
// //   }
// //   const styles = StyleSheet.create({
// //     container: {
// //       flexDirection: 'row',
// //       borderWidth: 1,
// //       borderColor: colors.borderColor,
// //       borderRadius: wp(1),
// //       borderRightWidth: wp(2)
// //     },
// //     rightContainer: {
// //       width: "32%",
// //       justifyContent: 'center', alignItems: 'center', borderRadius: wp(12)
// //     },
// //     innerContainer: {
// //       backgroundColor: colors.splash,
// //       height: wp(20), width: wp(20),
// //       justifyContent: 'center'
// //       , alignItems: 'center',
// //       borderRadius: wp(1.5)
// //     },
  
// //     leftContainer: {
// //       flex: 1,
// //       paddingVertical: "2%",
// //       borderRadius: 33,
// //       paddingLeft:wp(3)
// //     },
// //     venue: {
// //       color: "#2A2D43",
// //       fontFamily: fonts.semiBold,
// //     },
// //     // area: {
// //     //   color: "#2A2D43",
// //     //   fontFamily: fonts.Italic,
// //     // },
// //     time: {
// //       color: "##2A2D43",
// //       fontSize: 14,
// //       fontFamily: fonts.medium,
// //     }
// //   });
  
// import {
//     View,
//     Text,
//     TouchableOpacity,
//     ScrollView,
//     Image,
//     StyleSheet,
//   } from 'react-native';
//   import React from 'react';
//   import fonts from '../assets1/assets/fonts/fonts';
//   import colors from '../assets1/assets/colors/colors';
//   import SemiMediumTitle from '../components/Semi Medium Title';
//   import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  
//   export default function DetailsComponent({ venue,area,date,startTime,endTime }) {
//     return (
//       <View style={styles.container}>
//         <View style={styles.rightContainer}>
//           <SemiMediumTitle title="Checked In" alignSelf="center" color={colors.white} marginBottom={-3} />
//           <SemiMediumTitle title="On Site" alignSelf="center" color={colors.white} />
//         </View>
  
//         <View style={styles.leftContainer}>
//           <Text style={{...styles.time,fontSize:wp(4)}}>{venue}</Text>
//           <Text style={styles.area}>{area}</Text>
//           <Text style={styles.time}>{date}</Text>
//           <Text style={styles.time}>{startTime}</Text>
//           <Text style={styles.time}>{endTime}</Text>
//         </View>
//       </View>
  
//     );
//   }
//   const styles = StyleSheet.create({
//     container: {
//       flexDirection: 'row',
//       borderRadius: wp(1),
//       width:"100%",
      
//     },
//     rightContainer: {
//       width: "38.5%",
//       justifyContent: 'center',
//       alignItems: 'center',
//       borderTopLeftRadius:wp(1),
//       borderBottomLeftRadius:wp(1),
//       borderColor:colors.red,
//       backgroundColor: colors.red,
//     },
  
  
//     leftContainer: {
//       flex: 1,
//       paddingVertical: hp(1.5),
//       borderTopRightRadius: wp(1),
//       borderTopEndRadius: wp(1),
//       paddingLeft: wp(4),
//       borderTopWidth: wp(.5),
//       borderBottomWidth: wp(.5),
//       borderRightWidth: wp(.5),
//       borderColor:colors.grey
//     },
//     venue: {
//       color: "#2A2D43",
//       fontFamily: fonts.semiBold,
//     },
//     area: {
//       color: "#2A2D43",
//       fontSize: wp(3.3),
//       fontFamily: fonts.Italic,
//     },
//     time: {
//       color: "#2A2D43",
//       fontSize: wp(3.7),
//       fontFamily: fonts.regular,
//     }
//   });
  

import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    StyleSheet,
  } from 'react-native';
  import React from 'react';
  import fonts from '../assets1/assets/fonts/fonts';
  import colors from '../assets1/assets/colors/colors';
  import SemiMediumTitle from '../components/Semi Medium Title';
  import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
  
  export default function Reports({times,locations,statuss,feedbacks,dates,months }) {
    // var props={
    //             date: '11 Feb',
    //             Time: '15:00 - 22:00',
    //             venue:'Sydney Hotel',
    //             status:'Removal',
    //             attitude:'Agressive Behavior' 
    //         }
    let time='15:00 - 22:00';
    let location='Sydney Hotel';
    let status='Removal';
    let feedback='Agressive Behavior';
    let date='11';
    let month='11 Feb'
    console.log(time);
    return (
      <View style={styles.container}>
        <View style={styles.rightContainer}>
          <View
            style={styles.innerContainer}
          >
            <SemiMediumTitle title={date} alignSelf="center" color={colors.white} marginBottom={-3} />
            <SemiMediumTitle title={month} alignSelf="center" color={colors.white} />
          </View>
        </View>
        <View style={styles.leftContainer}>
          <Text style={styles.venue}>{time}</Text>
          <Text style={styles.time}>{location}</Text>
          <Text style={styles.time}>{status}</Text>
          <Text style={styles.time}>{feedback}</Text>
        </View>
      </View>
  
    );
  }
  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      borderWidth: 1,
      borderColor: colors.borderColor,
      borderRadius: wp(1),
      borderRightWidth: wp(2)
    },
    rightContainer: {
      width: "32%",
      justifyContent: 'center', alignItems: 'center', borderRadius: wp(12)
    },
    innerContainer: {
      backgroundColor: colors.splash,
      height: wp(20), width: wp(20),
      justifyContent: 'center'
      , alignItems: 'center',
      borderRadius: wp(1.5)
    },
  
    leftContainer: {
      flex: 1,
      paddingVertical: "2%",
      borderRadius: 33,
      paddingLeft:wp(3)
    },
    venue: {
      color: "#2A2D43",
      fontFamily: fonts.semiBold,
    },
    // area: {
    //   color: "#2A2D43",
    //   fontFamily: fonts.Italic,
    // },
    time: {
      color: "#2A2D43",
      fontSize: 14,
      fontFamily: fonts.medium,
    }
  });
  