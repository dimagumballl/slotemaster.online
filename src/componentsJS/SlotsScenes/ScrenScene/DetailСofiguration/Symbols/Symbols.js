import {keys} from "lodash"
import {Component} from 'react'
import {connect} from 'react-redux'

import {CreateAction} from '../../../../../Store/action/MainAction';


class Symbols extends Component {
    
    
  render(){
    const{DefaultOperation}=this.props.state
    const{Id}=this.props
    return (
      <div className="container_column">
          <div className="container_row" style={{margin:"20px"}}>
            <div className="container_column" style={{width:"100px", borderRight:"1px solid black"}}>
                
                    <div className="container_row" style={{height:"30px",width:"100px", borderRight:"1px solid black"}}>
                        Symbols Name
                    </div>
                    
                
                
                    <div className="container_row" style={{height:"30px",width:"100px", borderRight:"1px solid black"}}>
                        ID
                    </div>
                
            </div>
            
            <div  style={{overflow:"auto",display:"flex", maxWidth:"100%"}}>
            {
                        keys(DefaultOperation.Game.SceneList[Id].Symbols).length!=0?
                            keys(DefaultOperation.Game.SceneList[Id].Symbols)
                            .map((key) =>
                            <div className="container_column" key={key} style={{height:"100%",width:"120px"}}>
                                <div className="container_row">
                                    <input name="SymbolName" onChange={(e)=>this.props.InputSymN( {vID:Id, vKEY:key, p:this.props, targetV:e})} value={DefaultOperation.Game.SceneList[Id].Symbols[key].name} style={{width:"100%"}}/>
                                    
                                </div>
                                <div className="container_row">
                                    <input onChange={(e)=>this.props.InputSymID({vID:Id, vKEY:key, p:this.props, targetV:e})} value={DefaultOperation.Game.SceneList[Id].Symbols[key].id} style={{width:"100%"}}/>
                                    
                                </div>
                                <div className="con_but" onClick={()=>this.props.DeleteSymbol({vID:Id, v1:Id,v2:key})} style={{height:"100%"}}>
                                    remove
                                </div>
                                
                            </div>
                                ):<div style={{display:"none"}}></div>
                                
                        
                    }
            </div>
            <div className="con_but" style={{width:"50px"}} onClick={()=>this.props.AddSymbol(Id)}>
                +
            </div>
          </div>
          <div className="container_row">
              <div style={{width:"50px"}}  >

              </div>
          </div>
      </div>
    );
  }
  
}

export default connect(
  state=>({state:state}),
  dispatch => ({
      AddSymbol: (value) => {

        
    
      dispatch(CreateAction("ADD_SYMBOL", value))
      dispatch(CreateAction("WORK_WITH_REELS", value))
      
  },
  DeleteSymbol: (value) => {
    
    dispatch(CreateAction("DELETE_SYMBOL", value))
    dispatch(CreateAction("WORK_WITH_REELS", value))
    
    },
    InputSymN: (value) => {
       
    
        dispatch(CreateAction("INPUT_SYMBOL_NAME", value))
        
    },
    InputSymID: (value) => {
       
        console.log(value)
        dispatch(CreateAction("INPUT_SYMBOL_ID", value))
        
    },
})
)(Symbols);
