import { observable, action } from 'mobx';
import { Alert } from 'react-native';

export default class Store {
  @observable query = '';
  @observable userName = '';

  
}
