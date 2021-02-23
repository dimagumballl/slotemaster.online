import {keys} from "lodash"
import {omit} from 'lodash'

function StartReset(state, action){
    if(state.FirstBut=="Start"){
        return{
            ...state,
            FirstBut:"Reset"
        }
    }
    else{
        return{
            
            
            
                FirstBut:"Start",
                FirstInputId:"",
                FirstInputName:""
            
        }
    }

}
export {StartReset}