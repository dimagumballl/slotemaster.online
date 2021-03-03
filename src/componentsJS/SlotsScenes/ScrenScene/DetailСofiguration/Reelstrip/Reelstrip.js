import {keys} from "lodash"
import {Component} from 'react'
import {connect} from 'react-redux'

import {CreateAction} from '../../../../../Store/action/MainAction';


class Paytable extends Component {
  
  render(){
    const{DefaultOperation}=this.props.state
    const{Id}=this.props
    return (
      <div className="container_column" style={{overflow:"auto", maxWidth:"600px"}}>
          <div className="container_row" >
            <div className="container_row" style={{minWidth:"100px",border:"1px solid black"}}>
                Symbol
            </div>
            {
                
                keys(DefaultOperation.Game.SceneList[Id].Symbols).length!=0?
                    DefaultOperation.Game.SceneList[Id].Symbols[keys(DefaultOperation.Game.SceneList[Id].Symbols)[0]].Reelstrip!=0?
                keys(DefaultOperation.Game.SceneList[Id].Symbols[keys(DefaultOperation.Game.SceneList[Id].Symbols)[0]].Reelstrip)
                            .map((key, n=1)=>
                            <div key={key}  className="container_row" style={{minWidth:"60px", border:"1px solid black", justifyContent:"center"}}>
                                
                                {"Reel "+(n+1)}
                            </div>)
                :<div style={{display:"none"}}></div>:<div style={{display:"none"}}></div>
            }
          </div>
          {
                
                keys(DefaultOperation.Game.SceneList[Id].Symbols).length!=0?
                keys(DefaultOperation.Game.SceneList[Id].Symbols)
                            .map((key)=>
                            <div className="container_column"  key={key}>
                                <div className="container_row">
                                <div  className="container_row" style={{minWidth:"100px", border:"1px solid black", justifyContent:"center", overflow:"hidden"}}>
                                    {DefaultOperation.Game.SceneList[Id].Symbols[key].name}
                                </div>
                                {
                                    keys(DefaultOperation.Game.SceneList[Id].Symbols[key].Reelstrip).map((key1)=>
                                        <input onChange={(e)=>this.props.InputSymReel({vID:Id, vKEY:key, vKEY1:key1, targetV:e})} value={DefaultOperation.Game.SceneList[Id].Symbols[key].Reelstrip[key1]} key={key1}  className="container_row" style={{minWidth:"60px", border:"1px solid black", textAlign:"center"}}/>
                                    
                                    )
                                }
                                </div>
                                
                                
                            </div>
                            )
                :<div style={{display:"none"}}></div>
            }
    </div>   
    );
  }
  
}

export default connect(
  state=>({state:state}),
  dispatch => ({
    InputSymReel: (value) => {
       
    
      dispatch(CreateAction("INPUT_SYMBOL_REELSTRIP", value))
      dispatch(CreateAction("WORK_WITH_REELS", value))
    },
  })
)(Paytable);
