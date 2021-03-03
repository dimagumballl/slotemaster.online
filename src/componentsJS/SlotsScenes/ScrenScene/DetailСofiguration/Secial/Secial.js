import {keys} from "lodash"
import {Component} from 'react'
import {connect} from 'react-redux'
import Checkbox from '@material-ui/core/Checkbox';

import {CreateAction} from '../../../../../Store/action/MainAction';


class Special extends Component {
  
  render(){
    const{DefaultOperation}=this.props.state
    const{Id}=this.props
    return (
      <div className="container_column" style={{overflow:"auto", maxWidth:"800px"}}>
          <div className="container_row" >
            <div className="container_row" style={{minWidth:"100px",border:"1px solid black"}}>
                Symbols
            </div>
            
                
                
                            <div  className="container_row" style={{minWidth:"100px", border:"1px solid black", justifyContent:"center"}}>
                                isWild
                            </div>
                            <div  className="container_row" style={{minWidth:"100px", border:"1px solid black", justifyContent:"center"}}>
                                isScatter
                            </div>
                            <div  className="container_row" style={{minWidth:"100px", border:"1px solid black", justifyContent:"center"}}>
                                isSpecific
                            </div>
                
            
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
                                {keys(DefaultOperation.Game.SceneList[Id].Symbols[key].Special).map((key1)=>
                                    <div key={key1}  className="container_row" style={{minWidth:"100px", border:"1px solid black", justifyContent:"center"}}>
                                        <Checkbox
                                        checked={DefaultOperation.Game.SceneList[Id].Symbols[key].Special[key1]}
                                        onChange={()=>this.props.InputSymSpec({vID:Id, vKEY:key, vKEY1:key1})}
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
    InputSymSpec: (value) => {
       
    
        dispatch(CreateAction("INPUT_SYMBOL_SPECIAL", value))
        dispatch(CreateAction("WORK_WITH_REELS", value))
      },
  })
)(Special);
