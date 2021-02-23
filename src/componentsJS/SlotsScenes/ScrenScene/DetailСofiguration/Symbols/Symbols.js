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
                
                    <div className="container_row" style={{width:"100px", borderRight:"1px solid black"}}>
                        Symbols Name
                    </div>
                    
                
                
                    <div className="container_row" style={{width:"100px", borderRight:"1px solid black"}}>
                        ID
                    </div>
                
            </div>
            
            <div className="container_row"  style={{overflow:"auto"}}>
            {
                        keys(DefaultOperation.Game.SceneList[Id].Symbols).length!=0?
                            keys(DefaultOperation.Game.SceneList[Id].Symbols)
                            .map((key) =>
                            <div className="container_column" key={key} style={{width:"80px"}}>
                                <div className="container_row">
                                    {DefaultOperation.Game.SceneList[Id].Symbols[key].name}
                                </div>
                                <div className="container_row">
                                    {DefaultOperation.Game.SceneList[Id].Symbols[key].id}
                                </div>
                                <div className="con_but" onClick={()=>this.props.DeleteSymbol({v1:Id,v2:key})}>
                                    remove
                                </div>
                                
                            </div>
                                ):<div></div>
                                
                        
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
      
      
  },
  DeleteSymbol: (value) => {
    
    dispatch(CreateAction("DELETE_SYMBOL", value))
    
},
})
)(Symbols);
