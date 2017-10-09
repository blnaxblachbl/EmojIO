import React, { Component } from 'react';
import {View, Text, TextInput, ScrollView, TouchableHighlight, Dimensions, StyleSheet, BackHandler, Modal} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import WebRTC from '../component/webrtc';
import Icon from 'react-native-vector-icons/FontAwesome';

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
    };
	}

	componentDidMount() {
  	BackHandler.addEventListener('hardwareBackPress', this.popy);
  }
  componentWillUnmount() {
    this.setState({visible: false});
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
      <View style={styles.container}>
        <Modal transparent={true} visible={this.state.visible}>
          <TouchableHighlight style = {{height: 50, width: 50, backgroundColor: 'transparent'}} onPress={()=>{this.props.navigation.goBack();}}>
            <Icon name='mail-reply-all' style={styles.backIcon} size={25}/>
          </TouchableHighlight>
        </Modal>  
  			  <WebRTC />
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
  backIcon:{
    position: 'absolute',
    zIndex: 1,
    top: 15,
    left: 15,
  }
});

export default MainPage;
