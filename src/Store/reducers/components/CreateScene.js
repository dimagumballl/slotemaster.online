
import {keys} from "lodash"
import {omit} from 'lodash'


function CreateScene(state){
    if(state.FirstBut=="Start"){
        return{
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
                        },
                        SlectedScernTypeOfConf:"",
                        Symbols:{
                            
                        },
                        
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
           
    }
    else if(keys(state.Game.SceneList).length==0){
        return{
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
                        },
                        SlectedScernTypeOfConf:"",
                        Symbols:{
                            
                        },
                        
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
        
        
        
        return{
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
                        },
                        SlectedScernTypeOfConf:"",
                        Symbols:{
                            
                        },
                        
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
    }
    return state
}
export default CreateScene