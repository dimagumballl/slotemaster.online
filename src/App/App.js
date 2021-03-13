import '../common/Style/main.css'
import {Component} from 'react'
import {connect} from 'react-redux'

import {CreateAction} from '../Store/action/MainAction';
import Header from '../componentsJS/Header/Header'
import SlotsScenes from '../componentsJS/SlotsScenes/SlotsScenes'

class App extends Component {
  Yes(v){
    if(v.void=="Reset"){
      this.props.PressFirstBut(this.props.State.DefaultOperation)
    }
    if(v.void=="Delete Scene"){
      this.props.Delete(v.value)
    }
  }
  render(){
    return (
      <div className="App">
        <div className="None_Filde" style={this.props.State.DefaultOperation.NoneFilde?{display:"flex"}:{display:"none"}}>
          <div className="container_column"  style={{width:"40%", border:"1px solid black", background:"white", borderRadius:"5px"}}>
              <div className="container_row" style={{justifyContent:"center",marginTop:"20px"}}>
                  <h2>{this.props.State.DefaultOperation.Void.TypeOfVoid}</h2>
              </div>
              <div className="container_row" style={{justifyContent:"center", marginTop:"20px"}}>
              {this.props.State.DefaultOperation.Void.text}
              </div>
              <div className="container_row" style={{ marginTop:"20px"}}>
                <div className="con_but" style={{width:"100%", height:"40px"}} onClick={()=>this.props.VoidT({void:"No", value:null})}>
                    No
                </div>
                <div className="con_but" style={{width:"100%", height:"40px"}} onClick={()=>this.Yes({void:this.props.State.DefaultOperation.Void.TypeOfVoid, value:this.props.State.DefaultOperation.Void.value})}>
                    Yes
                </div>
              </div>
          </div>
        </div>
         <Header/>
         {
                this.props.State.DefaultOperation.Game!=undefined?<SlotsScenes/>:<div></div>
          }
      </div>
    );
  }
  
}

export default connect(
  state=>({State:state}),
  dispatch => ({
    PressFirstBut: (DefaultOperation, value) => {
      if(DefaultOperation.Game==undefined)
        dispatch(CreateAction("ADD_NEW_SCENE", value))
        dispatch(CreateAction("START_RESET"))
        dispatch(CreateAction("VOID_TYPE",{void:"No", value:null}))
    },
    
    Delete: (value) => {
      dispatch(CreateAction("DELETE_SCENE", value))
      dispatch(CreateAction("VOID_TYPE",{void:"No", value:null}))
    },
    VoidT:(state)=>{
      dispatch(CreateAction("VOID_TYPE",state))
    }
  })
)(App);
