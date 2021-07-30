import React, { Component } from "react"
import PropTypes from "prop-types"
import Calendar from "../calender"
import "./index.scss"
import Guest from "../guest"
import { getDates } from "../../helpers/helpers"
import SearchIcon from "../../images/searchicon.svg"
import { searchProperties } from "../../apis/server"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import { storeSearchData } from "../../state/actions"
class Form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            location: this.props.searchData.location,
            checkIn: this.props.searchData.checkIn,
            checkOut: this.props.searchData.checkOut,
            guest: this.props.searchData.guest,
            children:this.props.searchData.children,
            adult:this.props.searchData.adult,
            infant:this.props.searchData.infant,
            pet:this.props.searchData.pet,
            open: false,
            interval:null
        }
        this.searchForm= React.createRef()
    }
    componentDidMount() {
        this.setState({ 
            open: this.props.open?this.props.open:this.state.open,
         })
         document.addEventListener('click', this.handleClick)
    }
    handleClick=(e)=>{

        if(this.searchForm.current){
            if(!this.searchForm.current.contains(e.target) && this.props.open && this.props.width>15 && e.target.className !=='qsearch1' ){

                if(this.props.onClose)
                this.props.onClose()
            }
        }
          
    }
    componentDidUpdate(prevProps, prevState) {
        // if(prevProps.open !== this.props.open){
        //     if(this.props.open){
        //        const interval =  setTimeout(()=>{
        //             this.setState({open:this.props.open})
        //            }, 190)
        //            this.setState({interval})
        //     }
        //     else
        //     this.setState({open:this.props.open})
        //     }
    }
    componentWillUnmount(){
        clearTimeout(this.state.interval)
        document.removeEventListener('click', this.handleClick)
    }
    setDays = () => {
        const dates = getDates(this.state.checkIn, this.state.checkOut)
        this.setState({ days: dates.length })
    }
     onSubmit =(e)=>{
        e.preventDefault()
        if(!this.state.location || !this.state.checkOut || !this.state.checkIn)
        return
        const data = {
            location: this.state.location,
            checkIn: this.state.checkIn,
            checkOut: this.state.checkOut,
            guest: this.state.guest,
            children:this.state.children,
            adult:this.state.adult,
            infant:this.state.infant,
            pet:this.state.pet,
        }
        this.props.storeSearchData(data)
        searchProperties({search:this.state.location})
        .then(()=>{
            //setLoading(false)
            this.props.history.push({
                pathname: !this.props.user?'/search':'/app/search',
                search: `?location=${this.state.location}&check-in=${this.state.checkIn}&check-out=${this.state.checkOut}&guest=${this.state.guest}`
            })
        })
        .catch((er)=>{
            //setLoading(false)
        })
    }
    render() {
        
        return (
            <>
                {
                    this.props.width > 0 ?
                        <div style={{ width: `${this.props.width}vw`, backgroundColor: this.props.color }} ref={this.searchForm} className={`form-index ${this.props.open?'open':'close'}`}>
                            {
                                // this.state.open &&
                                <form onSubmit={this.onSubmit}>
                                    <div className="location">
                                        <input className='location__input' value={this.state.location} onChange={e=>this.setState({location:e.target.value})} type="text" name="location" id="" placeholder="Where do you want to lodge?" />
                                      
                                        <label className='location__text' htmlFor="">Location</label>
                                    </div>
                                    <div className="checkin">
                                        <Calendar
                                            top="160%"
                                            caret="-90%"
                                            right="-26vw"
                                            label="Check In"
                                            format="dd/MM/yyyy"
                                            value={this.state.checkIn}
                                            placeholder="Pick Dates"
                                            onChange={(e) => {
                                                if (Date.parse(e) > Date.parse(this.state.checkOut) || this.state.checkOut === '')
                                                    this.setState({ checkIn: e, checkOut: e }, () => { this.setDays() })
                                                else
                                                    this.setState({ checkIn: e }, () => { this.setDays() })
                                            }}
                                        />
                                    </div>
                                    <div className="checkin">
                                        <Calendar
                                            top="160%"
                                            caret="-90%"
                                            right="-18vw"
                                            label="Check Out"
                                            format="dd/MM/yyyy"
                                            placeholder="Pick Dates"
                                            value={this.state.checkOut}
                                            onChange={(e) => { this.setState({ checkOut: e }) }}
                                          
                                        />
                                    </div>
                                    <div className="checkin">
                                        <Guest
                                            caret="-90%"
                                            top="160%"
                                            right="-9vw"
                                            label="Guests"
                                            placeholder="Select Guests"
                                            onChange={(e)=>{this.setState({guest:e.guest, adult:e.adult, children:e.children, infant:e.infant})}}
                                            adult={this.state.adult}
                                            childrens={this.state.children}
                                            infant={this.state.infant}
                                            onCheck={pet=>this.setState({pet})}
                                            checked={this.state.pet}
                                            value={this.state.guest}
                                        />
                                    </div>

                                    <button className="s-button">
                                        <img src={SearchIcon} alt="" />
                                    </button>
                                </form>
                            }
                            {
                                this.props.width <= 15 ?
                                    <button id="qsearch1" className="qsearch1" onClick={this.props.onClick}>
                                        <span className="qsearch1">Quick Search</span>
                                        <img className="qsearch1" src={SearchIcon} alt="" />
                                    </button>
                                    : ''
                            }
                        </div>
                        : ''
                }
            </>
        )
    }
}

const mapStateToProps=state=>({
    searchData:state.searchData,
    user:state.user
})
const mapDispatchToProps=dispatch=>({
    storeSearchData:(payload)=>dispatch(storeSearchData(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(Form))

Form.propTypes = {
    onClick: PropTypes.func,
    onClose:PropTypes.func,
}
Form.defaultProps={
    onClose:null
}