import {keys} from "lodash"
import {omit} from 'lodash'

function Valid(state, action){

    return {
        ...state,
        Validation:{
            FirstInputName:action.paylot.Name,
            FirstInputId:action.paylot.Id
        }
    }
}
function Windows(state, action){
    let text=""
    let NoneFilde=true
    let Name
    if(action.paylot.void=="Reset"){
        text="Do you want to reset current game settings"
        Name=action.paylot.void
    }
    else if(action.paylot.void=="Delete"){
        text="Do you really want to delete current scene"
        Name=action.paylot.void+" Scene"
        
    }
    else if(action.paylot.void=="No"){
        Name=""
        text=""
        NoneFilde=!NoneFilde
    }
    return{
        ...state,
        Void:{
            TypeOfVoid:Name,
            value:action.paylot.value,
            text:text
        },
        NoneFilde:NoneFilde
    }
}
export {Valid, Windows}