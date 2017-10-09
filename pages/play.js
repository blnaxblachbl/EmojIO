import React, { Component } from 'react';
import {View, Text, TextInput, ScrollView, TouchableHighlight, Dimensions, StyleSheet, BackHandler} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import WebRTC from '../component/webrtc';

@inject('store')
@observer class MainPage extends Component{
	static navigationOptions = {
	  title: 'this is play page',
    header: null,
	}

	constructor(props) {
	  super(props);
	  const {navigate} = this.props.navigation
	  this.state = {};
	}

	componentDidMount() {
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
	render(){
		const {navigate} = this.props.navigation
		return(
			<WebRTC />
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default MainPage;
