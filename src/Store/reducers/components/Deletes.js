import {keys} from "lodash"
import {omit} from 'lodash'

function DeleteScene(state, action){
    if(keys(state.BookmarkList).length==1)
            return{
                ...state,
                Game:{
                    ...state.Game,
                    SceneList:{
                        ...omit(state.Game.SceneList,action.paylot)
                    }
                    
                },
                BookmarkList:{
                    ...omit(state.BookmarkList,action.paylot),
                },
                ScrenList:{
                    ...omit(state.ScrenList,action.paylot)
                },
                BookmarkOn:0
            }
         else{
             let k = keys(omit(state.ScrenList,action.paylot))[0]
             
            return{
                ...state,
                Game:{
                    ...state.Game,
                    SceneList:{
                        
                        ...omit(state.Game.SceneList,action.paylot),
                        
                    }
                    
                },
                BookmarkList:{
                    
                    ...omit(state.BookmarkList,action.paylot),
                    [k]:{
                        Id:""+k+"",
                        backg:"green"
                    },
                },
                ScrenList:{
                    
                    ...omit(state.ScrenList,action.paylot),
                    [k]:{
                        Id:""+k+"",
                        display:"flex"
                    },
                },
                BookmarkOn:k
            }
         }
}

export {DeleteScene}