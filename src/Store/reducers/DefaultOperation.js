import {keys} from "lodash"
import {omit} from 'lodash'

import initialState from './initialState';
import CreateScene from './components/CreateScene'
import {InputFid, InputFN, InputSN, InputGT, InputNOR} from './components/Inputs'
import {DeleteScene} from './components/Deletes'
import {Select, SelectMC} from './components/Select' 
import {StartReset} from './components/StartReset'
import {AddSymbol} from './components/AddSymbol'
import {DeleteSymbol} from './components/DeleteSymbol'

 function DefaultOpration(state = initialState, action){
    switch(action.type) {
        
        
        case "ADD_NEW_SCENE": {
            return CreateScene(state, action)
        }
        case "ADD_SYMBOL": {
            return AddSymbol(state, action)
        }
        case "DELETE_SCENE":{
         return DeleteScene(state, action)
        }
        case "DELETE_SYMBOL":{
            return DeleteSymbol(state, action)
           }
        case "SELECT":{
            return Select(state, action)
        }
        case "SELECT_MENU_CONFIG":{
            return SelectMC(state, action)
        }
        case "START_RESET":{
            return StartReset(state, action)
        }
        case "INPUT_FID":{
            return InputFid(state, action)
        }
        case "INPUT_FNAME":{
           return InputFN(state, action)
        }
        case "INPUT_SCENE_NAME": {
            return InputSN(state, action)
        }
        case "INPUT_NUM_REELS": {
            return InputNOR(state, action)
        }
        case "INPUT_GAME_TYPE": {
            return InputGT(state, action)
        }
        default: return state;
    }
} 
export default DefaultOpration;