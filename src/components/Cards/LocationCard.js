import React from 'react';
import '../../scss/LocationCard.scss';
import LocationResultImage from '../../images/location_result.png'

const LocationCard = () => {
    return (
        <div className="location__card">
            <div className="location__result">
                <div className="image">
                    <img src={LocationResultImage} alt=""/>
                </div>
                <div className="details">
                    <h1>Lagos Concervation Centre, Ikeja</h1>
                    <small>Lagos, Nigeria</small>
                </div>
            </div>

            <div className="location__result">
                <div className="image">
                    <img src={LocationResultImage} alt=""/>
                </div>
                <div className="details">
                    <h1>Lagos Concervation Centre, Ikeja</h1>
                    <small>Lagos, Nigeria</small>
                </div>
            </div>

            <div className="location__result">
                <div className="image">
                    <img src={LocationResultImage} alt=""/>
                </div>
                <div className="details">
                    <h1>Lagos Concervation Centre, Ikeja</h1>
                    <small>Lagos, Nigeria</small>
                </div>
            </div>
        </div>
    );
}

export default LocationCard;
