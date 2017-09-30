import React, {Component} from 'react';
import {DeviceEventEmitter} from 'react-native';
import {observer, inject} from 'mobx-react/native';

@inject('store')
@observer class CheckPage extends Component{
	static navigationOptions = {
	  header: null,
	}

	constructor(props) {
	  super(props);
	  const {navigate} = this.props.navigation
	  this.state = {};
	}

}

export default CheckPage;
