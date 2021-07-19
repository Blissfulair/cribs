import React, { createRef, Component} from "react"
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types"
import NavButton from "./Button/NavButton";
import "../scss/header.scss"
import Form from "./headerSearch";
import { connect } from "react-redux";
import { chooseDashboard, setUser } from "../state/actions";
import { changeRole, makeHost } from "../apis/server";
import Modal from "./modal/index";

class Head extends Component{

        state={
            colors:this.props.top === 45?'#fff':this.props.color,
            headerColor:'#046FA7',
            width:0,
            open:false,
            menu:false
        }
        refs = createRef()
        //form = createRef()
        btn = createRef()

     becomeHost = ()=>{
         const history = this.props.history
        makeHost(this.props.user.id)
        .then((res)=>{
            this.props.chooseDashboard(!this.props.dashboard)
            this.props.setUser(res.user)

            if(history.location.pathname.includes('crib') || history.location.pathname.includes('search') || !history.location.pathname.includes('payment') || history.location.pathname.includes('history'))
            history.push('/app/dashboard')
            else
            history.push(history.location.pathname+history.location.search)
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    changeDashboard=()=>{
        const {chooseDashboard, user, dashboard,history}=this.props
        chooseDashboard(!dashboard)
        changeRole(user.id, {role:!dashboard})
        .then((res)=>{
        })
        .catch((e)=>{
            console.log(e)
        })
            if(dashboard)
            {
                if(history.location.pathname.includes('calendar') || history.location.pathname.includes('inbox') || history.location.pathname.includes('dashboard') || history.location.pathname.includes('withdraw') || history.location.pathname.includes('reviews') || history.location.pathname.includes('property') || history.location.pathname.includes('add-property') || history.location.pathname.includes('edit-property'))
                history.push('/app/home')
                else
                history.push(history.location.pathname+history.location.search)
            }
            else
            {
                if(history.location.pathname.includes('crib') || history.location.pathname.includes('search') || !history.location.pathname.includes('payment') || history.location.pathname.includes('history'))
                history.push('/app/dashboard')
                else
                history.push(history.location.pathname+history.location.search)
            }
         }
    onOpen = ()=>{
        this.setState({width:47, open:true, headerColor:'#fff'})
    }

    // useEffect(()=>{
    //     if(quickSearch && openQuickSearch){
    //         setWidth(47)
    //         setOpen(true)
    //         setHeaderColor('#fff')
    //     }
    // }, [openQuickSearch,quickSearch])
handleClick=(e)=>{
    // console.log(this.form.current.contains(e.target), e.target, this.form.current)
    //     if(!isDescendant(this.form.current, e.target) && this.state.width>0){
    //         // if(!this.props.openQuickSearch)
    //         // this.setState({width:15, open:false, headerColor:'#046FA7'})
           
    //    }
      
}
onCloseSearch=()=>{
    if(!this.props.openQuickSearch)
    this.setState({width:15, open:false, headerColor:'#046FA7'})
}
handleScroll = () => {
    const position = window.pageYOffset;

    if(position >=this.props.top){
        // this.refs.style.position='fixed'
        
        this.refs.style.top='0'
        this.refs.style.opacity='1'
        this.refs.style.backgroundColor='#CCE0FF'
        this.refs.style.backdropFilter='blur(20px)'
        this.refs.style.width='100%'
        this.setState({colors:this.props.color})
        if(this.state.width <15 && this.props.quickSearch){
            // setWidth(15)
            // setOpen(false)
            this.setState({width:15, open:false, headerColor:'#046FA7'})
            //setHeaderColor('#046FA7')
        }
      
    }
    // else if(position ===0){
    //     this.refs.style.top='-45px'
    //     this.refs.style.opacity='0'

    // }
    else{
        this.refs.style.backgroundColor='transparent'
        
        this.setState({width:0, colors:this.props.top===45?'#fff':this.props.color})
    }
}
    openMenu=()=>{
        this.setState({menu:true})
        console.log('open')
    }
    closeMenu=()=>{
        this.setState({menu:false})
    }
    componentDidMount(){
                if(this.props.quickSearch && this.props.openQuickSearch){
                    this.onOpen()
        }
        window.addEventListener('click',this.handleClick)
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount(){
        window.removeEventListener('scroll', this.handleScroll);
        window.removeEventListener('click', this.handleClick);
    }
 

    render(){
        const {user, bgColor} =this.props
        const {headerColor, colors,open,width}=this.state
    return(
        <div className="showcase__container">
        <div ref={(ref)=>this.refs=ref} className="showcase_head" style={{backgroundColor:bgColor?bgColor:'transparent', position:'fixed', top:0}}>
            <div  className="showcase__header">
            <div className="showcase__logo">
                <Link style={{color: colors}} to="/">Crib NG</Link>
            </div>
            <div>
              <Form onClose={this.onCloseSearch} width={width} color={headerColor} open={open} onClick={this.onOpen}/>
            </div>
            <nav className="showcase__nav">
                    {
                        user?
                            !user.emailVerify?
                        <NavButton
                            color={colors}
                            border
                            borderColor={colors}
                            borderRadius={27}
                            height='44'
                            width='180'
                            borderWidth={2}
                            marginRight='3rem'
                            href="/app/property"
                        >
                            Host Accomodation
                        </NavButton>
                            :''
                        :
                        <NavButton
                        color={colors}
                        border
                        borderColor={colors}
                        borderRadius={27}
                        height='44'
                        width='180'
                        borderWidth={2}
                        marginRight='3rem'
                        href="/app/property"
                        >
                            Host Accomodation
                        </NavButton>
                    }
                    {
                        user?
                            user.emailVerify?
                            user.type ==='host'?
                                <button
                                onClick={this.changeDashboard}
                                >
                                Host
                                </button>
                                :
                                <button onClick={this.becomeHost}>Become a host</button>
                                :
                                <NavButton
                                color='#fff'
                                backgroundColor='#046FA7'
                                border
                                borderRadius={27}
                                height='44'
                                width='106'
                                href="/login"
                                    
                                >
                                    Sign in
                                </NavButton>
                                :
                                <NavButton
                                color='#fff'
                                backgroundColor='#046FA7'
                                border
                                borderRadius={27}
                                height='44'
                                width='106'
                                href="/login"
                                
                                >
                                    Sign in
                                </NavButton>
                    
                    }
                </nav>
            <button  onClick={this.openMenu} className="hamburger">
                <span  onClick={this.openMenu}></span>
                <span  onClick={this.openMenu}></span>
                <span  onClick={this.openMenu}></span>
            </button>
        </div>


        
    </div>

    <Modal onOpen={this.state.menu}  closeMenu={this.closeMenu} >
                <nav className="showcase__nav">
                    {
                        user?
                            !user.emailVerify?
                        <NavButton
                            color={colors}
                            border
                            borderColor={colors}
                            borderRadius={27}
                            height='44'
                            width='180'
                            borderWidth={2}
                            marginRight='3rem'
                            href="/app/property"
                        >
                            Host Accomodation
                        </NavButton>
                            :''
                        :
                        <NavButton
                        color={this.props.color}
                        border
                        borderColor={this.props.color}
                        borderRadius={27}
                        height='44'
                        width='180'
                        borderWidth={2}
                        marginRight='3rem'
                        href="/app/property"
                        >
                            Host Accomodation
                        </NavButton>
                    }
                    {
                        user?
                            user.emailVerify?
                            user.type ==='host'?
                                <button
                                onClick={this.changeDashboard}
                                >
                                Host
                                </button>
                                :
                                <button onClick={this.becomeHost}>Become a host</button>
                                :
                                <NavButton
                                color='#fff'
                                backgroundColor='#046FA7'
                                border
                                borderRadius={27}
                                height='44'
                                width='106'
                                href="/login"
                                    
                                >
                                    Sign in
                                </NavButton>
                                :
                                <NavButton
                                color='#fff'
                                backgroundColor='#046FA7'
                                border
                                borderRadius={27}
                                height='44'
                                width='106'
                                href="/login"
                                
                                >
                                    Sign in
                                </NavButton>
                    
                    }
                </nav>
            </Modal>

    </div>
    )
}
}
const mapStateToProps=state=>({
    user:state.user,
    dashboard:state.dashboard
})
const mapDispatchToProps=dispatch=>({
    chooseDashboard:(payload)=>dispatch(chooseDashboard(payload)),
    setUser: (payload) => dispatch(setUser(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Head));

Head.propTypes = {
    top:PropTypes.number,
    searchWidth:PropTypes.bool
  };
Head.defaultProps={
    top:45,
    searchWidth:true
}