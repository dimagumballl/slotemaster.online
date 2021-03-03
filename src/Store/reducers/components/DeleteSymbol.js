import {keys} from "lodash"
import {omit} from 'lodash'

function DeleteSymbol(state, action){
    let symbols = state.Game.SceneList[action.paylot.v1].Symbols
    
    
    symbols={
        
        ...omit(symbols,action.paylot.v2)
    }
    let sarray=keys(symbols)
    
    
    for(let i = 0;i<sarray.length;i++){
        
        
        symbols={
            ...symbols,
            [sarray[i]]:{
                ...symbols[sarray[i]],
                Paytable:{
                    ...omit(symbols[sarray[i]].Paytable, sarray.length+1)

                }
            }
        }
       
        
    }
    for(let i = 0;i<sarray.length;i++){
        
       
        symbols={
            ...symbols,
            [sarray[i]]:{
                ...symbols[sarray[i]],
                Substiture:{
                    ...omit(symbols[sarray[i]].Substiture, action.paylot.v2)

                }
            }
        }
       
        
    }
    
    
    return {
        ...state,
        Game:{
            ...state.Game,
            SceneList:{
                ...state.Game.SceneList,
                [action.paylot.v1]:{
                    ...state.Game.SceneList[action.paylot.v1],
                    
                    Symbols:{
                        
                        ...symbols
                    },
                }
            }
        },
        
    }
}
export {DeleteSymbol}