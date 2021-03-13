import {keys} from "lodash"
import {omit} from 'lodash'

function InputFid(state, action){
    let  num
    if(action.paylot!=""){
             num = parseInt(action.paylot.replace(/\D+/g,""))
             if(isNaN(num)){
                num = ""
                
              }
    }
    else{
        num=""
    }
    return{
        ...state,
        FirstInputId: num,
        Validation:{
            ...state.Validation,
            FirstInputId:true
        }
    }
}
function InputFN(state, action){
    return{
        ...state,
        FirstInputName: action.paylot,
        Validation:{
            ...state.Validation,
            FirstInputName:true
        }
        
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
    let Nof = state.Game.SceneList[action.paylot.v2].NumberOfReels
    let nValue = action.paylot.v1
    let symbols=state.Game.SceneList[action.paylot.v2].Symbols
    let NIF = state.Game.SceneList[action.paylot.v2].NumberIfFreespin

    if(nValue<Nof){
        for(let i = nValue+1;i<=Nof;i++){
            NIF={
                
                ...omit(NIF, i)
            }
            for(let a = 0;a<keys(symbols).length;a++){
                symbols={
                    ...symbols,
                    [keys(symbols)[a]]:{
                        ...symbols[keys(symbols)[a]],
                        Reelstrip:{
                            ...omit(symbols[keys(symbols)[a]].Reelstrip, i)
                        },
                        Paytable:{
                            ...omit(symbols[keys(symbols)[a]].Paytable, i)
                        }
                    }
                }
                
            }
        }
    }
    else if(nValue>Nof){
        
        for(let i = Nof+1;i<=nValue;i++){
            NIF={
                
                ...NIF,
                [i]:0
            }
            for(let a = 0;a<keys(symbols).length;a++){
                symbols={
                    ...symbols,
                    [keys(symbols)[a]]:{
                        ...symbols[keys(symbols)[a]],
                        Reelstrip:{
                            ...symbols[keys(symbols)[a]].Reelstrip,
                            [i]:0
                        },
                        Paytable:{
                            ...symbols[keys(symbols)[a]].Paytable,
                            [i]:0
                        }
                    }
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
                [action.paylot.v2]:{
                    ...state.Game.SceneList[action.paylot.v2],
                    NumberOfReels : nValue,
                    Symbols:{
                        ...symbols
                    },
                    NumberIfFreespin:{
                        ...NIF
                    }
                }
            }
        },
        
    }
}
function InputSymN(state, action){
    let vID=action.paylot.vID, vKEY=action.paylot.vKEY, targetV=action.paylot.targetV.target.value
        return {
            ...state,
            Game:{
                ...state.Game,
                SceneList:{
                    ...state.Game.SceneList,
                    [vID]:{
                        ...state.Game.SceneList[vID],
                        
                        Symbols:{
                            ...state.Game.SceneList[vID].Symbols,
                            [vKEY]:{
                                ...state.Game.SceneList[vID].Symbols[[vKEY]],
                                name:targetV
                            }
                        },
                    }
                }
            },
            
        }

}
function InputSymID(state, action){
    let vID=action.paylot.vID, vKEY=action.paylot.vKEY, targetV=action.paylot.targetV.target.value
        return {
            ...state,
            Game:{
                ...state.Game,
                SceneList:{
                    ...state.Game.SceneList,
                    [vID]:{
                        ...state.Game.SceneList[vID],
                        
                        Symbols:{
                            ...state.Game.SceneList[vID].Symbols,
                            [vKEY]:{
                                ...state.Game.SceneList[vID].Symbols[[vKEY]],
                                id:targetV
                            }
                        },
                    }
                }
            },
            
        }

}
function InputSymPayT(state, action){
    let vID=action.paylot.vID, vKEY=action.paylot.vKEY, num
    let vKEY1=action.paylot.vKEY1, targetV=action.paylot.targetV.target.value
    if(targetV!=""){
             num = parseInt(targetV.replace(/\D+/g,""))
             if(isNaN(num)){
                num = ""
                
              }
    }
    else{
        num=""
    }
    
        return {
            ...state,
            Game:{
                ...state.Game,
                SceneList:{
                    ...state.Game.SceneList,
                    [vID]:{
                        ...state.Game.SceneList[vID],
                        
                        Symbols:{
                            ...state.Game.SceneList[vID].Symbols,
                            [vKEY]:{
                                ...state.Game.SceneList[vID].Symbols[[vKEY]],
                                Paytable:{
                                    ...state.Game.SceneList[vID].Symbols[[vKEY]].Paytable,
                                    [vKEY1]:num
                                }
                            }
                        },
                    }
                }
            },
            
        }

}

function InputSymSub(state, action){
    let vID=action.paylot.vID, vKEY=action.paylot.vKEY
    let vKEY1=action.paylot.vKEY1
    let targetV=!state.Game.SceneList[vID].Symbols[vKEY].Substiture[vKEY1].value
    
    
    
        return {
            ...state,
            Game:{
                ...state.Game,
                SceneList:{
                    ...state.Game.SceneList,
                    [vID]:{
                        ...state.Game.SceneList[vID],
                        
                        Symbols:{
                            ...state.Game.SceneList[vID].Symbols,
                            [vKEY]:{
                                ...state.Game.SceneList[vID].Symbols[vKEY],
                                Substiture:{
                                    ...state.Game.SceneList[vID].Symbols[vKEY].Substiture,
                                    [vKEY1]:{
                                       ...state.Game.SceneList[vID].Symbols[vKEY].Substiture[vKEY1],
                                       value:targetV 
                                    }
                                }
                                
                            },
                            [vKEY1]:{
                                ...state.Game.SceneList[vID].Symbols[vKEY1],
                                Substiture:{
                                    ...state.Game.SceneList[vID].Symbols[vKEY1].Substiture,
                                    [vKEY]:{
                                       ...state.Game.SceneList[vID].Symbols[vKEY1].Substiture[vKEY],
                                       value:targetV 
                                    }
                                }
                                
                            }
                        },
                    }
                }
            },
            
        }

}
function InputSymSpec(state, action){
    let vID=action.paylot.vID, vKEY=action.paylot.vKEY
    let vKEY1=action.paylot.vKEY1
    let targetV=!state.Game.SceneList[vID].Symbols[vKEY].Special[vKEY1]
    
    
    
        return {
            ...state,
            Game:{
                ...state.Game,
                SceneList:{
                    ...state.Game.SceneList,
                    [vID]:{
                        ...state.Game.SceneList[vID],
                        
                        Symbols:{
                            ...state.Game.SceneList[vID].Symbols,
                            [vKEY]:{
                                ...state.Game.SceneList[vID].Symbols[vKEY],
                                Special:{
                                    ...state.Game.SceneList[vID].Symbols[vKEY].Special,
                                    [vKEY1]:targetV 
                                }
                                
                            }
                        },
                    }
                }
            },
            
        }

}
function InputSymReel(state, action){
    let vID=action.paylot.vID, vKEY=action.paylot.vKEY, num
    let vKEY1=action.paylot.vKEY1, targetV=action.paylot.targetV.target.value
    if(targetV!=""){
             num = parseInt(targetV.replace(/\D+/g,""))
             if(isNaN(num)){
                num = ""
                
              }
    }
    else{
        num=""
    }
    
        return {
            ...state,
            Game:{
                ...state.Game,
                SceneList:{
                    ...state.Game.SceneList,
                    [vID]:{
                        ...state.Game.SceneList[vID],
                        
                        Symbols:{
                            ...state.Game.SceneList[vID].Symbols,
                            [vKEY]:{
                                ...state.Game.SceneList[vID].Symbols[[vKEY]],
                                Reelstrip:{
                                    ...state.Game.SceneList[vID].Symbols[[vKEY]].Reelstrip,
                                    [vKEY1]:num
                                }
                            }
                        },
                    }
                }
            },
            
        }

}
 function InputNumberIfFreespin(state, action){
    let vID=action.paylot.vID, vKEY=action.paylot.vKEY, targetV=action.paylot.targetV.target.value, num
    if(targetV!=""){
             num = parseInt(targetV.replace(/\D+/g,""))
             if(isNaN(num)){
                num = ""
                
              }
    }
    else{
        num=""
    }
    return{
        ...state,
            Game:{
                ...state.Game,
                SceneList:{
                    ...state.Game.SceneList,
                    [vID]:{
                        ...state.Game.SceneList[vID],
                        NumberIfFreespin:{
                            ...state.Game.SceneList[vID].NumberIfFreespin,
                            [vKEY]:num
                        }
                        
                    }
                }
            },
    }
 }
 function InputFreesG(state, action){
     
    let vID=action.paylot.vID, targetV=action.paylot.targetV.target.value
    
    return{
        ...state,
            Game:{
                ...state.Game,
                SceneList:{
                    ...state.Game.SceneList,
                    [vID]:{
                        ...state.Game.SceneList[vID],
                        FreespinGame:targetV
                        
                    }
                }
            },
    }
 }
export {InputFreesG, InputNumberIfFreespin,InputFid, InputFN, InputSN, InputGT, InputNOR, InputSymN, InputSymID, InputSymPayT, InputSymSub, InputSymSpec, InputSymReel}