import {keys} from "lodash"
import {omit} from 'lodash'

function InputFid(state, action){
    return{
        ...state,
        FirstInputId: action.paylot
    }
}
function InputFN(state, action){
    return{
        ...state,
        FirstInputName: action.paylot
    }
}
function InputSN(state, action){
    return {
        ...state,
        Game:{
            ...state.Game,
            SceneList:{
                ...state.Game.SceneList,
                [action.paylot.v2]:{
                    ...state.Game.SceneList[action.paylot.v2],
                    SceneName : action.paylot.v1,
                }
            }
        },
        
        
    }
}
function InputGT(state, action){
    return {
        ...state,
        Game:{
            ...state.Game,
            SceneList:{
                ...state.Game.SceneList,
                [action.paylot.v2]:{
                    ...state.Game.SceneList[action.paylot.v2],
                    GameType : action.paylot.v1,
                }
            }
        },
        
        
    }
}

function InputNOR(state, action){
    return {
        ...state,
        Game:{
            ...state.Game,
            SceneList:{
                ...state.Game.SceneList,
                [action.paylot.v2]:{
                    ...state.Game.SceneList[action.paylot.v2],
                    NumberOfReels : action.paylot.v1,
                }
            }
        },
        
    }
}
export {InputFid, InputFN, InputSN, InputGT, InputNOR}