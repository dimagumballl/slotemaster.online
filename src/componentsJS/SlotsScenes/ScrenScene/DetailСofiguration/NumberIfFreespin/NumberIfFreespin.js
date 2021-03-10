import {keys} from "lodash"
import {Component} from 'react'
import {connect} from 'react-redux'

import {CreateAction} from '../../../../../Store/action/MainAction';


class NumberIfFreespin extends Component {
  
  render(){
    const{DefaultOperation}=this.props.state
    const{Id}=this.props
    return (
        <div className="container_column" style={{overflow:"auto", maxWidth:"100%"}}>
            <div className="container_row">
                
                <div className="container_column">
                    <div className="container_row" style={{minWidth:"100px",border:"1px solid black"}}>
                        Num of Sc
                    </div>
                    
                    <div className="container_row" style={{minWidth:"100px",border:"1px solid black"}}>
                        Num freespin
                    </div>
                </div>
                {
                    keys(DefaultOperation.Game.SceneList[Id].Reels).length!=0?
                    keys(DefaultOperation.Game.SceneList[Id].NumberIfFreespin).map((key)=>
                        <div className="container_column" key={key} style={{minWidth:"60px", border:"1px solid black", justifyContent:"center"}}>
                            <div className="container_row" style={{justifyContent:"center"}}>
                                {key}
                            </div>
                            <div className="container_row" >
                                
                                <input onChange={(e)=>this.props.InputNumberIfFreespin({vID:Id, vKEY:key, targetV:e})} value={DefaultOperation.Game.SceneList[Id].NumberIfFreespin[key]} className="container_row" style={{height:"100%", border:"1px solid black", textAlign:"center"}}/>
                            </div>
                        </div>
                    ):<div style={{display:"none"}}></div>
                }
            </div>
            
        </div>   
    );
  }
  
}

export default connect(
  state=>({state:state}),
  dispatch => ({
    InputNumberIfFreespin: (value) => {
       
    
      dispatch(CreateAction("INPUT_NUMBER_IF_FREESPIN", value))
      dispatch(CreateAction("WORK_WITH_REELS", value))
    },
  })
)(NumberIfFreespin);
