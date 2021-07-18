import React, { useEffect, useRef, useState} from "react"
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types"
import NavButton from "./Button/NavButton";
import "../scss/header.scss"
import Form from "./headerSearch";
import { isDescendant } from "../helpers/helpers";
import { connect } from "react-redux";
import { chooseDashboard, setUser } from "../state/actions";
import { changeRole, makeHost } from "../apis/server";

const Head=({color, top, quickSearch, bgColor, openQuickSearch, sticky,history, dashboard, user, chooseDashboard, setUser})=>{

    const [colors, setColors] = useState(top===400?'#fff':color)
    const [headerColor, setHeaderColor] = useState('#046FA7')
    const [width, setWidth] = useState(0)
    const [open, setOpen] = useState(false)
    const refs = useRef()
    const becomeHost = ()=>{
        makeHost(user.id)
        .then((res)=>{
            chooseDashboard(!dashboard)
            setUser(res.user)

            if(history.location.pathname.includes('crib') || history.location.pathname.includes('search') || !history.location.pathname.includes('payment') || history.location.pathname.includes('history'))
            history.push('/app/dashboard')
            else
            history.push(history.location.pathname+history.location.search)
        })
        .catch((e)=>{
            console.log(e)
        })
    }
    const  changeDashboard=()=>{
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
    const onOpen = ()=>{
        setWidth(47)
        setOpen(true)
        setHeaderColor('#fff')
    }

    useEffect(()=>{
        if(quickSearch && openQuickSearch){
            setWidth(47)
            setOpen(true)
            setHeaderColor('#fff')
        }
    }, [openQuickSearch,quickSearch])
    useEffect(() => {
        const handleClick=(e)=>{
            if(!isDescendant(document.querySelector('.form-index'), e.target) && width>0){
            setWidth(15)
            setOpen(false)
            setHeaderColor('#046FA7')
           }
          
    }
    const handleScroll = () => {
        const position = window.pageYOffset;
        if(position >=top){
            refs.current.style.position='fixed'
            refs.current.style.top='0'
            refs.current.style.backgroundColor='#CCE0FF'
            refs.current.style.backdropFilter='blur(20px)'
            refs.current.style.width='100%'
            setColors(color)
            if(width <15 && quickSearch){
                setWidth(15)
                setOpen(false)
                setHeaderColor('#046FA7')
            }
          
        }
        else{
            refs.current.style.position=''
            refs.current.style.backgroundColor='transparent'
            refs.current.style.width='inherit'
            refs.current.style.top='-90px'
            setColors(top===400?'#fff':color)
            setWidth(0)
        }
    };
        document.addEventListener('click',handleClick)
        document.addEventListener('scroll', handleScroll);
    
        return () => {
            document.removeEventListener('scroll', handleScroll);
            document.removeEventListener('click', handleClick);
        };
    }, [width, color, top,quickSearch]);
    return(
        <div className="showcase__container">
        <div ref={refs} className="showcase_head" style={{backgroundColor:bgColor?bgColor:'transparent', position:sticky?'fixed':'inherit'}}>
            <div  className="showcase__header">
            <div className="showcase__logo">
                <Link style={{color: colors}} to="/">Crib NG</Link>
            </div>
            <div>
              <Form width={width} color={headerColor} open={open} onClick={onOpen}/>
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
                            onClick={changeDashboard}
                            >
                            Host
                            </button>
                            :
                            <button onClick={becomeHost}>Become a host</button>
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
            <button className="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
    </div>
    )
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
    top:400,
    searchWidth:true
}