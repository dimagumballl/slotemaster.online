import {keys} from "lodash"
import {omit} from 'lodash'

function AddSymbol(state, action){
    
    let Subst={}
    let Reel={}
    
    let N=0
    let symbols=state.Game.SceneList[action.paylot].Symbols
    let masKey=keys(symbols)
    
    if(keys(state.Game.SceneList[action.paylot].Symbols).length==0)
    {
        
        
        
        for(let i = 0;i<state.Game.SceneList[action.paylot].NumberOfReels;i++){
            Reel={
                ...Reel,
                [i+1]:0
            }
            
        }
        symbols={
            
            [N]:{
                name:"Symbol_"+N,
                id:"s"+N+"w",
                Paytable:{
                    ...Reel
                },
                Substiture:{
                    [N]:{
                        id:N,
                        value:false
                    }
                   
                },
                Special:{
                    isWild:false,
                    isScatter:false,
                    isSpecific:false
                },
                Reelstrip:{
                    ...Reel
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
            
            
            
            for(let i = 0;i<state.Game.SceneList[action.paylot].NumberOfReels;i++){
                Reel={
                    ...Reel,
                    [i+1]:0
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
                            [N]:{
                                id:N,
                                value:false
                            }
                            
                        }
                    }
                }
                
                
            }
            for(let i=0;i<=masKey.length;i++){
                if(i!=masKey.length){
                    Subst={
                        ...Subst,
                        [masKey[i]]:{
                            id:masKey[i],
                            value:false
                        }
                    }
                }
                else{
                    Subst={
                        ...Subst,
                        [N]:{
                            id:[N],
                            value:false
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
                    ...Reel,
                },
                Substiture:{
                    ...Subst
                },
                Special:{
                    isWild:false,
                    isScatter:false,
                    isSpecific:false
                },
                Reelstrip:{
                    ...Reel
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