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
        this.dates = React.createRef();
        this.top = React.createRef();
    }
    onClick=()=>{
        this.setState({onOpen:!this.state.onOpen})
        if(this.state.onOpen){
            
           this.dates.current.style.width = '70%'
           this.dates.current.style.height = '300px'
           this.dates.current.style.left = '15%'
            this.top.current.style.width="30px"
            this.top.current.style.height="30px"
        }
        else
        {
           this.dates.current.style.width = '0px'
           this.dates.current.style.height = '0px'
           this.dates.current.style.left = '35%'
            this.top.current.style.width="0"
            this.top.current.style.height="0"
        }
    }
    componentDidUpdate(props, prev){
        console.log(props, prev)
    }
    render(){
        return(
            <>
            <div onClick={this.onClick} className="search-calendar">
                <div>{this.props.label}</div>
                <div>{this.props.value?new Date(this.props.value).getUTCDate():this.props.placeholder}</div>
                <div ref={this.top}  className="top"></div>
            </div>
            <Dates refs={this.dates}  width={this.state.width} height={this.state.height} count={this.state.count}/>
            </>
        )
    }
}
export default Calendar
Calendar.propTypes = {
    format: PropTypes.string,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.instanceOf(moment).isRequired,
    onClick: PropTypes.func,
  };
  
  Calendar.defaultProps = {
    format: 'dd/MM/yyyy',
    label:'',
    placeholder:'',
    value: '',
    onClick:null
  };

