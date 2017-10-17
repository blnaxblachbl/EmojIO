import React, { Component } from 'react';
import {View, Text, TextInput, ScrollView, TouchableHighlight, Dimensions, StyleSheet, BackHandler, Modal, Animated} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import WebRTC from '../component/webrtc';

var {height, width} = Dimensions.get('window');

@inject('store')
@observer class MainPage extends Component{
	static navigationOptions = {
	  title: 'this is play page',
    header: null,
	}

	constructor(props) {
	  super(props);
	  const {navigate} = this.props.navigation
	  this.state = {
      visible: true,
      animLeft: new Animated.ValueXY({x: 0, y: (height/2)-50})
    };
	}

  startAnims(){
    Animated.timing(this.state.animLeft,{
      toValue: {x: (width/2)+25 , y: (height/2)-50},
      duration: 10000
    }).start();
  }

	componentDidMount() {
    this.startAnims();
  	BackHandler.addEventListener('hardwareBackPress', this.popy);
  }
  componentWillUnmount() {
  	BackHandler.removeEventListener('hardwareBackPress', this.popy);
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
    setTimeout(()=>{this.props.navigation.goBack();},500)
  }
	render(){
		const {navigate} = this.props.navigation
		return(
      <View style={styles.container}>
      <Modal animationType='fade' transparent={true} visible={this.state.visible}>
        <Modal animationType='fade' transparent={true} visible={this.state.visible}>
          <TouchableHighlight style = {{height: 50, width: 50, backgroundColor: 'transparent'}} underlayColor='transparent' onPress={()=>{this.closeFun();}}>
            <Icon name='mail-reply-all' style={styles.backIcon} size={25}/>
          </TouchableHighlight>
          <Text style = {{position: 'absolute', top: 15, right: 15, color: 'white', backgroundColor: 'transparent'}}>
            Score: 350
          </Text>
          <View style={styles.circle}/>
          <View style={{
            height: 50, 
            width: 50, 
            backgroundColor: 'red', 
            position: 'absolute',
            top: +this.state.animLeft.x,
            left: +this.state.animLeft.y,
            alignSelf: 'center',
            borderColor: 'transparent',
            borderRadius: 25,
          }}/>
          <View style={{flexDirection: 'row'}}>
            <View style={styles.leftline} />
            <View style={styles.rightline} />
          </View>
        </Modal>  
  			<WebRTC />
      </Modal> 
      </View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  circle:{
    height: 50, 
    width: 50, 
    borderWidth: 2, 
    borderRadius: 25, 
    borderColor: 'white', 
    backgroundColor: 'transparent', 
    position: 'absolute',
    top: (height/2)-25, 
    alignSelf: 'center',
  },
  backIcon:{
    position: 'absolute',
    zIndex: 1,
    top: 15,
    left: 15,
  }
});

export default MainPage;
