import React, { useEffect, useState } from 'react';
import CustomButton from 'components/custom-button';
import CustomInput from 'components/custom-input';
import {
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Colors, Fonts, Images } from 'theme';
import Dropdowns from './view-profile/dropdownpicker';
import ImageUploadd from './imageuploader';
import axios from 'axios';
import CommonModal from 'components/common-modal';
import ResetSuccess from 'components/reset-success';
import validator from 'validator';
import { showError } from 'utils/toast';
import useUser from 'hooks/useUser';

function EditIncident({ route, navigation }) {
  const { getUserFullName, getUserID, getUserImage, getUserEmail, user } = useUser();
  const userId = getUserID()

  useEffect(() => {
    // axios.get(
    //   `https://securitylinksapi.herokuapp.com/api/v1/employee/2/customers`,
    // ).then(res => {
    //   console.log('successfully get response in incident form')
    //   console.log("!!!!!!!!!>>>>>>>>>" + JSON.stringify(res.data.data))
    //   setresponses(res.data.data)
    //   setcustomer(responses[0]?.Customer)
    //   // console.log("Customer namessss",customer)
    //   // setdata(res.data.data.Customer.name)
    // }).catch(e => {
    //   console.log('error')
    //   console.log(e.response.data)
    // })
    (async () => {
      let employeeResponse = await axios.get(`https://securitylinksapi.herokuapp.com/api/v1/employee/profile/${userId}`)
      console.log(1)
      if(employeeResponse.data.employee) {
          console.log(2)
          let employee = employeeResponse.data.employee
          
          let customerResponse = await axios.get(`https://securitylinksapi.herokuapp.com/api/v1/employee/${employee.id}/customers`)
          let customers = customerResponse.data.data
          setcustomer(customers)

          let siteResponse=await axios.get(`https://securitylinksapi.herokuapp.com/api/v1/employee/${employee.id}/sites`)
          if(siteResponse.data.data)
          {
            let siteid = siteResponse.data.data
            setSiteId(siteid)
            console.log("Site ids",siteid)
          }

          // setcopy(customers)
      } else {
          console.log(3)
      }
      console.log(4)
  })()
  }, [])

  const { props } = route.params;
  console.log("Props in editincident", props)

  const [fname, onChangefname] = React.useState(props?.formName||'');
  const [reqaction, onChangereqaction] = React.useState(props?.requiredAction||'');
  const [reqAction, onChangereqAction] = React.useState('');
  const [desc, onChangedesc] = React.useState(props?.description||'');
  const [responses, setresponses] = useState([])
  const [customer, setcustomer] = useState('');
  const [file, onchangeFile] = useState('');
  const [video, onchangeVideo] = useState('')
  const [isPopup, setPopup] = useState(false);
  const [siteid, setSiteId] = useState('')
  const [cust,setcust]=useState(props?.Customer?.name||'')
  const [custId,setcustId]=useState('')
  const [sitename,setsitename]=useState(props?.Site?.name||'')
  const [siteId,setSiteid]=useState('')


  const converttostring = (id) => {
    let value = id.toString()
    return value;
  }
  const site = siteid ? siteid.map((item, index) => (
    { label: item?.name, value: converttostring(item?.id) }
  )) : null
  console.log(site)

  const customers = customer ? customer.map((item, index) => (
    { label: item?.name, value: converttostring(item?.id) }
  )) : null

  console.log("video url got in incidentform", video)
  console.log("document url got in incidentform", file)
  console.log("file uri", file)
  console.log("video uri", video)

  console.log("Customer name", responses[0]?.Customer)
  console.log("customer id", props.Customer.id)
  console.log("Employeeid", props.Employee.id)
  console.log("SiteId", props.Site.id)

  console.log(customer)
  // const custdetails=customer.map((index)=>{index.name,index.id})

  // const data=[
  //   {label: customer?.name, value: '1'},
  // ]

  // {console.log("in incident form",data)}

  const clickhandler = () => {
    // navigation.navigate('CreateEmployee');

    if (validator.isEmpty(custId)) {
      return showError("Please select customer name")
    }
    if (validator.isEmpty(fname)) {
      return showError("Form name is required")
    }
    if (!validator.isAlpha(fname,'en-US', { ignore: ' ' })) {
      return showError("Form name should be in alphabetical form")
    }
    if (!validator.isLength(fname, 3, 50)) {
      return showError("Form name should be between 3 to 50 alphabets")
    }
    if (validator.isEmpty(reqaction)) {
      return showError("Action is required")
    }
    if (!validator.isAlpha(reqaction,'en-US', { ignore: ' ' })) {
      return showError("Required Action should be in alphabetical form")
    }
    if (!validator.isLength(reqaction, 3, 50)) {
      return showError("Required Action should be between 3 to 50 alphabets")
    }
    if (validator.isEmpty(desc)) {
      return showError("Description is required")
    }
    if (!validator.isAlphanumeric(desc,'en-US', { ignore: ' ~!@#$%^&*()-_+={}[]|/\:;"<>,.?' })) {
      return showError("Description should be in alphabetical form")
    }
    if (!validator.isLength(desc, 3, 1000)) {
      return showError("Description should be between 3 to 1000 characters")
    }


    axios.put(
      `https://securitylinksapi.herokuapp.com/api/v1/admin/incidents/${props.id}`,
      {
        customerId: custId?custId:props.Customer.id,
        employeeId: props.Employee.id,
        siteId: siteId?siteId:props.Site.id,
        status: "pending",
        formName: fname,
        requiredAction: reqaction,
        description: desc,
      }
    ).then(res => {
      if (res?.status === 200) {
        setPopup(true)
      }
      console.log('updated successfully')
      console.log(res)
      console.log('success')
      console.log(res)
    }).catch(e => {
      console.log('error')
      console.log(e.response.data)
    })

  };

  return (
    <SafeAreaView style={styles.splashView}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >

        {/* <View style={{justifyContent:'center',alignItems:'center'}}>
                <Text style={{color:'#2A2D43',margin:30,fontSize:15,fontWeight:'600'}}>New Incident</Text>
            </View> */}
        {/* Input Wrapper */}
        <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: '5%', marginTop: "20%" }}>
          <View>
            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600' }}>Customer Name</Text>
            <Dropdowns width={Dimensions.get('window').width - 40} ph={cust?cust:"Name"} data={customers} onchange={(custom,id)=>{
              setcust(custom);
              setcustId(id);
            }}/>
            {/* <CustomInput
              value={names}
              placeholder="Name"
              onChangeText={onChangeName}
              placeholderTextColor={'black'}
            /> */}

            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600' }}>Select Site</Text>
            <View>
              <Dropdowns width={Dimensions.get('window').width - 40} ph={sitename?sitename:"Site name"} data={site} onchange={(custom,id)=>{
              setsitename(custom);
              setSiteid(id);
            }}/>
            </View>
            {/* <CustomInput
              value={entry}
              placeholder="Select Site"  //pehlay yahan Entry tha 
              onChangeText={onChangeentry}
              placeholderTextColor={'black'}
              inputType={'description'}
            /> */}

            {/* <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Submitted By</Text>
            <CustomInput
              value={submission}
              placeholder="Name"
              onChangeText={onChangeSubmission}
              placeholderTextColor={'black'}
            /> */}

            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600' }}>Form Name</Text>
            <CustomInput
              value={fname}
              placeholder="Name"
              onChangeText={onChangefname}
              placeholderTextColor={'black'}
            />

            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600' }}>Required Action</Text>
            <CustomInput
              value={reqaction}
              placeholder="Name"
              onChangeText={onChangereqaction}
              placeholderTextColor={'black'}
            />

            {/* <Text style={{color:'#2A2D43',fontSize:12,fontWeight:'600'}}>Required Action</Text>
            <CustomInput
              value={reqAction}
              placeholder="Name"
              onChangeText={onChangereqAction}
              placeholderTextColor={'black'}
            /> */}

            <Text style={{ color: '#2A2D43', fontSize: 12, fontWeight: '600' }}>Description</Text>
            {/* <CustomInput
              value={desc}
              placeholder="Type here..."
              onChangeText={onChangedesc}
              placeholderTextColor={'black'}
              inputType={'multiline'}
            /> */}
            <TextInput
              value={desc}
              style={styles.inputs}
              placeholder="Type here..."
              onChangeText={onChangedesc}
              placeholderTextColor={'black'}
              multiline={true}
              numberOfLines={4}
            />
          </View>

        </View>

        <View>
          <ImageUploadd
            onChangeFile={(files) => { onchangeFile(files) }}
            onChangeVideo={
              (video) => {
                console.log('*********************')
                console.log(video)
                console.log('hitting api')
                console.log('*********************')
                onchangeVideo(video.uri);
                const fd = new FormData()
                fd.append('video', "Hello")
                axios({
                  method: "post",
                  url: "https://securitylinksapi.herokuapp.com/api/v1/mp-routes/upload/video",
                  data: fd,
                  headers: { "Content-Type": "multipart/form-data" },
                }).then(res => {
                  console.log('&&&&&&&&& success')
                  console.log(res)
                }).catch(e => {
                  console.log('^^^^^ error')
                  console.log(e.response.data)
                })
              }
            }
          />
        </View>

        {/* <View style={{flexDirection:'row',justifyContent:'center'}}>
          <View style={{justifyContent:'center',alignItems:'center',margin:10,borderColor:'black',borderRadius:2}}>
              <TouchableOpacity><Image source={require('../assets/images/uploadmedia.png')} style={{height: 100, width: 130}}/></TouchableOpacity>
          </View>
          <View style={{justifyContent:'center',alignItems:'center',margin:10,borderColor:'black',borderRadius:2}}>
              <TouchableOpacity><Image source={require('../assets/images/icon69.png')} style={{height: 100, width: 130}}/></TouchableOpacity>
          </View>
        </View> */}

        <View>
          <CustomButton
            buttonWrapper={styles.profileButton}
            title={'Add Incident'}
            onButtonPress={clickhandler}
          />
        </View>

        <CommonModal
          isVisible={isPopup}
          component={
            <ResetSuccess
              title={'Incident edited successfully.'}
              onDone={() => {
                setPopup(false);
                navigation.goBack();
              }}
            />
          }
        />
        <View>
          <Text>{'\n'}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default EditIncident;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashView: {
    flex: 1,
  },
  splashText: {
    fontSize: 30,
    color: 'black',
    fontWeight: 'bold',
  },
  input: {
    borderColor: '#7A7C8A',
    borderWidth: 2,
    width: 320,
    borderRadius: 10,

    paddingLeft: 20,
    color: 'black',
    margin: 10,
  },
  inputs: {
    marginTop: 5,
    borderColor: Colors.twoATwoD,
    borderWidth: 2,
    borderRadius: 10,
    padding: 7,
    paddingHorizontal: 16,
    color: Colors.twoATwoD,
    fontFamily: Fonts.Poppins.Regular,
    fontSize: 14,
  },
  splashTextInput: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
  },
  appButtonContainer: {
    borderColor: 'black',
    color: 'green',
    elevation: 8,
    backgroundColor: '#F2385F',
    borderRadius: 10,
    padding: 10,
    marginTop: 12,
    marginLeft: 10,
    justifyContent: 'center',
    width: 320,
    alignItems: 'center',
  },
  appButtonText: {
    fontSize: 18,
    color: 'grey',
    fontWeight: 'bold',
    alignItems: 'center',

    color: 'white',
  },
  tex: {
    color: Colors.twoATwoD,
    fontFamily: Fonts.Poppins.Regular,
    fontSize: 12,
  },
  splashTextInputrow: {
    fontSize: 15,
    color: 'black',
    fontWeight: 'bold',
    margin: 10,
    width: 50,
  },
  inputrow: {
    width: '48%',
  },
  editWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  pencilIcon: {
    height: 11,
    width: 11,
    marginRight: 2,
  },
  contentContainer: {
    flexGrow: 1,
  },
  postalCodeWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileButton: {
    width: '85%',
  },
  skipText: {
    alignSelf: 'center',
    color: Colors.black,
    marginTop: 20,
    fontFamily: Fonts.Poppins.Regular,
  },
});
