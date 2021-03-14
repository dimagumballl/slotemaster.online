import {keys} from "lodash"
import {omit} from 'lodash'

function DeleteScene(state, action){
    if(keys(state.BookmarkList).length==1){
                let sceneList=state.Game.SceneList
                let bookmarkList=state.BookmarkList
                let screnList=state.ScrenList
                sceneList={
                    ...omit(state.Game.SceneList,action.paylot)
                }
                bookmarkList={
                    ...omit(state.BookmarkList,action.paylot)
                }
                screnList={
                    ...omit(state.ScrenList,action.paylot)
                }
                sceneList={
                    0:{
                        id:"0",
                        SceneName : "SceneName_"+0,
                        GameType : "Slot",
                        NumberOfReels:5,
                        Reels : {
                            1:{
                                name:"Reel1"
                            },
                            2:{
                                name:"Reel1"
                            },
                            3:{
                                name:"Reel1"
                            },
                            4:{
                                name:"Reel1"
                            },
                            5:{
                                name:"Reel1"
                            },
                        },

                        ScernTypeOfConf:{
                            Symbols:false,
                            Paytable:false,
                            Substitutes:false,
                            Special:false,
                            Reelstrip:false,
                            NumberIfFreespin:false,
                            AllInfo:false
                        },
                        SlectedScernTypeOfConf:"",
                        Symbols:{
                            
                        },
                        Log:{
                            
                        },
                        Wild:false,
                        Scatter:false,
                        FreespinGame:0,
                        NumberIfFreespin:{},
                        TotalRTP: "0",
                        BaseGameRTP: "0",
                        FreespinsRTP: "0",
                        BonusGameRTP: "0",
                        BasegameHitRate: "0",
                        HitRate:{},
                        Combinations:{},
                        Returns:{}
                    }
                }
                bookmarkList={
                    ...state.bookmarkList,
                        0:{
                            Id:""+0+"",
                            backg:"green"
                        },
                }
                screnList={
                    ...state.screnList,
                    0:{
                        Id:""+0+"",
                        display:"flex"
                    },
                }
                let reels=sceneList[0].Reels
                for(let i = 1;i<=keys(reels).length;i++){
                    
                        
                            
                                sceneList={
                                    ...sceneList,
                                        [0]:{
                                            ...sceneList[0],
                                            NumberIfFreespin:{
                                                ...sceneList[0].NumberIfFreespin,
                                                [i]:0
                                            },
                                        }  
                                }
                        
                    
                }
                return{
                    ...state,
                    Game:{
                        ...state.Game,
                        SceneList:{
                            ...sceneList
                        }
                    
                    },
                    BookmarkList:{
                        ...bookmarkList
                    },
                    ScrenList:{
                        ...screnList
                    },
                    BookmarkOn:0
                }
        }
         else{
             let k = keys(omit(state.ScrenList,action.paylot))[0]
             let State = {...state}
             
             for(let i = 0;i<keys(State.Game.SceneList).length;i++){
                 if(keys(State.Game.SceneList)[i]!=action.paylot){
                     if(State.Game.SceneList[keys(State.Game.SceneList)[i]].FreespinGame==action.paylot){
                         
                        State={
                            ...State,
                            Game:{
                                ...State.Game,
                                SceneList:{
                                    ...State.Game.SceneList,
                                    [keys(State.Game.SceneList)[i]]:{
                                        ...State.Game.SceneList[keys(State.Game.SceneList)[i]],
                                        FreespinGame:Number(keys(State.Game.SceneList)[i])
                                    }
                                }
                            }
                        }
                     }
                 }
             }
             
             State={
                ...State,
                Game:{
                    ...State.Game,
                    SceneList:{
                        
                        ...omit(State.Game.SceneList,action.paylot),
                        
                    }
                    
                },
                BookmarkList:{
                    
                    ...omit(State.BookmarkList,action.paylot),
                    [k]:{
                        Id:""+k+"",
                        backg:"green"
                    },
                },
                ScrenList:{
                    
                    ...omit(State.ScrenList,action.paylot),
                    [k]:{
                        Id:""+k+"",
                        display:"flex"
                    },
                },
                BookmarkOn:k
            }
            
            return{
                ...State
            }
         }
}

export {DeleteScene}