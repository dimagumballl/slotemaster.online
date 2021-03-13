import {keys} from "lodash"
import {Component} from 'react'
import {connect} from 'react-redux'

import {CreateAction} from '../../../../../Store/action/MainAction';
import AllInfo from './AllInfo/AllInfo'

class Paytable extends Component {
  
  render(){
    const{DefaultOperation}=this.props.state
    const{Id}=this.props
    return (
      <div className="container_column">
        <div className="container_column" style={{overflow:"auto", maxWidth:"100%"}}>
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
        <div className="con_but" style={{width:"90px", marginTop:"10px"}}onClick={()=>this.props.UpRTP(Id)}>
              Up RTP
        </div>
        <div className="container_row">
          TotalRTP:{DefaultOperation.Game.SceneList[Id].TotalRTP}
        </div>
        <div className="container_row">
          BaseGameRTP:{DefaultOperation.Game.SceneList[Id].BaseGameRTP}
        </div>
        <div className="container_row">
          FreespinsRTP:{DefaultOperation.Game.SceneList[Id].FreespinsRTP}
        </div>
        <div className="container_row" style={{justifyContent:"center"}}>
          <div className="con_but" style={{width:"50%", height:"50px"}} onClick={()=>this.props.SelectAI(Id)}>
            Show all
          </div>
          
        </div>
        <div className="container_row" style={!DefaultOperation.Game.SceneList[Id].ScernTypeOfConf.AllInfo?{display:"none"}:{justifyContent:"center",display:"flex"}}>
          
          <AllInfo
            Id={Id}
          />
        </div>
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
    SelectAI: (value) => {
       
    
      dispatch(CreateAction("SELECT_ALL_INFORMATION", value))
      
    },
    UpRTP: (value) => {
       
    
      
      dispatch(CreateAction("WORK_WITH_REELS", value))
    },
  })
)(Paytable);
