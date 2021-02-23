import {keys} from "lodash"
import {Component} from 'react'
import {connect} from 'react-redux'

import {CreateAction} from '../../Store/action/MainAction';
import './SlotsScenes.css'
import Bookmark from './ScrenScene/Bookmark'
import ScrenScene from './ScrenScene/ScrenScene'


class SlotsScenes extends Component {
   

  render(){
    const{DefaultOperation}=this.props.state
    return (
      <div className="SlotsScenes">
        <div className="container_row" style={{height:"30px",borderBottom:"1px solid green"}}>
            <div className="container_row">
                
                {
                   DefaultOperation.Game!=undefined?
                    keys(DefaultOperation.Game.SceneList)
                    .map((key) =>
                        <Bookmark key={key}
                            Id={key}
                        />
                    ):<div></div>
                    
                        
                }
            </div>
            <div className="con_but" style={{height:"100%", width:"30px",border:"none",borderLeft:"1px solid black"}} onClick={this.props.AddScene}>
                +
            </div>
        </div>
        <div className="container_column">
        {
                   DefaultOperation.Game!=undefined?
                    keys(DefaultOperation.Game.SceneList)
                    .map((key) =>
                        <ScrenScene key={key}
                            Id={key}
                        />
                    ):<div></div>
                    
                        
                }
             
        </div>
      </div>
    );
  }
  
}

export default connect(
  state=>({state:state}),
  dispatch => ({
    AddScene: (state) => {
        
          dispatch(CreateAction("ADD_NEW_SCENE"))
          
      },
  })
)(SlotsScenes);
