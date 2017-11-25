import React, { Component } from 'react';
import {View, Text, TextInput, Button, ScrollView, TouchableHighlight, TouchableWithoutFeedback, Alert, Dimensions, StyleSheet, BackHandler, Modal, Animated} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  TwilioVideoLocalView,
  TwilioVideoParticipantView,
  TwilioVideo
} from 'react-native-twilio-video-webrtc'

var {height, width} = Dimensions.get('window');


@inject('store')
@observer class PlayPage extends Component{
	static navigationOptions = {
	  title: 'this is play page',
    header: null,
	}

	constructor(props) {
	  super(props);
	  const {navigate} = this.props.navigation
	  this.state = {
      visible: true,
      participant: true,
      room: 'emojion',
      animLeft: new Animated.Value(-50),
      animRight: new Animated.Value(-50)
    };
	}

  animStartLeft(){
    Animated.timing(this.state.animLeft,{
      toValue: (width/2)-25,
      duration: 5000
    }).start();

    if (this.state.animLeft == (width/2)-25){
      this.setState({animLeft: -50});
      this.animStartRight();
    }
  }

  animStartRight(){
    Animated.timing(this.state.animRight,{
      toValue: (width/2)-25,
      duration: 5000
    }).start();

    if (this.state.animRight == (width/2)-25){
      this.setState({animRight: -50});
      this.animStartLeft();
    }
  }

  twilioFetch = () =>{
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const config = {
      method: 'POST',
      headers, 
      body: JSON.stringify({
        room: 'emojion', 
        username: this.props.store.userName,
      })
    }

    const req = new Request('https://emojion-app.herokuapp.com/', config);
    fetch(req).then(data=>{
      if (data.status == 200){
        this.refs.twilioVideo.connect({roomName: "emojion", accessToken: data._bodyInit});
        this.animStartLeft();
      }else{
        Alert.alert('Emojion', 'Data status: ' + data.status);
      }
    });
  }

  _onVideoDisconnectButtonPress = () => {
    this.refs.twilioVideo.disconnect();
  }

  _onVideoConnectFailure = (response) => {
      Alert.alert('Emojion', 'Connect failure: ' + JSON.stringify(response));
  };

	componentDidMount() {
    this.twilioFetch();
    //this._onVideoConnectButtonPress();
  }

  componentWillUnmount() {
  }

  popy = () =>{
  	if ((this.props.navigation) && (this.props.navigation.state.name === 'MapPage')){
  		return false
  	}else{
  		return true
  	}
  }

  async onDisconnect(){
    const {navigate} = this.props.navigation;
    await this.setState({visible: false});
    navigate('ScorePage', {score: 350});
  }

	render(){
		const {navigate} = this.props.navigation
		return(
        <View style={styles.container}>
          <Modal animationType='fade' transparent={true} visible={this.state.visible}>
            <TouchableHighlight style = {{height: 50, width: 50, backgroundColor: 'transparent'}} underlayColor='transparent' onPress={()=>{this._onVideoDisconnectButtonPress();}}>
              <Icon name='mail-reply-all' style={styles.backIcon} size={25}/>
            </TouchableHighlight>
            <Text style = {{position: 'absolute', top: 15, right: 15, color: 'white', backgroundColor: 'transparent'}}>
              Score: 350
            </Text>
            <View style={styles.circle}/>
            <Animated.View style={{
              height: 50, 
              width: 50, 
              backgroundColor: 'red', 
              position: 'absolute',
              top: (height/2)-40,
              left: this.state.animLeft,
              alignSelf: 'center',
              borderColor: 'transparent',
              borderRadius: 25,
            }}/>
            <Animated.View style={{
              height: 50, 
              width: 50, 
              backgroundColor: 'red', 
              position: 'absolute',
              top: (height/2)-40,
              right: this.state.animLeft,
              alignSelf: 'center',
              borderColor: 'transparent',
              borderRadius: 25,
            }}/>
            <View style={{flexDirection: 'row', top: -15}}>
              <View style={styles.leftline} />
              <View style={styles.rightline} />
            </View>
          </Modal> 
          <TwilioVideo 
            ref="twilioVideo" 
            onRoomDidFailToConnect={this._onVideoConnectFailure} 
            onRoomDidDisconnect={()=>{this.onDisconnect()}}/>
          <TwilioVideoLocalView style={styles.videoViewContainer}/>
          <TwilioVideoParticipantView style={styles.videoViewContainer}/>
        </View>
		);
	}
}
/*
            <View style={styles.videoControls}>
                <TouchableWithoutFeedback onPress={this._onVideoConnectButtonPress}>
                    <View style={styles.videoControlBtn}>
                        <Text style={styles.videoControlBtnText}>CONNECT</Text>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={this._onVideoDisconnectButtonPress}>
                    <View style={styles.videoControlBtn}>
                        <Text style={styles.videoControlBtnText}>DISCONNECT</Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>

            <View style={styles.container}>
                <TwilioVideo 
                  ref="twilioVideo" 
                  onRoomDidFailToConnect={this._onVideoConnectFailure} 
                  onRoomDidDisconnect={()=>{this.onDisconnect()}}/>
                <TwilioVideoLocalView style={styles.videoViewContainer}/>
                <TwilioVideoParticipantView style={styles.videoViewContainer}/>
            </View>
*/

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black'
    },
    videoViewParent: {
        width: '100%',
        height: 150,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF'
    },
    videoViewContainer: {
        flex:1,
        width: width,
        height: height/2,
        backgroundColor: 'black'
    },
    videoControls: {
        height: 50,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center'
    },
    videoControlBtn: {
        flex: 0.5,
        backgroundColor: '#FF0000'
    },
    videoControlBtnText: {
        fontSize: 20,
        padding: 10,
        color: '#FFFFFF',
        textAlign: 'center'
    },
    backIcon:{
      position: 'absolute',
      zIndex: 1,
      top: 15,
      left: 15,
    },
    circle:{
      height: 50, 
      width: 50, 
      borderWidth: 2, 
      borderRadius: 25, 
      borderColor: 'white', 
      backgroundColor: 'transparent', 
      position: 'absolute',
      top: (height/2)-40, 
      alignSelf: 'center',
    },
    leftline: {
      height: 1, 
      borderBottomWidth: 4, 
      top: (height/2)-50,
      width: (width/2)-25, 
      borderColor: 'white'
    },
    emoji: {
      
    },
    rightline: {
      height: 1, 
      marginLeft: 50,
      borderBottomWidth: 4, 
      top: (height/2)-50,
      width: (width/2)-25, 
      borderColor: 'white'
    },
});

export default PlayPage;
