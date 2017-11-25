import React, { Component } from 'react';

import {
	AppRegistry,
	StyleSheet,
	View,
	Text,
	DeviceEventEmitter
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';

import {
	observer,
	inject
} from 'mobx-react/native';

import {
	RkButton,
	RkTextInput,
	RkTheme
} from 'react-native-ui-kitten';

@inject('store')
@observer class LoginPage extends Component{

	static navigationOptions = {
	  header: null,
	}

	constructor(props) {
		super(props);
		this.state = {
			userName: "",
			userPass: ""
		}
	}

	validate = () =>{
		console.log("validate open");
		const {navigate} = this.props.navigation
		if(this.state.userName){
			this.props.store.userName = this.state.userName;
			navigate('MainPage');
		}else {
			alert("Заполните все блять!!!")
		}
	}

	render() {
		const {navigate} = this.props.navigation
		return (
			<View style={styles.container}>
				<RkTextInput placeholder=' User name' rkType='rounded' onChangeText={(text) => this.setState({userName : text})}/>
				<RkTextInput secureTextEntry={true} placeholder=' User password' rkType='rounded' onChangeText={(text) => this.setState({userPass : text})}/>
				<RkButton style={styles.button} onPress={this.validate.bind(this)} rkType='success'>
					<LinearGradient
						colors={['#ffc42a', '#F3902B']}
						start={{x: 0.0, y: 0.5}}
                        end={{x: 1, y: 0.5}}
                        style={styles.linearGradient}
                   	>
					  <Text style={styles.buttonText}>
					    SIGN IN
					  </Text>
					</LinearGradient>
				</RkButton>
			</View>
		);
	}
}

RkTheme.setType('RkButton', 'success', {
	width: '100%',
	height: 55,
	borderRadius: 30,
	backgroundColor: 'transparent'
});

const styles = StyleSheet.create({
  	container: {
	    flex: 1,
	    justifyContent: 'center',
	    alignItems: 'center',
		backgroundColor: '#F5FCFF',
		padding: 30
	},
	button: {
		marginTop: 10,
		alignItems: 'stretch',
        paddingVertical: 0,
        paddingHorizontal: 0,
	},
	linearGradient: {
		flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
	},
	buttonText: {
		fontSize: 18,
		textAlign: 'center',
		color: '#ffffff',
		backgroundColor: 'transparent',
	},
});

export default LoginPage;
