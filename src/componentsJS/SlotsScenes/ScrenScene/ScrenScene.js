
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
    
     if(event.target.value==""){
      let num = 1
      this.props.InputNOR({v1:num, v2:this.props.Id} );
      }
    else if(this.props.state.DefaultOperation.Game.SceneList[this.props.Id].NumberOfReels<1){
      let num = 1
      this.props.InputNOR({v1:num, v2:this.props.Id} );
      }
    else if(this.props.state.DefaultOperation.Game.SceneList[this.props.Id].NumberOfReels>=1)
      {
        let num = parseInt(event.target.value.replace(/\D+/g,""))
      this.props.InputNOR({v1:num, v2:this.props.Id} );
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
          
          </div>
          <div className="container_row" style={{justifyContent:"flex-end"}}>
            <div className="con_but" style={{width:"90px",height:"25px"}} onClick={()=>this.props.Delete(Id)}>
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
    },
    InputNOR: (value) => {
      dispatch(CreateAction("INPUT_NUM_REELS", value))
  },
  })
)(ScrenScene);
