import React, { Component } from 'react';
import {InputText} from 'primereact/inputtext';
import PropTypes from 'prop-types';
import { Button } from "primereact/button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Dialog } from 'primereact/dialog';



class CasAirportInput extends Component {

    constructor(props){
      super(props);
      this.state = {
        displayDialog: false,
        selRegion:null,
        regionData:[],
        selRegAirportData:[],
        allAirportData:[]
      };
      this.onHide = this.onHide.bind(this);
      this.onPopUpShow = this.onPopUpShow.bind(this);

    }
    
    static propTypes = {
        id:PropTypes.string,
        type:PropTypes.any,
        size:PropTypes.number,
        name:PropTypes.string.isRequired,
        value:PropTypes.any,
        disabled:PropTypes.bool,
        onChange:PropTypes.func.isRequired,
        validateOnly:PropTypes.bool,
        tooltip: PropTypes.any,
        hotkey: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.any,
        customFocus:PropTypes.func,
        onInput:PropTypes.func,
        customBlur:PropTypes.func,
        maxLength:PropTypes.number,
        keyfilter:PropTypes.string,
        nextFocus:PropTypes.string,
        tabindex:PropTypes.number,
        label:PropTypes.string,
        errorText:PropTypes.string,
        placeholder:PropTypes.string,
        airportType:PropTypes.string,
        header:PropTypes.string,
        airportData: PropTypes.any
    }

    static defaultProps = {
        disabled: false,
        hotkey: '',
        id:'',
        name:'',
        value:'',
        keyfilter: null,
        nextFocus:'',
        maxLength:100,
        tabindex:null,
        label:"",
        errorText:"",
        placeholder:"",
        airportType:"",
        header:"Select the Airport",
        airportData:{}
        
    };

    componentDidUpdate(prevProps) {
      if(JSON.stringify(this.props.airportData) !== JSON.stringify(prevProps.airportData)){
        let regionData=[];
        let selRegion=null;
        if(this.props.airportData && this.props.airportData.regions && this.props.airportData.regions.length) {
          regionData = this.props.airportData.regions;
          selRegion = regionData[0];
        }
        debugger
        this.setState({
          regionData,
          selRegion
        });

      }
      console.log(this.state.regionData);
    }

 
    renderErrorText() {
      if(this.props.errorText){
        return(
          <small className="cas-inline-err-text p-d-block">{this.props.errorText}</small>
        );
      }
    }

    onHide = ()=> {
      this.setState({
        displayDialog: false
      });
    }

    onPopUpShow = ()=> {
      this.setState({
        displayDialog: true
      });
    }

    renderRegions(){
      let regions =[];
      if(this.state.regionData && this.state.regionData.length){
        regions =this.state.regionData.map((region, index)=>{
          return (<div><span>{region.enName}</span></div>);
        });
      }
      return   regions;
      
    }

    renderAirports(){
      let airports =[];
      if(this.state.selRegion && this.state.selRegion.airport && this.state.selRegion.airport.length){
        airports =this.state.selRegion.airport.map((airport, index)=>{
          return (<div><span>{airport.enName}/{airport.threeDigitCode}</span></div>);
        });
      }
      return   airports;
    }

    
    renderDialogContent() {
      return(
        <div className="">
          <div>
            {this.renderRegions()}
          </div>
          <div>
            {this.renderAirports()}
          </div>
        </div>
      );
    }


    renderField() {
      const {
        id,
        type,
        name,
        size,
        value,
        disabled,
        onChange,
        validateOnly,
        tooltip,
        style,
        maxLength,
        keyfilter,
        nextFocus,
        tabindex,
        onFocus,
        onBlur,
        placeholder,
        onInput,
        airportType
        
      } = this.props;
      let className = this.props.className;
      if(this.props.errorText){
        className = className + " p-invalid";
      }
      let iconClassName = "plane";
      if(airportType && airportType ==="departure"){
        iconClassName="plane-departure";
      } else if (airportType && airportType ==="arrival") {
        iconClassName="plane-departure";
      }
      const footer = (
        <div>
            <Button label="Select" icon="pi pi-check" onClick={this.onHide} />
        </div>
      );
    
      return (
        <div>
          <div className="p-inputgroup">
            <InputText id={id} placeholder={placeholder} className={className} keyfilter={keyfilter} type={type} size={size} value={value} name={name} onChange={onChange} disabled={disabled} 
              validateOnly={validateOnly} onInput={onInput} tooltip={tooltip} onFocus={onFocus} onBlur={onBlur} style={style} maxLength={maxLength} nextFocus={nextFocus} tabIndex={tabindex} />
            <Button  className="cas-airport-popup-icon"  onClick={this.onPopUpShow}><FontAwesomeIcon icon={iconClassName} /> </Button>
          </div>
          <Dialog header={this.props.header}  visible={this.state.displayDialog} style={{width: '50vw'}} modal onHide={this.onHide}>
            {this.renderDialogContent()}
          </Dialog>
        </div>
      )

    }

    render () {
      return (
        <div className="cas-input-field">
          {this.renderField()}
          {this.renderErrorText()}
        </div>
      )
    }

  }

export default CasAirportInput;
