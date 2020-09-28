import React from "react"
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Trending from "./trending"
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
const Slide = ({content})=>{
    return(
        <>
            
            {content.length > 0?(
                <>
                <Carousel
                    slidesPerPage={1}
                    slidesPerScroll={4}
                    infinite
                    offset={16}
                    minDraggableOffset={20}
                    itemWidth={265}
                    arrowLeft={
                        <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:10,left:15, display:'flex', alignItems:'center',justifyContent:'center'}} className="left">
                            <ArrowLeftIcon htmlColor="#fff"/>
                        </div>}
                    arrowLeftDisabled={
                        <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:10,left:15, display:'flex', alignItems:'center',justifyContent:'center'}} className="left">
                            <ArrowLeftIcon htmlColor="#fff"/>
                        </div>
                    }
                    arrowRight={
                        <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:10,right:15, display:'flex', alignItems:'center',justifyContent:'center'}} className="right">
                            <ArrowRightIcon htmlColor="#fff"/>
                        </div>
                    }
                    arrowRightDisabled={
                        <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:10,right:15, display:'flex', alignItems:'center',justifyContent:'center'}} className="right">
                        <ArrowRightIcon htmlColor="#fff"/>
                    </div>
                    }
                    addArrowClickHandler
                    >
                    {content.map((new_deal,index)=>{
                    return (
                        <Trending name={`rating${index}`} color={index === 0?"#00C1C8":index===1?"#08191A":index===2?"#EE2B72":"#C8BB00"} key={index} />
                    )
                    })
                    }
                </Carousel>
                </>
            ):(
                <div>
                    <h1>null</h1>
                </div>
                )}
        </>
    )
}
export default Slide;