import {keys} from "lodash"
import {omit} from 'lodash'

function AddSymbol(state, action){
    let PayT={}
    let Subst={}
    let masKey
    let N=0
    let symbols=state.Game.SceneList[action.paylot].Symbols
    let S={}
 
    let State = state
    
    if(keys(state.Game.SceneList[action.paylot].Symbols).length==0)
    {
        
        N=0;
        PayT={
            ...PayT,
            1:0
        }
        symbols={
            
            [N]:{
                name:"Symbol_"+N,
                id:"s"+N+"w",
                Paytable:{
                    [N+1]:0
                },
                Substiture:{
                    ["Symbol_"+N]:false
                   
                },
                Special:{
                    isWild:false,
                    isScatter:false,
                    isSpecific:false
                }
            },
            
        }
        
    }
        
    else
        {
            
            let C = false
            while(!C){
                
                C=true;
                for(let i = 0;i<keys(state.Game.SceneList[action.paylot].Symbols).length;i++)
            
                {
                    if(N==keys(state.Game.SceneList[action.paylot].Symbols)[i])
                    C=false;
                }
                if(!C)
                    N++;
            
            }
            
            
            masKey=keys(State.Game.SceneList[action.paylot].Symbols)
            for(var i = 0;i<masKey.length+1;i++)
            {
                if(i<masKey.length)
                symbols={
                    ...symbols,
                    [masKey[i]]:{
                        ...symbols[masKey[i]],
                        Paytable:{
                            ...symbols[masKey[i]].Paytable,
                            [masKey.length+1]:0
                           
                        }
                    }
                }
                
                
            }
            
            for(let i = 1;i<=masKey.length+1;i++)
            {
                
                PayT={
                    ...PayT,
                    [i]:0
                }
                if(i<masKey.length+1)
                Subst={
                    ...Subst,
                    [symbols[masKey[i-1]].name]:false
                }
                else
                Subst={
                    ...Subst,
                    ["Symbol_"+N]:false
                }
            }
            for(var i = 0;i<masKey.length+1;i++)
            {
                if(i<masKey.length)
                symbols={
                    ...symbols,
                    [masKey[i]]:{
                        ...symbols[masKey[i]],
                        Substiture:{
                            ...symbols[masKey[i]].Substiture,
                            ["Symbol_"+N]:false
                            
                        }
                    }
                }
                
                
            }
            symbols={
              ...symbols,
              [N]:{
                name:"Symbol_"+N,
                id:"s"+N+"w",
                Paytable:{
                    ...PayT,
                },
                Substiture:{
                    ...Subst
                },
                Special:{
                    isWild:false,
                    isScatter:false,
                    isSpecific:false
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
                [action.paylot]:{
                    ...state.Game.SceneList[action.paylot],
                    
                    Symbols:{
                        ...symbols
                    },
                }
            }
        },
        
    }
}

export {AddSymbol}