import {keys} from "lodash"
import {Component} from 'react'
import {connect} from 'react-redux'




class AllInfo extends Component {
  
  render(){
    const{DefaultOperation}=this.props.state
    const{Id}=this.props
    return (
      <div className="container_column" style={{marginTop:"40px"}}>
        <div className="container_row" style={{justifyContent:"center"}}>
            <h2>BasegameHitRate: {DefaultOperation.Game.SceneList[Id].BasegameHitRate}</h2>
        </div>
        <div className="container_column" style={{overflow:"auto", maxWidth:"100%"}}>
          <div className="container_row" >
            <div className="container_row" style={{minWidth:"100px",border:"1px solid black"}}>
                Symbol
            </div>
            {
                
                
                keys(DefaultOperation.Game.SceneList[Id].Reels).length!=0?
                keys(DefaultOperation.Game.SceneList[Id].Reels)
                            .map((key)=>
                            <div key={key}  className="container_row" style={{minWidth:"60px", border:"1px solid black", justifyContent:"center"}}>
                                
                                {(key)}
                            </div>)
                :<div style={{display:"none"}}></div>
            }
          </div>
          {
                keys(DefaultOperation.Game.SceneList[Id].Symbols).length!=0?
                keys(DefaultOperation.Game.SceneList[Id].Reels).length!=0?
                keys(DefaultOperation.Game.SceneList[Id].Reels[1].symbols)
                            .map((key)=>
                            <div className="container_column"  key={key}>
                                <div className="container_row">
                                <div key={key} className="container_row" style={{minWidth:"100px", border:"1px solid black", justifyContent:"center", overflow:"hidden"}}>
                                    {
                                        
                                    DefaultOperation.Game.SceneList[Id].Symbols[key].name}
                                </div>
                                {
                                    keys(DefaultOperation.Game.SceneList[Id].Reels[1].symbols[key].Rate).map((key1)=>
                                        <div key={key1} className="container_row" style={{minWidth:"60px", border:"1px solid black", justifyContent:"center"}}>
                                            {DefaultOperation.Game.SceneList[Id].Reels[1].symbols[key].Rate[key1]}
                                        </div>
                                    )
                                }
                                </div>
                                
                                
                            </div>
                            )
                :<div style={{display:"none"}}></div>:<div style={{display:"none"}}></div>
            }
        </div>
        
        
        <div className="container_row" style={{justifyContent:"center", marginTop:"40px"}}>
            <h2>Returns</h2>
        </div>
        <div className="container_column" style={{overflow:"auto", maxWidth:"100%"}}>
          <div className="container_row" >
            <div className="container_row" style={{minWidth:"100px",border:"1px solid black"}}>
                Symbol
            </div>
            {
                
                
                keys(DefaultOperation.Game.SceneList[Id].Reels).length!=0?
                keys(DefaultOperation.Game.SceneList[Id].Reels)
                            .map((key)=>
                            <div key={key}  className="container_row" style={{minWidth:"60px", border:"1px solid black", justifyContent:"center"}}>
                                
                                {(key)}
                            </div>)
                :<div style={{display:"none"}}></div>
            }
          </div>
          {
                keys(DefaultOperation.Game.SceneList[Id].Symbols).length!=0?
                keys(DefaultOperation.Game.SceneList[Id].Reels).length!=0?
                keys(DefaultOperation.Game.SceneList[Id].Reels[1].symbols)
                            .map((key)=>
                            <div className="container_column"  key={key}>
                                <div className="container_row">
                                <div key={key} className="container_row" style={{minWidth:"100px", border:"1px solid black", justifyContent:"center", overflow:"hidden"}}>
                                    {
                                        
                                    DefaultOperation.Game.SceneList[Id].Symbols[key].name}
                                </div>
                                {
                                    keys(DefaultOperation.Game.SceneList[Id].Reels[1].symbols[key].Rate).map((key1)=>
                                        <div key={key1} className="container_row" style={{minWidth:"60px", border:"1px solid black", justifyContent:"center"}}>
                                            {DefaultOperation.Game.SceneList[Id].Reels[1].symbols[key].RTP[key1]}
                                        </div>
                                    )
                                }
                                </div>
                                
                                
                            </div>
                            )
                :<div style={{display:"none"}}></div>:<div style={{display:"none"}}></div>
            }
        </div>
      </div>   
    );
  }
  
}

export default connect(
  state=>({state:state}),
  dispatch => ({
    
  })
)(AllInfo);
