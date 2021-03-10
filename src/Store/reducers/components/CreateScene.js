
import {keys} from "lodash"
import {omit} from 'lodash'


function CreateScene(state){
    if(state.FirstBut=="Start"){
        let State={
            ...state,
            Game:{
                GameName:state.FirstInputName,
                Id:state.FirstInputId,
                SceneList:{
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
                                name:"Reel2"
                            },
                            3:{
                                name:"Reel3"
                            },
                            4:{
                                name:"Reel4"
                            },
                            5:{
                                name:"Reel5"
                            },
                        },
                        ScernTypeOfConf:{
                            Symbols:false,
                            Paytable:false,
                            Substitutes:false,
                            Special:false,
                            Reelstrip:false,
                            NumberIfFreespin:false
                        },
                        SlectedScernTypeOfConf:"",
                        Symbols:{
                            
                        },
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
            },
            
            
            ScrenList:{
                ...state.ScrenList,
                    0:{
                        Id:""+0+"",
                        display:"flex"
                    },
                },
                BookmarkList:{
                    ...state.BookmarkList,
                        0:{
                            Id:""+0+"",
                            backg:"green"
                        },
                    },
                BookmarkOn:0
            
        }
        let reels=State.Game.SceneList[0].Reels
        for(let i = 1;i<=keys(reels).length;i++){
            State={
                ...State,
                Game:{
                    ...State.Game,
                    SceneList:{
                        ...State.Game.SceneList,
                            [0]:{
                                ...State.Game.SceneList[0],
                                NumberIfFreespin:{
                                    ...State.Game.SceneList[0].NumberIfFreespin,
                                    [i]:0
                                },
                            }  
                    }
                }
            }
        }
        return{
            ...State
        }
           
    }
    else{
        
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
        let State={
            ...state,
            Game:{
                ...state.Game,
                SceneList:{
                    ...state.Game.SceneList,
                    [N]:{
                        
                        id:[N],
                        SceneName : "SceneName_"+[N],
                        GameType : "Slot",
                        NumberOfReels:5,
                        Reels : {
                            1:{
                                name:"Reel1"
                            },
                            2:{
                                name:"Reel2"
                            },
                            3:{
                                name:"Reel3"
                            },
                            4:{
                                name:"Reel4"
                            },
                            5:{
                                name:"Reel5"
                            }
                        },
                        ScernTypeOfConf:{
                            Symbols:false,
                            Paytable:false,
                            Substitutes:false,
                            Special:false,
                            Reelstrip:false,
                            NumberIfFreespin:false
                        },
                        SlectedScernTypeOfConf:"",
                        Symbols:{
                            
                        },
                        FreespinGame:N,
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
        return{
            ...State
        }
    }
    return state
}
export default CreateScene