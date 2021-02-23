import '../common/Style/main.css'
import {Component} from 'react'
import {connect} from 'react-redux'

import {CreateAction} from '../Store/action/MainAction';
import Header from '../componentsJS/Header/Header'
import SlotsScenes from '../componentsJS/SlotsScenes/SlotsScenes'

class App extends Component {
  
  render(){
    return (
      <div className="App">
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
    AddContact: () => {
      dispatch(CreateAction())
    }
  })
)(App);
