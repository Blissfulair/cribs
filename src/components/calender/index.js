import React, {Component} from "react"
import PropTypes from 'prop-types';
import moment from 'moment';
import "./calendar.scss"
import Dates from "./dates";
class Calendar extends Component{
    constructor(props){
        super(props)
        this.state={
            onOpen:false,
            width:0,
            height:0,
            count:'unset'
        }
    }
    onClick=()=>{
        if(this.state.onOpen){
            this.setState({width:0, onOpen:false, height:0, count:'unset'})
        }
        else
        this.setState({width:200, onOpen:true, height:250, count:2})
    }
    render(){
        return(
            <div onClick={this.onClick} className="search-calendar">
                <div>{this.props.label}</div>
                <div>{this.props.value?new Date(this.props.value).getUTCDate():this.props.format}</div>
                <Dates width={this.state.width} height={this.state.height} count={this.state.count}/>
            </div>
        )
    }
}
export default Calendar
Calendar.propTypes = {
    format: PropTypes.string,
    label: PropTypes.string,
    value: PropTypes.instanceOf(moment).isRequired,
    onClick: PropTypes.func,
  };
  
  Calendar.defaultProps = {
    format: 'dd/MM/yyyy',
    label:'',
    value: moment().startOf('day'),
    onClick:null
  };

