import React from "react";
import LocationResultImage from "../../images/location_result.png";
import styled from "styled-components";

const LocationCard = () => {
	const result = (Icon, place, location)=>(
		<div className="flex items-center pl-6 mt-4 px-5">
			<img src={Icon} alt="" />
			<div className="ml-2">
				<h1 className="font-poppins font-medium	text-sm text-black">{place}</h1>
				<small className="font-poppins font-light text-xs text-black">{location}</small>
			</div>
		</div>
	)
	return (
		<Card className="hidden xl:block bg-white rounded-[10px] absolute top-20 pt-4 pb-8">
			<DropDownIcon className="absolute -top-5 left-16"></DropDownIcon>
			{result(LocationResultImage,"Lagos Concervation Centre, Ikeja", "Lagos, Nigeria")}
			{result(LocationResultImage,"Lagos Concervation Centre, Ikeja", "Lagos, Nigeria")}
			{result(LocationResultImage,"Lagos Concervation Centre, Ikeja", "Lagos, Nigeria")}
			{/* <div className="location__result">
				<div className="image">
					<img src={LocationResultImage} alt="" />
				</div>
				<div className="details">
					<h1>Lagos Concervation Centre, Ikeja</h1>
					<small>Lagos, Nigeria</small>
				</div>
			</div>

			<div className="location__result">
				<div className="image">
					<img src={LocationResultImage} alt="" />
				</div>
				<div className="details">
					<h1>Lagos Concervation Centre, Ikeja</h1>
					<small>Lagos, Nigeria</small>
				</div>
			</div>

			<div className="location__result">
				<div className="image">
					<img src={LocationResultImage} alt="" />
				</div>
				<div className="details">
					<h1>Lagos Concervation Centre, Ikeja</h1>
					<small>Lagos, Nigeria</small>
				</div>
			</div> */}
		</Card>
	);
};

export default LocationCard;

const Card = styled.div`
z-index: 999999;
`;

const DropDownIcon = styled.div`
	height: 0;
	width: 0;
	border-left: 20px solid transparent;
	border-right: 20px solid transparent;
	border-bottom: 20px solid #fff;
`;
