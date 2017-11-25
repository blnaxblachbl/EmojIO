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
      visible: true,
      room: 'emojion',
    };
	}
  // tit = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2YwNjRiYTdmZDRkYzZkYmUwNDg3ODVkNDVhNDgxMjdjLTE1MTEyMzE2NzMiLCJpc3MiOiJTS2YwNjRiYTdmZDRkYzZkYmUwNDg3ODVkNDVhNDgxMjdjIiwic3ViIjoiQUNjZjkxYzJkZmVjNGEyYjEyYTgyZGMzMzdlNzRmYTExOSIsImV4cCI6MTUxMTIzNTI3MywiZ3JhbnRzIjp7ImlkZW50aXR5IjoicmVhY3QiLCJ2aWRlbyI6eyJyb29tIjoibG9sIn19fQ.5NaWG6H3Vc4MdmBR9XIsYEuBjADvphqIFYrOQfLGhP8'
  // kinat = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2YwNjRiYTdmZDRkYzZkYmUwNDg3ODVkNDVhNDgxMjdjLTE1MTEwNzY3MzUiLCJpc3MiOiJTS2YwNjRiYTdmZDRkYzZkYmUwNDg3ODVkNDVhNDgxMjdjIiwic3ViIjoiQUNjZjkxYzJkZmVjNGEyYjEyYTgyZGMzMzdlNzRmYTExOSIsImV4cCI6MTUxMTA4MDMzNSwiZ3JhbnRzIjp7ImlkZW50aXR5IjoicmVhY3QyIiwidmlkZW8iOnsicm9vbSI6ImVtb2ppb24ifX19.85W7s-8hyBkty4rdMv45scsCaVZUyS5LBxqJYQGgakw'
  _onVideoConnectButtonPress = () => {
    //this.refs.twilioVideo.connect({roomName: "emojion", accessToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2YwNjRiYTdmZDRkYzZkYmUwNDg3ODVkNDVhNDgxMjdjLTE1MTEwNzY2NzgiLCJpc3MiOiJTS2YwNjRiYTdmZDRkYzZkYmUwNDg3ODVkNDVhNDgxMjdjIiwic3ViIjoiQUNjZjkxYzJkZmVjNGEyYjEyYTgyZGMzMzdlNzRmYTExOSIsImV4cCI6MTUxMTA4MDI3OCwiZ3JhbnRzIjp7ImlkZW50aXR5IjoicmVhY3QiLCJ2aWRlbyI6eyJyb29tIjoiZW1vamlvbiJ9fX0.xpm0niVR2UpqX3ZuupVw-kIJTmb7xkf4LPXwdCLRS6A'});
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

  closeFun(){
    this.setState({visible: false});
    setTimeout(()=>{this.props.navigation.goBack();},200)
  }

  async onDisconnect(){
    await this.setState({visible: false});
    this.props.navigation.goBack();
  }

	render(){
		const {navigate} = this.props.navigation
		return(
      <Modal animationType='fade' transparent={true} visible={this.state.visible}>
        <View style={styles.container}>
          <Modal animationType='fade' transparent={true} visible={this.state.visible}>
            <TouchableHighlight style = {{height: 50, width: 50, backgroundColor: 'transparent'}} underlayColor='transparent' onPress={()=>{this._onVideoDisconnectButtonPress();}}>
              <Icon name='mail-reply-all' style={styles.backIcon} size={25}/>
            </TouchableHighlight>
            <Text style = {{position: 'absolute', top: 15, right: 15, color: 'white', backgroundColor: 'transparent'}}>
              Score: 350
            </Text>
            <View style={styles.circle}/>
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
      </Modal>
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
