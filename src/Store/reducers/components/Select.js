import {keys} from "lodash"
import {omit} from 'lodash'

function Select(state, action){
    
    if(state.BookmarkOn!=action.paylot)
    return{
        ...state,
        ScrenList:{
            ...state.ScrenList,
                [action.paylot]:{
                    Id:""+action.paylot+"",
                    display:"flex"
                },
                [state.BookmarkOn]:{
                    Id:""+[state.BookmarkOn]+"",
                    display:"none"
                },
            },
        BookmarkList:{
                ...state.BookmarkList,
                    [action.paylot]:{
                        Id:""+action.paylot+"",
                        backg:"green"
                    },
                    [state.BookmarkOn]:{
                        Id:""+[state.BookmarkOn]+"",
                        backg:"white"
                    },
        },
        BookmarkOn:action.paylot
    }
    else{
        return{
            ...state
        }
    }
}

function SelectMC(state, action){
    
    let v, s=action.paylot.v1, s2=""
    switch(action.paylot.v1){
        case "Symbols":{
            
            if(state.Game.SceneList[action.paylot.v2].ScernTypeOfConf.Symbols){
                s2=""
                v=false
            }
            else{
                if(state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf!="Symbols")
                    s2=state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf
                v=true
            }
            break
        }
        case "Paytable":{
            if(state.Game.SceneList[action.paylot.v2].ScernTypeOfConf.Paytable){
                s2=""
                v=false
            }
            else{
                if(state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf!="Paytable")
                    s2=state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf
                v=true
            }
            break
        }
        case "Substiture":{
            if(state.Game.SceneList[action.paylot.v2].ScernTypeOfConf.Substiture){
                s2=""
                v=false
            }
            else{
                if(state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf!="Substiture")
                    s2=state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf
                v=true
            }
            break
        }
        case "Special":{
            if(state.Game.SceneList[action.paylot.v2].ScernTypeOfConf.Special){
                s2=""
                v=false
            }
            else{
                if(state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf!="Special")
                    s2=state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf
                v=true
            }
            break
        }
        case "Reelstrip":{
            if(state.Game.SceneList[action.paylot.v2].ScernTypeOfConf.Reelstrip){
                s2=""
                v=false
            }
            else{
                if(state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf!="Reelstrip")
                    s2=state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf
                v=true
            }
            break
        }
        case "NumberIfFreespin":{
            if(state.Game.SceneList[action.paylot.v2].ScernTypeOfConf.NumberIfFreespin){
                s2=""
                v=false
            }
            else{
                if(state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf!="NumberIfFreespin")
                    s2=state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf
                v=true
            }
            break
        }
    }
    if(s!=s2) 
    if(state.Game.SceneList[action.paylot.v2].SlectedScernTypeOfConf!="") 
    return{
        ...state,
        Game:{
            ...state.Game,
            SceneList:{
                ...state.Game.SceneList,
                [action.paylot.v2]:{
                    ...state.Game.SceneList[action.paylot.v2],
                    
                    ScernTypeOfConf:{
                        ...state.Game.SceneList[action.paylot.v2].ScernTypeOfConf,
                        [s]:v,
                        [s2]:!v,
                    },
                    SlectedScernTypeOfConf:action.paylot.v1
                }
            }
        },
        
    }
    else
    return{
        ...state,
        Game:{
            ...state.Game,
            SceneList:{
                ...state.Game.SceneList,
                [action.paylot.v2]:{
                    ...state.Game.SceneList[action.paylot.v2],
                    
                    ScernTypeOfConf:{
                        ...state.Game.SceneList[action.paylot.v2].ScernTypeOfConf,
                        [s]:v,
                        
                    },
                    SlectedScernTypeOfConf:action.paylot.v1
                }
            }
        },
        
    }
    return{
        ...state,
        Game:{
            ...state.Game,
            SceneList:{
                ...state.Game.SceneList,
                [action.paylot.v2]:{
                    ...state.Game.SceneList[action.paylot.v2],
                    
                    ScernTypeOfConf:{
                        ...state.Game.SceneList[action.paylot.v2].ScernTypeOfConf,
                        [s]:v,
                        
                    },
                    SlectedScernTypeOfConf:""
                }
            }
        },
        
    }
}

export {Select, SelectMC}