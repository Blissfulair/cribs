import React, { useEffect, useRef, useState} from "react"
import { Link } from "react-router-dom";
import PropTypes from "prop-types"
import NavButton from "./Button/NavButton";
import "../scss/header.scss"
import Form from "./headerSearch";
import { isDescendant } from "../helpers/helpers";

const Head=({color, top, quickSearch, bgColor, openQuickSearch, sticky})=>{

    const [colors, setColors] = useState(top===400?'#fff':color)
    const [headerColor, setHeaderColor] = useState('#046FA7')
    const [width, setWidth] = useState(0)
    const [open, setOpen] = useState(false)
    const refs = useRef()


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
            refs.current.style.position='inherit'
            refs.current.style.backgroundColor='transparent'
            refs.current.style.width='inherit'
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
        <div ref={refs} className="showcase_head" style={{backgroundColor:bgColor?bgColor:'transparent', position:sticky?'fixed':'inherit'}}>
            <div  className="showcase__header">
            <div className="showcase__logo">
                <Link style={{color: colors}} to="/">Cribs NG</Link>
            </div>
            <div>
              <Form width={width} color={headerColor} open={open} onClick={onOpen}/>
            </div>
            <nav className="showcase__nav">
                <NavButton
                    color={colors}
                    border
                    borderColor={colors}
                    borderRadius={27}
                    height='44'
                    width='180'
                    borderWidth={2}
                    marginRight='3rem'
                    href="/properties"
                >
                    Host Accomodation
                </NavButton>
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
            </nav>
            <button className="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </button>
        </div>
    </div>
    )
}
export default Head;

Head.propTypes = {
    top:PropTypes.number,
    searchWidth:PropTypes.bool
  };
Head.defaultProps={
    top:400,
    searchWidth:true
}