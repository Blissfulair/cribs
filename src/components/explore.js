import React from "react"
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import City from "./city"
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
const Explore = ({content})=>{
    let slides = 3
    if(window){
        const width = window.innerWidth
        if(width <767){
            slides = 1
        }
    }
    return(
        <>
            
            {content.length > 0?(
                <Carousel
                    slidesPerPage={slides}
                    slidesPerScroll={1}
                    infinite
                    autoPlay={2500}
                    arrowLeft={
                        <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:1,left:15, display:'flex', alignItems:'center',justifyContent:'center'}} className="left">
                            <ArrowLeftIcon htmlColor="#fff"/>
                        </div>}
                    arrowLeftDisabled={
                        <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:1,left:15, display:'flex', alignItems:'center',justifyContent:'center'}} className="left">
                            <ArrowLeftIcon htmlColor="#fff"/>
                        </div>
                    }
                    arrowRight={
                        <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:1,right:15, display:'flex', alignItems:'center',justifyContent:'center'}} className="right">
                            <ArrowRightIcon htmlColor="#fff"/>
                        </div>
                    }
                    arrowRightDisabled={
                        <div style={{cursor:'pointer',height:30,width:30, borderRadius:'50%',top:'50%', transform:'translateY(-50%)', backgroundColor:'#000000', position:'absolute',zIndex:1,right:15, display:'flex', alignItems:'center',justifyContent:'center'}} className="right">
                        <ArrowRightIcon htmlColor="#fff"/>
                    </div>
                    }
                    addArrowClickHandler
                    >
                    {content.map((city,index)=>{
                    return (
                        <City color='#000000' link={city.link} name={city.name} image={city.image} description={city.description}  key={index} />
                    )
                    })
                    }
                </Carousel>
            ):''}
        </>
    )
}
export default Explore;