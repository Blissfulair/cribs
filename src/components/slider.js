import React from "react"
import Carousel from "./carousel";
const Slide = ({children})=>{
    return(
                <Carousel
                    slidesPerPage={4}
                    slidesPerScroll={2}
                    infinite
                    offset={16}
                    minDraggableOffset={20}
                    // arrowLeft={
                    //     <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:10,left:-15, display:'flex', alignItems:'center',justifyContent:'center'}} className="left">
                    //         <ArrowLeftIcon htmlColor="#fff"/>
                    //     </div>}
                    // arrowRight={
                    //     <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:10,right:-15, display:'flex', alignItems:'center',justifyContent:'center'}} className="right">
                    //         <ArrowRightIcon htmlColor="#fff"/>
                    //     </div>
                    // }
                    
                    >
                        {children}
                </Carousel>
    )
}
export default Slide;