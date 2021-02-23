import {keys} from "lodash"
import {Component} from 'react'
import {connect} from 'react-redux'

import {CreateAction} from '../../../../../Store/action/MainAction';


class Paytable extends Component {
  
  render(){
    const{DefaultOperation}=this.props.state
    const{Id}=this.props
    return (
      <div className="container_column" style={{overflow:"auto", maxWidth:"600px"}}>
          <div className="container_row" >
            <div className="container_row" style={{minWidth:"100px",border:"1px solid black"}}>
                Symbol
            </div>
            {
                
                keys(DefaultOperation.Game.SceneList[Id].Symbols).length!=0?
                keys(DefaultOperation.Game.SceneList[Id].Symbols)
                            .map((key, n=1)=>
                            <div key={key}  className="container_row" style={{maxWidth:"40px", border:"1px solid black", justifyContent:"center"}}>
                                {n+1}
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
                                {keys(DefaultOperation.Game.SceneList[Id].Symbols[key].Paytable).map((key1)=>
                                    <div key={key1}  className="container_row" style={{maxWidth:"40px", border:"1px solid black", justifyContent:"center"}}>
                                        {
                                            
                                            DefaultOperation.Game.SceneList[Id].Symbols[key].Paytable[key1]
                                        }
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
  dispatch => ({})
)(Paytable);
