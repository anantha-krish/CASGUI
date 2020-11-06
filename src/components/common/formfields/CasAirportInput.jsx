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
        selAirport:null,
        regionData:[]
      };
     
      this.onHide = this.onHide.bind(this);
      this.onPopUpShow = this.onPopUpShow.bind(this);
      this.selectRegion = this.selectRegion.bind(this);
      this.setRegionData = this.setRegionData.bind(this);
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

    setDefaultSelection(regionData){
      let selRegion=null;
      let selAirport=null;
      if(this.props.value){
        let value = this.props.value;
        regionData.forEach(function(region) {
          region.airport.some(function(airport) {
            if(airport.threeDigitCode === value){
              selRegion = region;
              selAirport = airport;
              return true;
            }
          });
        });
      }
      if(!selRegion){
        selRegion = regionData[0];
      }
      this.setState({
        selRegion,
        selAirport
      });

    }

    setRegionData(){
      console.log("region setting",this.state.regionData);
      let regionData=[];
       
      if(this.props.airportData && this.props.airportData.regions && this.props.airportData.regions.length) {
        regionData = this.props.airportData.regions;
      }
      this.setState({
        regionData
      });
      console.log("region setting",this.state.regionData);
    }
    componentDidMount() {
      this.setRegionData();
    }

    componentDidUpdate(prevProps) {
      if(JSON.stringify(this.props.airportData) !== JSON.stringify(prevProps.airportData) || this.props.value !==prevProps.value ){
        this.setRegionData();
      }
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
      this.setDefaultSelection(this.state.regionData);
      this.setState({
        displayDialog: true
      });
    }

    getRegionbyId =(id) => {
     let filteredRegion =  this.state.regionData.filter(region => region.id === parseInt(id));
     let region =null;
     if(filteredRegion && filteredRegion.length){
      region = filteredRegion[0];
     }
     return region;
    }

    getAirportbyId =(id) => {
      let filteredAirport =  this.state.selRegion.airport.filter(airport => airport.id === parseInt(id));
      let airport =null;
      if(filteredAirport && filteredAirport.length){
        airport = filteredAirport[0];
      }
      return airport;
     }

    selectRegion = (e)=>{
      if(e.target &&  e.target.id){
        let selRegion = this.getRegionbyId(e.target.id);
        this.setState({
          selRegion
        });
      }
      
    }

    selectAirport =(e) => {
      if(e.target &&  e.target.id){
        let airport = this.getAirportbyId(e.target.id);
        if(this.props.onChange) {
          this.props.onChange(
            {
              originalEvent: e,
              value: airport.threeDigitCode,
              stopPropagation : () =>{},
              preventDefault : () =>{},
              target: {
                  name: this.props.name,
                  id: this.props.id,
                  value: airport.threeDigitCode
              }
          });
          this.onHide();
        }
      }
    }

    renderRegions(){
      let regions =[];
      let selectedRegion = this.state.selRegion;
      if(this.state.regionData && this.state.regionData.length){
        regions =this.state.regionData.map((region, index)=>{
          let className = "airport-popup-region";
          if(selectedRegion && selectedRegion.id === region.id){
            className="airport-popup-region selected-region";
          }
          return (<div className={className} id={region.id} onClick={(e)=>{this.selectRegion(e)}}>{region.enName}</div>);
          
        });
      }
      return   regions;
    }

    renderAirports(){
      let airports =[];
      let selectedAirport = this.state.selAirport;
      if(this.state.selRegion && this.state.selRegion.airport && this.state.selRegion.airport.length){
        airports =this.state.selRegion.airport.map((airport, index)=>{
          let className = "airport-popup-airport";
          if(selectedAirport && selectedAirport.id === airport.id){
            className="airport-popup-airport selected-airport";
          }
          return (<div className={className} id={airport.id} onClick={(e)=>{this.selectAirport(e)}}>{airport.enName}/<span className="airport-code">{airport.threeDigitCode}</span></div>);
        });
      }
      return   airports;
    }

    
    renderDialogContent() {
      console.log("rendering",this.state.regionData);
      return(
        <div className="airport-popup-content">
          <div className="airport-popup-region-container">
            {this.renderRegions()}
          </div>
          <div className="airport-popup-airport-container">
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
        iconClassName="plane-arrival";
      }
     
    
      return (
        <div>
          <div className="p-inputgroup">
            <InputText id={id} placeholder={placeholder} className={className} keyfilter={keyfilter} type={type} size={size} value={value} name={name} onChange={onChange} disabled={disabled} 
              validateOnly={validateOnly} onInput={onInput} tooltip={tooltip} onFocus={onFocus} onBlur={onBlur} style={style} maxLength={maxLength} nextFocus={nextFocus} tabIndex={tabindex} />
            <Button  className="cas-airport-popup-icon"  onClick={this.onPopUpShow}><FontAwesomeIcon icon={iconClassName} /> </Button>
          </div>
          <Dialog header={this.props.header} className="cas-dialog airport-popup-dialog" visible={this.state.displayDialog}  modal onHide={this.onHide}>
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
