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

// const Card = styled.div`
// z-index: 999999;
// `;

// const DropDownIcon = styled.div`
// 	height: 0;
// 	width: 0;
// 	border-left: 20px solid transparent;
// 	border-right: 20px solid transparent;
// 	border-bottom: 20px solid #fff;
// `;
