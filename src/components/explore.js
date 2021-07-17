import React from "react"
import Carousel from './carousel';
import City from "./city"
const Explore = ({content,height})=>{

    return(
        <>
            
            {content.length > 0?(
                <Carousel
                    slidesPerPage={3}
                    slidesPerScroll={1}
                    infinite
                    minDraggableOffset={20}
                    auto={7000}
                    >
                    {content.map((city,index)=>{
                    return (
                        <City height={height} color='#000000' link={city.link} name={city.name} image={city.image} description={city.description}  key={index} />
                    )
                    })
                    }
                </Carousel>
            ):''}
        </>
    )
}
export default Explore;