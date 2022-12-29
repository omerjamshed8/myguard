import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
  } from 'react-native';
  import DocumentPicker from 'react-native-document-picker';
  import Video from 'react-native-video';
  
  import React, {useState, useCallback} from 'react';
//   import DropDownPicker from 'react-native-dropdown-picker';
  import {UPLOAD_ICON, PDF_ICON, Close} from '../assets1/images';
  import {FONTS} from '../assets1/Style/font';
  import ImagePicker from 'react-native-image-picker';
  import {launchImageLibrary} from 'react-native-image-picker';
import CustomButton from 'components/custom-button';
  
  const DocUploader = () => {
    const [filePath, setFilePath] = useState({});
    const [selectedVideo, setSelectedVideo] = useState({});
    const [SelDOCUMENT, setDOCUMENT] = useState({});
    console.log(selectedVideo);
    const requestExternalWritePermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'External Storage Write Permission',
              message: 'App needs write permission',
            },
          );
          // If WRITE_EXTERNAL_STORAGE Permission is granted
          return granted === PermissionsAndroid.RESULTS.GRANTED;
        } catch (err) {
          console.warn(err);
          alert('Write permission err', err);
        }
        return false;
      } else return true;
    };
    const UPloadVideo = async () => {
      console.log('sjdjks');
      let isStoragePermitted = await requestExternalWritePermission();
      let options = {
        mediaType: 'video',
        maxWidth: 300,
        maxHeight: 550,
        quality: 1,
      };
      if (isStoragePermitted) {
        launchImageLibrary(options, response => {
          if (!response.didCancel) {
            const [value] = response?.assets?.map(item => {
              console.log(item);
              if (item) return item;
            });
            console.log(
              'Response = ',
              //  response.assets.map(item => item),
              value.uri,
            );
            let video = value.uri;
            setSelectedVideo(value);
          }
  
          if (response.didCancel) {
            alert('User cancelled camera picker');
            return;
          } else if (response.errorCode == 'camera_unavailable') {
            alert('Camera not available on device');
            return;
          } else if (response.errorCode == 'permission') {
            alert('Permission not satisfied');
            return;
          } else if (response.errorCode == 'others') {
            alert(response.errorMessage);
            return;
          }
          console.log('base64 -> ', response.base64);
          console.log('uri -> ', response.uri);
          console.log('width -> ', response.width);
          console.log('height -> ', response.height);
          console.log('fileSize -> ', response.fileSize);
          console.log('type -> ', response.type);
          console.log('fileName -> ', response.fileName);
          setFilePath(response);
        });
      }
    };
    const handleDocumentSelection = useCallback(async () => {
      try {
        const response = await DocumentPicker.pickSingle({
          type: [DocumentPicker.types.images,
            DocumentPicker.types.pdf,
          
          ],
          presentationStyle: 'fullScreen',
        });
  
        console.log(response);
        setDOCUMENT(response);
      } catch (err) {
        console.warn(err);
      }
    }, []);
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <View style={{alignItems: 'center', marginBottom: 20}}>
            <Text>{'\n'}</Text>
            <View
              style={{
                // justifyContent: ,
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 80,
                height: 80,
                borderRadius: 20,
                borderWidth: 1,
                color: '#000',
                backgroundColor: '#000',
              }}></View>
            <Text style={{fontFamily: FONTS.MEDIUM, fontSize: 15, color: '#000'}}>
              FileName'{' '}
            </Text>
          </View>
          <View style={{alignItems: 'center', marginBottom: 20, marginLeft:20,marginRight:20}}>
            <Text>{'\n'}</Text>
            <View
              style={{
                // justifyContent: ,
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 80,
                height: 80,
                borderRadius: 20,
                borderWidth: SelDOCUMENT.name ?0:1,
                // color: '#000',
                backgroundColor: SelDOCUMENT.name ?null:'#000' ,
              }}>
  {SelDOCUMENT.name  &&(
              <Image
              style={{
                width: 100,
                height: 100,
                // borderRadius: 20,
                // backgroundColor: '#000',
              }}
              source={PDF_ICON}
              resizeMode={'contain'}
            />)}
              </View>
            <Text style={{fontFamily: FONTS.MEDIUM, fontSize: SelDOCUMENT.name ?10:15, color: '#000', width:80}}>
            {SelDOCUMENT.name || 'PDFNAME'}{' '}
            </Text>
          </View>
          
          {/* <View style={{alignItems: 'center'}}>
            <Image
              style={{
                width: 100,
                height: 100,
                // borderRadius: 20,
                // backgroundColor: '#000',
              }}
              source={PDF_ICON}
              resizeMode={'contain'}
            />
  
            <Text style={{fontFamily: FONTS.MEDIUM, fontSize: 15, color: '#000'}}>
              {SelDOCUMENT.name || 'PDFNAME'}{' '}
            </Text>
          </View> */}
          <View style={{alignItems: 'center'}}>
          <Text>{'\n'}</Text>
            <View
              style={{
                // justifyContent: ,
                alignItems: 'center',
                justifyContent: 'space-between',
                width: 80,
                height: 80,
                borderRadius: 20,
                borderWidth: 1,
                color: '#000',
                backgroundColor: '#000',
              }}>
              {selectedVideo.uri && (
                <View>
                  <Video
                    source={{uri: selectedVideo?.uri}}
                    style={{width: 100, height: 100, borderRadius: 20}}
                    // controls={true}
                    resizeMode="cover"
  
                    // ref={(ref) => {
                    // this.player = ref
                    // }}
                  />
  
                  <TouchableOpacity
                    style={{
                      height: 50,
                      width: 50,
                      position: 'absolute',
                      top: 10,
                      left: 5,
                    }}
                    onPress={() => setSelectedVideo({})}>
                    <Image
                      source={Close}
                      style={{
                        height: 20,
                        width: 20,
                        tintColor: '#fff',
                        backgroundColor: '#000',
                        borderRadius: 50,
                        // position: 'absolute',
                        // top: -90,
                        // left: 6,
                      }}
                      resizeMode={'contain'}
                    />
                  </TouchableOpacity>
                </View>
              )}
            </View>
            <Text style={{fontFamily: FONTS.MEDIUM, fontSize: 15, color: '#000'}}>
              {selectedVideo.fileName || 'VideoName'}{' '}
            </Text>
          </View>
        </View>
  
        <View style={{flexDirection: 'row',justifyContent:'center'}}>
          <TouchableOpacity
            style={{
              marginHorizontal: 20,
              height: 100,
              width: 100,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#000',
              borderStyle: 'dashed',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          
            onPress={() => UPloadVideo()}
            >
            <Image
              source={UPLOAD_ICON}
              resizeMode={'contain'}
              style={{height: 30, width: 30}}
            />
            <Text style={{fontFamily:FONTS.MEDIUM, fontSize:10,color:'#000'}}>Upload Media</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              height: 100,
              width: 100,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: '#F2385F',
              borderStyle: 'dashed',
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 0,
            }}
            onPress={() => handleDocumentSelection()}
            
            
            >
            <Image
              source={UPLOAD_ICON}
              resizeMode={'contain'}
              style={{height: 30, width: 30}}
            />
               <Text style={{fontFamily:FONTS.MEDIUM, fontSize:10, color:'#000'}}>Upload File</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={{
            width: "90%",
            height: 50,
            marginTop: 30,
            backgroundColor: '#F2385F',
            borderRadius: 12,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: '#fff', fontFamily: FONTS.BOLD, fontSize: 12}}>
            {' '}
            Add Incident{' '}
          </Text>
        </TouchableOpacity>
        {/* <View>
          <CustomButton
            buttonWrapper={styles.profileButton}
            title={'Add Incident'}
          />
          </View> */}
      </View>
    );
  };
  
  export default DocUploader;
  
  const styles = StyleSheet.create({
    profileButton: {
        width: '85%',
      },
  });