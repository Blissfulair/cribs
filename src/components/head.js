import React from "react"
import { Link } from "react-router-dom";
import NavButton from "./Button/NavButton";

const Head=({color})=>{
    return(
        <div className="showcase__header">
        <div className="showcase__logo">
            <Link style={{color: color?color:'#fff'}} to="/">Cribs NG</Link>
        </div>
        <nav className="showcase__nav">
            <NavButton
                color={color?color:'#fff'}
                border
                borderColor={color?color:'#fff'}
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

    </div>
    )
}
export default Head;