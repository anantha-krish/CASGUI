import React, { Component } from 'react';
import { Card } from 'primereact/card';
import CasButton  from '../common/formfields/CasButton';
import CasInputText from '../common/formfields/CasInputText';




class CasLoginScreen extends Component{

  constructor(props) {
    super(props);
    this.state = {
      userName : "",
      userNameError:"",
      password:"",
      passwordError:""
    };
    this.onChange=this.onChange.bind(this);
    this.loginToApplication=this.loginToApplication.bind(this);
    this.forgotPassword=this.forgotPassword.bind(this);
  }

  onChange=(e)=>{
    this.setState({
        [e.target.name]:e.target.value
    });
  }

  validateInputs(){
    let userNameError="";
    let passwordError="";
     if(!this.state.userName){
       userNameError="Username is Required";
     }
     if(!this.state.password){
       passwordError="Password is Required";
     }
     this.setState({
       userNameError:userNameError,
       passwordError:passwordError
     });
     if(userNameError || passwordError){
      return false;
     }
     return true;
  }


  
  loginToApplication = (e) =>{
    if(this.validateInputs()) {
      this.props.history.push("/home");
    }
  } 

  forgotPassword = (e) =>{
    console.log("forgotPassword");
  } 

  render(){
    /* const { t } = this.props; */
    const header = (
      <img alt="Card" src={require('../../assets/images/CAS_Logo.png') } onError={(e) => e.target.src='https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
    );
    const footer = (
      <div className="p-grid">
            <CasButton id="signIn" onClick={this.loginToApplication} label="Sign In" className="p-col-12" icon="pi pi-user" />
            <CasButton id="forgotPass" onClick={this.forgotPassword} label="Forgot Password" icon="pi pi-question-circle" className="p-button-danger p-col-12" />
            
      </div>
    );
    
    return (
      <div className="login-screen">
          <Card title="" subTitle="" style={{ width: '20em' }} className="ui-card-shadow" footer={footer} header={header}>
            <div className="p-grid">
              <CasInputText id="userName" placeholder="Username" name="userName" value={this.state.userName} onChange={this.onChange} className="p-d-block" errorText={this.state.userNameError} />
              <CasInputText id="password" placeholder="Password" password={true} name="password" value={this.state.password} onChange={this.onChange} className="p-d-block" errorText={this.state.passwordError} />
            </div>
          </Card>
      </div>
    );
  }
}

export default CasLoginScreen;
