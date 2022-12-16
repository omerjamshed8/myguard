import React,{useState,useRef} from "react";

import { SafeAreaView,StyleSheet,View,Text, Alert } from "react-native";

import Video from 'react-native-video';

// import MediaControls from 'react-native-media-controls';

const PLAYER_STATES = {
    PLAYING: 0,
    PAUSED: 1,
    ENDED: 2,
}

export default function Playerss(){
    // console.log(PLAYER_STATES)
    const videoPlayer=useRef();
    const [currentTime,setCurrentTime]=useState(0);
    const [duration,setDuration]=useState(0);
    const [isFullScreen,setIsFullScreen]=useState(false);
    const [isLoading,setIsLoading]=useState(true);
    const [paused,setPaused]=useState(false);
    const [playerState,setPlayerState]=useState(PLAYER_STATES?.PLAYING ?? 0);
    const [screenType,setScreenType]=useState('contain');

    const onSeek=(seek)=>{
        //handler for change in seek bar
        videoPlayer.current.seek(seek);
    }

    const onPaused=(playerState)=>{
        //Handler for video paused
        setPaused(!paused);
        setPlayerState(playerState);
    }

    const onReplay=()=>{
        //Handler for Replay
        setPlayerState(PLAYER_STATES.PLAYING);
        videoPlayer.current.seek(0);
    }

    const onProgress=(data)=>{
        //video player progress continues even if it ends
        if(!isLoading && playerState!==PLAYER_STATES.ENDED)
        {
            setCurrentTime(data.currentTime);
        }
    }

    const onLoad=(data)=>{
        setDuration(data.duration);
        setIsLoading(false);
    }

    const onLoadStart=(data)=>{
        setIsLoading(true);
    }

    const onEnd=()=>{
        setPlayerState(PLAYER_STATES.ENDED)
    };

    const onError=()=>{
        Alert.alert("Error Playing video");
    }

    const exitFullScreen=()=>{
        Alert.alert("Exit full screen");
    }

    const enterFullScreen=()=>{
        setIsFullScreen(isFullScreen);
        if(screenType=='content'){
            setScreenType('cover');
        }
        else
        {
            setScreenType('content');
        }
    }

    const renderTollbar=()=>{
        <View>
            <Text style={styles.Toolbar}>toolbar</Text>
        </View>
    }

    const onSeeking=(currentTime)=>{
        setCurrentTime(currentTime);
    }

    return(
        <SafeAreaView style={{flex:1}}>
            <Video 
                onEnd={onEnd}
                onLoad={onLoad}
                onLoadStart={onLoadStart}
                onProgress={onProgress}
                paused={paused}
                ref={videoPlayer}
                resizeMode={screenType}
                onFullScreen={isFullScreen}
                source={{
                    uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
                }}
                style={styles.mediaPlayer}
                volume={1.0}
                controls={true}
                fullscreen={true}
                // fullscreenAutorotate={'portrait'}
                fullscreenOrientation={'landscape'}
                />
                {/* <MediaControls
                    duration={duration}
                    isLoading={isLoading}
                    mainColor="#333"
                    onFullScreen={isFullScreen}
                    onPaused={onPaused}
                    onReplay={onReplay}
                    onSeek={onSeek}
                    onSeeking={onSeeking}
                    playerState={playerState}
                    onProgress={currentTime}
                    toolbar={renderTollbar()}
                    /> */}
        </SafeAreaView>
    )
}
// export default Playerss;
const styles=StyleSheet.create({
    container:{
        flex:1
    },
    Toolbar:{
        marginTop:30,
        backgroundColor:'white',
        padding:10,
        borderRadius:5
    },
    mediaPlayer:{
        position:'absolute',
        top:0,
        left:0,
        bottom:0,
        right:0,
        backgroundColor:'black',
        justifyContent:'center'
    }
})
