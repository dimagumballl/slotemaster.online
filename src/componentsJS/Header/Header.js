
import {Component} from 'react'
import {connect} from 'react-redux'

import './Header.css'
import {CreateAction} from '../../Store/action/MainAction';

class Header extends Component {
  
  render(){
    const{DefaultOperation}=this.props.state
    return (
      <div className="Header">
        <div className="container_row">
            <input className="con_input" value={DefaultOperation.FirstInputId} style={{width:"50px",height:"30px",marginLeft:"10px"}} onChange={DefaultOperation.Game==undefined?this.props.InputFid:()=>{}}/>
                
            
            <input className="con_input" value={DefaultOperation.FirstInputName} style={{height:"30px",marginLeft:"10px"}}  onChange={ DefaultOperation.Game==undefined?this.props.InputFname:()=>{}}/>
                
            
            <div className="con_but" style={{width:"90px",height:"30px",marginLeft:"10px"}} onClick={()=>this.props.PressFirstBut(DefaultOperation)}>
                {
                    DefaultOperation.FirstBut 
                }
                
            </div>
        </div>
        <div className="container_row" style={{justifyContent:'flex-end'}}>
             <div className="con_but" style={{width:"90px",height:"30px"}}>
                export
            </div>
            <div className="con_but" style={{width:"90px",height:"30px",marginLeft:"10px", marginRight:"10px"}}>
                import
            </div>
        </div>
      </div>
    );
  }
  
}

export default connect(
  state=>({state:state}),
  dispatch => ({
    PressFirstBut: (DefaultOperation, value) => {
      if(DefaultOperation.Game==undefined)
        dispatch(CreateAction("ADD_NEW_SCENE", value))
        dispatch(CreateAction("START_RESET"))
    },
    InputFid: (event) => {
        dispatch(CreateAction("INPUT_FID", event.target.value))
    },
    InputFname: (event) => {
        dispatch(CreateAction("INPUT_FNAME", event.target.value))
    }
  })
)(Header);