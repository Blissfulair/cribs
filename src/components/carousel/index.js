import React, {createRef, useState, useEffect} from "react"
import PropTypes from "prop-types"
import "./index.scss"
const Carousel =({children})=>{
    const track = createRef()
    const [current, setCurrent] = useState(0)
    const [move, setMove] = useState(0)
    const next=()=>{
        const items = track.current.childNodes
        if(current < items.length){
            
            for(let i = 0; i < items.length; i++){
                setMove(-400*(current+1))
                const str = items[i].style.transform.split('(')[1]
                const num = Number(str.slice(0, str.length-3))
                items[i].style.transform=`translateX(${move+num}px)`
            }
            setCurrent(current+1)
        }
    }
    const prev=()=>{
        const items = track.current.childNodes
        if(current < items.length){
            
            for(let i = 0; i < items.length; i++){
                setMove(400*(current+1))
                const str = items[i].style.transform.split('(')[1]
                const num = Number(str.slice(0, str.length-3))
                items[i].style.transform=`translateX(${move+num}px)`
            }
            setCurrent(current-1)
        }
    }

    useEffect(()=>{
        const items = track.current.childNodes
            for(let i = 0; i < items.length; i++){
                items[i].style.transform=`translateX(${0}px)`
            }
            console.log(track.current)
            //  track.current.append(track.current)
    },[track])
    return(
        <div className="carousel-main-container">
            <button onClick={prev}></button>
            <div ref={track} className="carousel-main-container-track">
                {children}
            </div>
            <button onClick={next}></button>
        </div>
    )
}
export default Carousel

Carousel.propTypes={
    children:PropTypes.instanceOf(React.Children).isRequired
}
Carousel.defaultProps={

}