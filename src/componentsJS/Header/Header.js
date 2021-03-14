
import {Component} from 'react'
import {connect} from 'react-redux'

import './Header.css'
import {CreateAction} from '../../Store/action/MainAction';

class Header extends Component {
  Valid=(value)=>{
    let DefaultOperation = this.props.state.DefaultOperation
    let NameS = this.props.state.DefaultOperation.FirstInputName
    let IdS = this.props.state.DefaultOperation.FirstInputId
    let Name = this.props.state.DefaultOperation.Validation.FirstInputName
    let Id = this.props.state.DefaultOperation.Validation.FirstInputId
    
    if(!/^[A-Za-z0-9_.]+$/gi.test(NameS)){
      Name=!Name
    }
    if(!/^[0-9]+$/gi.test(IdS)){
      Id=!Id
    }
    if(Id&&Name){
      if(value=="Start"){
        this.props.PressFirstBut(DefaultOperation)
      }
      else if(value=="Reset"){
        this.props.VoidT({void:"Reset", value:null})
      }
      else if(value=="Export"){
        this.download(NameS, DefaultOperation)
      }
      else if(value=="Import"){
        
      }
    }
    else{
      this.props.Valid({Id:Id,Name:Name})
    }
  }
  download(F,objectData) {
    let filename = F+".json";
    let contentType = "application/json;charset=utf-8;";
    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      var blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(objectData)))], { type: contentType });
      navigator.msSaveOrOpenBlob(blob, filename);
    } else {
      var a = document.createElement('a');
      a.download = filename;
      a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(objectData));
      a.target = '_blank';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }
  IJ(e){
    
    e.preventDefault();
    const file = new Blob([e.target.files[0]], {type:"application/json"});
    let fr = new FileReader();
    
    
    
    fr.addEventListener("load", e => {
        
        this.props.ImportJSON(JSON.parse(fr.result))
      });
    
    fr.readAsText(file)
  }
  render(){
    const{DefaultOperation}=this.props.state
    return (
      <div className="Header">
        <div className="container_row">
            <input className="con_input" value={DefaultOperation.FirstInputId} style={DefaultOperation.Validation.FirstInputId?{width:"50px",height:"30px",marginLeft:"10px", background:"white"}:{width:"50px",height:"30px",marginLeft:"10px", background:"red"}} onChange={DefaultOperation.Game==undefined?this.props.InputFid:()=>{}}/>
                
            
            <input className="con_input" value={DefaultOperation.FirstInputName} style={DefaultOperation.Validation.FirstInputName?{width:"200px",height:"30px",marginLeft:"10px", background:"white"}:{width:"200px",height:"30px",marginLeft:"10px", background:"red"}}  onChange={ DefaultOperation.Game==undefined?this.props.InputFname:()=>{}}/>
                
            
            <div className="con_but" style={{width:"90px",height:"30px",marginLeft:"10px"}} onClick={()=>this.Valid(DefaultOperation.FirstBut)}>
                {
                    DefaultOperation.FirstBut 
                }
                
            </div>
        </div>
        <div className="container_row" style={{justifyContent:'flex-end'}}>
             <div className="con_but" style={{width:"90px",height:"30px"}} onClick={()=>this.Valid("Export")}>
                export
            </div>
              <label htmlFor="filePicker" className="con_but" style={{width:"90px",height:"30px"}}>
                Import
              </label>
              <input type="file" id="filePicker" style={{visibility:"hidden",width:"10px"}} onChange={(e)=>this.IJ(e)}/>
                
            

               
            
        </div>
      </div>
    );
  }
  
}

export default connect(
  state=>({state:state}),
  dispatch => ({
    PressFirstBut: (DefaultOperation, value) => {
      if(DefaultOperation.Game==undefined)
        dispatch(CreateAction("ADD_NEW_SCENE", value))
        dispatch(CreateAction("START_RESET"))
    },
    Valid: (value)=>{
      dispatch(CreateAction("VALIDATION", value))
    },
    InputFid: (event) => {
        dispatch(CreateAction("INPUT_FID", event.target.value))
    },
    InputFname: (event) => {
        dispatch(CreateAction("INPUT_FNAME", event.target.value))
    },
    ImportJSON:(state)=>{
      dispatch(CreateAction("IMPORT_JSON",state))
    },
    VoidT:(state)=>{
      dispatch(CreateAction("VOID_TYPE",state))
    }
  })
)(Header);