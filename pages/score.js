import React, { Component } from 'react';
import {View, Text, TextInput, ScrollView, TouchableHighlight, Dimensions, StyleSheet, BackHandler} from 'react-native';
import {observer, inject} from 'mobx-react/native';
import {RkButton, RkTextInput, RkTheme} from 'react-native-ui-kitten';
import LinearGradient from 'react-native-linear-gradient';

@inject('store')
@observer class ScorePage extends Component{
	static navigationOptions = {
	  title: 'this is score page',
	  headerLeft: null
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
		const {params} = this.props.navigation.state
		return(
			<View style={styles.container}>
				<Text> Your score: {params.score}</Text>
				<RkButton style={styles.button} onPress={()=>{navigate('MainPage')}} rkType='success'>
					<LinearGradient
						colors={['#ffc42a', '#F3902B']}
						start={{x: 0.0, y: 0.5}}
		                end={{x: 1, y: 0.5}}
		                style={styles.linearGradient}
		           	>
					  <Text style={styles.buttonText}>
					    BACK TO MAIN
					  </Text>
					</LinearGradient>
				</RkButton>
				<RkButton style={styles.button} onPress={()=>{}} rkType='success'>
					<LinearGradient
						colors={['#ffc42a', '#F3902B']}
						start={{x: 0.0, y: 0.5}}
		                end={{x: 1, y: 0.5}}
		                style={styles.linearGradient}
		           	>
					  <Text style={styles.buttonText}>
					    SCORE TABLE
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

export default ScorePage;
