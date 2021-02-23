import {keys} from "lodash"
import {omit} from 'lodash'

function DeleteSymbol(state, action){
    return {
        ...state,
        Game:{
            ...state.Game,
            SceneList:{
                ...state.Game.SceneList,
                [action.paylot.v1]:{
                    ...state.Game.SceneList[action.paylot.v1],
                    
                    Symbols:{
                        
                        ...omit(state.Game.SceneList[action.paylot.v1].Symbols,action.paylot.v2)
                    },
                }
            }
        },
        
    }
}
export {DeleteSymbol}