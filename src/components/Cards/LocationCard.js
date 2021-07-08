import React from 'react';
import '../../scss/LocationCard.scss';
import {Link} from "react-router-dom"

const LocationCard = ({results}) => {
    if(results.length>0)
    return (
        <div className="location__card">

            {
                results.map((result,i)=>(
                    <Link key={i} to={`/crib/${result._id}`} className="location__result">
                        <div className="image">
                            <img src={process.env.REACT_APP_BACKEND_URL+'/'+result.featuredImage} alt={result.name}/>
                        </div>
                        <div className="details">
                            <h1>{result.name}</h1>
                            <small>{result.city}, Nigeria</small>
                        </div>
                    </Link>
                ))
            }
        </div>
    );
    return ''
}

export default LocationCard;
