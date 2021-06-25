import React from "react"
import Carousel from '@brainhubeu/react-carousel';
import '@brainhubeu/react-carousel/lib/style.css';
import Trending from "./trending"
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import {Link} from "react-router-dom"
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
const Slide = ({content,favourites,user})=>{
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
                    {content.map((property,index)=>{
                    return (
                        <Grid item xs={12} sm={6} md={3} lg={3} >
                        <Link to={user?`/app/crib/${property._id}`:`/crib/${property._id}`} key={index}>
                            <Trending favourite={favourites.includes(property._id)} name={`rating${index}`} details={property} color={index === 0?"#00C1C8":index===1?"#08191A":index===2?"#EE2B72":"#C8BB00"} key={index} />   
                        </Link>
                        </Grid>
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
const mapStateToProps=state=>({
    user:state.user
})
export default connect()(Slide);