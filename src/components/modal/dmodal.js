import React, {Component} from "react"
import PropTypes from "prop-types"
import "./index.scss"
class Dmodal extends Component{
    dmodal = React.createRef()
    handleClick=(e)=>{
        if((!this.dmodal.current.contains(e.target) && this.props.open && e.target.parentElement.className !== 'avatar-pro') || (!this.dmodal.current.contains(e.target) && !this.props.open && e.target.parentElement.className === 'avatar-pro')){
            if(this.props.onClose)
            this.props.onClose(false)
        }
    }
    componentDidMount(){
        document.addEventListener('click', this.handleClick)
    }
    componentWillUnmount(){
        document.removeEventListener('click', this.handleClick)
    }
    render(){
        return(
            <div ref={this.dmodal} style={{visibility:this.props.open?'visible':'hidden'}} className="dmodal">
                <div className="dmodal-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}
export default Dmodal
Dmodal.propTypes={
    open:PropTypes.bool,
    onClose:PropTypes.func
}
Dmodal.defaultProps={
    open:false,
    onClose:null
}