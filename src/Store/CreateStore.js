import {createStore} from 'redux';  
import MainReducer from './reducers/MainReducer';  
 
/*Create a function called configureStore */
 
export default function configureStore() {  
  return createStore(MainReducer);
}