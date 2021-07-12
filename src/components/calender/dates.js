import React, {Component} from "react"
import PropTypes from 'prop-types';
// import moment from 'moment';
import "./calendar.scss"
class Dates extends Component{

    render(){
        return(
            <div style={{animationIterationCount: this.props.count}} className="calendar-display">
                <div>{this.props.day}</div>
            </div>
        )
    }
}
export default Dates
Dates.propTypes = {
    day: PropTypes.string,
    onSelect: PropTypes.func,
    width:PropTypes.number,
    height:PropTypes.number,
    count:PropTypes.any
  };
  
  Dates.defaultProps = {
    day: '',
    onSelect:null,
    width:0,
    height:0,
    count:0
  };

