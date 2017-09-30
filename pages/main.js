import React, { Component } from 'react';
import {View, Text, TextInput, ScrollView, TouchableHighlight, StyleSheet, BackHandler} from 'react-native';
import {observer, inject} from 'mobx-react/native';

@inject('store')
@observer class MainPage extends Component{
	static navigationOptions = {
	  title: 'this is main page',
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
			<View style ={styles.container}>
				<Text>This is main page</Text>
			</View>
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
