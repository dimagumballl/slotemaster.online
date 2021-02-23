
import {Component} from 'react'
import {connect} from 'react-redux'

import {CreateAction} from '../../../Store/action/MainAction';


class Bookmark extends Component {
  
  render(){
    const{DefaultOperation}=this.props.state
    const{Id}=this.props
    return (
      <div className="Bookmark" onClick={()=>this.props.Select(this.props.Id)} style={{backgroundColor:DefaultOperation.BookmarkList[Id].backg}}>
         {DefaultOperation.Game.SceneList[Id].SceneName}
      </div>
    );
  }
  
}

export default connect(
  state=>({state:state}),
  dispatch => ({Select: (value) => {
    
      dispatch(CreateAction("SELECT", value))
      
  },
})
)(Bookmark);
