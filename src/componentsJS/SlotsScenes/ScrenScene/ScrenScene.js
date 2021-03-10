import {keys} from "lodash"
import {Component} from 'react'
import {connect} from 'react-redux'
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'


import {CreateAction} from '../../../Store/action/MainAction';
import './ScrenScene.css'
import DetailConfiguration from './DetailСofiguration/DetailСofiguration'


class ScrenScene extends Component {
  NS=(event)=>{
    this.props.InputNS({v1:event.target.value, v2:this.props.Id})
  }
  GT = (event) => {
   
    this.props.InputGT({v1:event.target.value, v2:this.props.Id} );
  };
  NOR=(event)=>{
    let num
    let a = NaN
     if(event.target.value!=""){
      num = parseInt(event.target.value.replace(/\D+/g,""))
      
      if(isNaN(num)){
        num = ""
        
      }
      this.props.InputNOR({v1:num, v2:this.props.Id, ReelSize:true, v3:this.props.state.DefaultOperation.Game.SceneList[this.props.Id].NumberOfReels} );
     }
     
    else {
      num = ""
      this.props.InputNOR({v1:num, v2:this.props.Id,ReelSize:true , v3:this.props.state.DefaultOperation.Game.SceneList[this.props.Id].NumberOfReels} );
    }
    
  }
  render(){
    const{DefaultOperation}=this.props.state
    const{Id}=this.props
    return (
      <div className="ScrenScene" style={{display:DefaultOperation.ScrenList[Id].display}}>
          <div className="container_column">
            <div   className="container_row">

            <div  className="container_column">
            
            <InputLabel id="SceneName">SceneName </InputLabel>
            <input className="con_input" value={DefaultOperation.Game.SceneList[Id].SceneName} onChange={this.NS} style={{height:"30px"}}/>
          
            <InputLabel id="GameType">GameType</InputLabel>
            <Select labelId="GameType" id="select" onChange={this.GT} value={DefaultOperation.Game.SceneList[Id].GameType}>
              <MenuItem value="Slot">Slot</MenuItem>
              <MenuItem value="Bonus">Bonus</MenuItem>
            </Select>
          
          
            <InputLabel id="NumberofReels">Number of Reels </InputLabel>
            <input className="con_input" onChange={this.NOR} style={{height:"30px"}} value={DefaultOperation.Game.SceneList[Id].NumberOfReels}/>
            <InputLabel id="FreespinGame">Freespin Game </InputLabel>
            <Select labelId="FreespinGame" onChange={(e)=>this.props.InputFreesG({vID:Id, targetV:e})}  value={DefaultOperation.Game.SceneList[Id].FreespinGame!=undefined?DefaultOperation.Game.SceneList[Id].FreespinGame:"u"}>
            <MenuItem value="u"></MenuItem>
              {
                keys(DefaultOperation.Game.SceneList).length>1?
                  keys(DefaultOperation.Game.SceneList).map((key)=>
                    
                    Id!=key?
                    <MenuItem value={key} key={key}>{DefaultOperation.Game.SceneList[key].SceneName!=undefined?DefaultOperation.Game.SceneList[key].SceneName:"u"}</MenuItem>:""
                  
                  )
                :""
              }
              <MenuItem value={Id}>Empty</MenuItem>
              
              
            </Select>
            <div className="con_but" style={{height:"30px"}}  onClick={()=>this.props.AddFreespinGame(Id)} >
              Create Freespin
            </div>
          </div>
          <div className="container_row" style={{justifyContent:"flex-end"}}>
            <div className="con_but" style={{width:"90px",height:"25px"}}onClick={()=>this.props.Delete(Id)}>
              Delete
            </div>
          </div>

            </div>
            <DetailConfiguration
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
    Delete: (value) => {
      dispatch(CreateAction("DELETE_SCENE", value))
    },
    InputNS: (value) => {
        dispatch(CreateAction("INPUT_SCENE_NAME", value))
    },
    InputGT: (value) => {
        dispatch(CreateAction("INPUT_GAME_TYPE", value))
        dispatch(CreateAction("WORK_WITH_REELS", value))
    },
    InputNOR: (value) => {
      
      dispatch(CreateAction("INPUT_NUM_REELS", value))
      
      dispatch(CreateAction("WORK_WITH_REELS", value))
  },
  InputFreesG: (value) => {
      
    dispatch(CreateAction("INPUT_FREESPIN_GAME", value))
    
    dispatch(CreateAction("WORK_WITH_REELS", value))
  },
  AddFreespinGame: (value) => {
      
    dispatch(CreateAction("ADD_FREESPIN_GAME", value))
    
    dispatch(CreateAction("WORK_WITH_REELS", value))
  },
  })
)(ScrenScene);
