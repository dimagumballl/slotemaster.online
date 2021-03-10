import {keys} from "lodash"
import {omit} from 'lodash'

import {WorkWithReels} from './WorkWithReels'

function AddFreespinGame(state, action){
    
    let State=state,vID=action.paylot
    let N = 0
        let C = false
        while(!C){
            
            C=true;
            for(let i = 0;i<keys(state.Game.SceneList).length;i++)
            
            {
                if(N==keys(state.Game.SceneList)[i])
                 C=false;
            }
            if(!C)
                N++;
            
        }
        State={
            ...State,
            Game:{
                ...State.Game,
                SceneList:{
                    ...State.Game.SceneList,
                    [N]:{
                        ...State.Game.SceneList[vID]
                    }
                },
                
            },
            ScrenList:{
                ...state.ScrenList,
                    [N]:{
                        Id:""+N+"",
                        display:"none"
                    },
                },
            BookmarkList:{
                ...state.BookmarkList,
                [N]:{
                    Id:""+N+"",
                    backg:"white"
                },
            },
        }
        State={
            ...State,
            Game:{
                ...State.Game,
                SceneList:{
                    ...State.Game.SceneList,
                    [N]:{
                        ...State.Game.SceneList[N],
                        id:""+N+"",
                        SceneName : "Freespen_"+[N],
                        FreespinGame:N,
                    }
                } 
            }
        }
        let reels=State.Game.SceneList[N].Reels
        for(let i = 1;i<=keys(reels).length;i++){
            State={
                ...State,
                Game:{
                    ...State.Game,
                    SceneList:{
                        ...State.Game.SceneList,
                            [N]:{
                                ...State.Game.SceneList[N],
                                NumberIfFreespin:{
                                    ...State.Game.SceneList[N].NumberIfFreespin,
                                    [i]:0
                                },
                            }  
                    }
                }
            }
        }
        let Action={
            
                paylot:""+N+""
            
        }
        
        
        State={
            ...WorkWithReels(State, Action)
        }
        
        State={
            ...State,
            Game:{
                ...State.Game,
                SceneList:{
                    ...State.Game.SceneList,
                    [vID]:{
                        ...State.Game.SceneList[vID],
                        FreespinGame:N,
                    }
                } 
            }
        }
    return{
        ...State
    }
}
export {AddFreespinGame}