import React, {Component,createRef} from "react"
import PropTypes from "prop-types"
import "./index.scss"
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
class Carousel extends Component{
    state={
        data:0,
        num:1,
        timer:null,
        start:0,
        end:0,
        children:0
    }
     track = createRef()
    
    next=()=>{
        
        const items = this.track.current
        items.scrollLeft += (items.offsetWidth/this.state.num)
        if(this.props.infinite)
        if(items.scrollLeft >= (items.scrollWidth-items.offsetWidth)){
            items.scrollLeft =0
        }
    }
    prev=()=>{
        const items = this.track.current
       
        items.scrollLeft -= (items.offsetWidth/this.state.num)
        if(this.props.infinite)
        if(items.scrollLeft <= 0){
            items.scrollLeft =items.scrollWidth
        }
    }
    autoPlay=()=>{
        if(this.props.auto)
        return setInterval(this.next,this.props.auto)

    }
    handleMouseEnter =()=>{
        if(this.props.auto){
            clearInterval(this.state.timer)
            this.setState({timer:null})
        }
    }
    handleMouseLeave=()=>{
        if(this.props.auto){
            const time =  this.autoPlay()
            this.setState({timer:time})
        }
    }

    handleTouchStart=(start)=>{
        this.track.current.classList.add('swipe')
        this.setState({start})
    }
    handleTouchMove=(end)=>{
        this.setState({end})
    }
    handleMouseLeave=()=>{
        this.track.current.classList.remove('swipe')
    }
    handleTouchEnd=()=>{
        this.track.current.classList.remove('swipe')
        if(this.state.start - this.state.end > this.props.minDraggableOffset)
            this.next()
        else if(this.state.start-this.state.end < -this.props.minDraggableOffset)
            this.prev()
    }

    componentDidMount(){
        const items = this.props.children.length
        let scrolls = this.props.slidesPerPage/this.props.slidesPerScroll
        const timer = this.props.auto? this.autoPlay():null
        this.setState({data:items, num:scrolls, timer:timer, children:this.props.children})
        this.track.current.classList.add(`slides-per-page-${this.props.slidesPerPage}`)
    }
    componentWillUnmount(){
        if(this.props.auto)
        clearInterval(this.state.timer)
    }
    componentDidUpdate(prevProps, prevState){
        if(prevProps !== this.props)
        this.setState({data:this.props.children.length})
    }
    render(){
        const {data}=this.state
        const {slidesPerPage}=this.props
    return(
        <div className="carousel-main-container">
            {
                data>slidesPerPage?
                this.props.arrowLeft?
                    this.props.arrowLeft:
                <button 
                onClick={this.prev}
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                >
                    <ArrowBackIcon/>
                </button>
                :''
            }
            <div 
                ref={this.track} 
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                onTouchStart={(e)=>this.handleTouchStart(e.targetTouches[0].clientX)}
                onTouchMove={(e)=>this.handleTouchMove(e.targetTouches[0].clientX)}
                onTouchEnd={this.handleTouchEnd}
                // onMouseDown={(e)=>this.handleTouchStart(e.nativeEvent.clientX)}
                // onMouseMove={(e)=>this.handleTouchMove(e.nativeEvent.clientX)}
                // onMouseUp={this.handleTouchEnd}
                className="carousel-main-container-track"
                >
                {this.props.children}
            </div>
            {
                 data>slidesPerPage?
                    this.props.arrowRight?
                    this.props.arrowRight:
                <button 
                onClick={this.next} 
                onMouseEnter={this.handleMouseEnter}
                onMouseLeave={this.handleMouseLeave}
                >
                    <ArrowForwardIcon/>
                </button>
                :''
            }
        </div>
    )
    }
}
export default Carousel

Carousel.propTypes={
    children:PropTypes.instanceOf(React.Children).isRequired,
    slidesPerScroll:PropTypes.number,
    slidesPerPage:PropTypes.number,
    auto:PropTypes.number,
    arrowRight:PropTypes.instanceOf(React.Component).isRequired,
    arrowLeft:PropTypes.instanceOf(React.Component).isRequired,
    infinite:PropTypes.bool,
    minDraggableOffset:PropTypes.number
}
Carousel.defaultProps={
    slidesPerScroll:1,
    slidesPerPage:4,
    auto:0,
    arrowRight:null,
    arrowLeft:null,
    infinite:false,
    minDraggableOffset:1200
}