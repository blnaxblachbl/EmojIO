import React, { Component } from 'react';
import {View, Text, TextInput, ScrollView, TouchableHighlight, Dimensions, StyleSheet, BackHandler} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {RkButton, RkTextInput, RkTheme} from 'react-native-ui-kitten';
import LinearGradient from 'react-native-linear-gradient';

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
	render(){
		const {navigate} = this.props.navigation
		return(
			<View style={styles.container}>
				<RkButton style={styles.button} onPress={()=>{navigate('PlayPage')}} rkType='success'>
					<LinearGradient
						colors={['#ffc42a', '#F3902B']}
						start={{x: 0.0, y: 0.5}}
		                end={{x: 1, y: 0.5}}
		                style={styles.linearGradient}
		           	>
					  <Text style={styles.buttonText}>
					    PlAY
					  </Text>
					</LinearGradient>
				</RkButton>
				<RkButton style={styles.button} onPress={()=>{navigate('PlayPage')}} rkType='success'>
					<LinearGradient
						colors={['#ffc42a', '#F3902B']}
						start={{x: 0.0, y: 0.5}}
		                end={{x: 1, y: 0.5}}
		                style={styles.linearGradient}
		           	>
					  <Text style={styles.buttonText}>
					    SETTINGS
					  </Text>
					</LinearGradient>
				</RkButton>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		padding: 30
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
	button: {
		marginTop: 10,
		alignItems: 'stretch',
        paddingVertical: 0,
        paddingHorizontal: 0,
	},
});

export default MainPage;
