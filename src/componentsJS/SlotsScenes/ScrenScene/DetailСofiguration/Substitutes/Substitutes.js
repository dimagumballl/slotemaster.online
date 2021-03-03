import {keys} from "lodash"
import {Component} from 'react'
import {connect} from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox';
import {CreateAction} from '../../../../../Store/action/MainAction';


class Substiture extends Component {
  
  render(){
    const{DefaultOperation}=this.props.state
    const{Id}=this.props
    return (
      <div className="container_column" style={{overflow:"auto", maxWidth:"800px"}}>
          <div className="container_row" >
            <div className="container_row" style={{minWidth:"100px",border:"1px solid black"}}>
                Substiture
            </div>
            {
                
                keys(DefaultOperation.Game.SceneList[Id].Symbols).length!=0?
                keys(DefaultOperation.Game.SceneList[Id].Symbols)
                            .map((key)=>
                            <div key={key}  className="container_row" style={{minWidth:"100px", border:"1px solid black", justifyContent:"center"}}>
                                {DefaultOperation.Game.SceneList[Id].Symbols[key].name}
                            </div>)
                :<div></div>
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
                                {keys(DefaultOperation.Game.SceneList[Id].Symbols[key].Substiture).map((key1)=>
                                    <div key={key1}  className="container_row" style={{minWidth:"100px", border:"1px solid black", justifyContent:"center"}}>
                                      <Checkbox
                                        checked={DefaultOperation.Game.SceneList[Id].Symbols[key].Substiture[key1].value}
                                        onChange={()=>this.props.InputSymSub({vID:Id, vKEY:key, vKEY1:key1})}
                                        
                                        color="primary"
                                      />
                                      
                                    </div>
                                )}
                                </div>
                                
                                
                            </div>
                            )
                :<div></div>
            }
    </div>   
    );
  }
  
}

export default connect(
  state=>({state:state}),
  dispatch => ({
    InputSymSub: (value) => {
       
    
      dispatch(CreateAction("INPUT_SYMBOL_SUBSTITURE", value))
      dispatch(CreateAction("WORK_WITH_REELS", value))
    },
  })
)(Substiture);
