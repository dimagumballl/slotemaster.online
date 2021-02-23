
import {Component} from 'react'
import {connect} from 'react-redux'

import {CreateAction} from '../../../../Store/action/MainAction';
import './DetailСofiguration.css'
import Symbols from './Symbols/Symbols'
import Paytable from './Paytable/Paytable'
import Substiture from './Substitutes/Substitutes'
import Special from './Secial/Secial'

let butStyle={height:"30px", justifyContent:"flex-start" }
let SlectedB={background:"green",height:"30px", justifyContent:"flex-start" }
let SlectedD={display:"flex"}
class DetailСofiguration extends Component {

  render(){
    const{DefaultOperation}=this.props.state
    const{Id}=this.props
    return (
        <div className="containe_column" style={{marginTop:"40px",}}>
            <div className="con_sub" onClick={()=>this.props.SelectMC({v1:"Symbols",v2:Id})} style={DefaultOperation.Game.SceneList[Id].ScernTypeOfConf.Symbols?SlectedB:butStyle}>
                Symbols
            </div>
            <div className="table_scrin" style={DefaultOperation.Game.SceneList[Id].ScernTypeOfConf.Symbols?SlectedD:{display:"none"}}>
                <Symbols
                    Id={Id}
                />
            </div>
            <div className="con_sub" onClick={()=>this.props.SelectMC({v1:"Paytable",v2:Id})} style={DefaultOperation.Game.SceneList[Id].ScernTypeOfConf.Paytable?SlectedB:butStyle}>
                Paytable
            </div>
            <div className="table_scrin" style={DefaultOperation.Game.SceneList[Id].ScernTypeOfConf.Paytable?SlectedD:{display:"none"}}>
                <Paytable
                    Id={Id}
                />
            </div>
            <div className="con_sub" onClick={()=>this.props.SelectMC({v1:"Substiture",v2:Id})} style={DefaultOperation.Game.SceneList[Id].ScernTypeOfConf.Substiture?SlectedB:butStyle}>
                Substiture
            </div>
            <div className="table_scrin" style={DefaultOperation.Game.SceneList[Id].ScernTypeOfConf.Substiture?SlectedD:{display:"none"}}>
                
                <Substiture Id={Id}/>
            </div>
            <div className="con_sub" onClick={()=>this.props.SelectMC({v1:"Special",v2:Id})} style={DefaultOperation.Game.SceneList[Id].ScernTypeOfConf.Special?SlectedB:butStyle}>
                Special
            </div>
            <div className="table_scrin" style={DefaultOperation.Game.SceneList[Id].ScernTypeOfConf.Special?SlectedD:{display:"none"}}>
                <Special
                     Id={Id}
                />
            </div>
            <div className="con_sub" onClick={()=>this.props.SelectMC({v1:"Reelstrip",v2:Id})} style={DefaultOperation.Game.SceneList[Id].ScernTypeOfConf.Reelstrip?SlectedB:butStyle}>
                Reelstrip
            </div>
            <div className="table_scrin" style={DefaultOperation.Game.SceneList[Id].ScernTypeOfConf.Reelstrip?SlectedD:{display:"none"}}>
                1
            </div>
        </div>
    );
  }
  
}

export default connect(
  state=>({state:state}),
  dispatch => ({SelectMC: (value) => {
    
      dispatch(CreateAction("SELECT_MENU_CONFIG", value))
      
  },
})
)(DetailСofiguration);
