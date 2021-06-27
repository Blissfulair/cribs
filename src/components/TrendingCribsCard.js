import React from "react";
import styled from "styled-components";
import CribsDetails from "./CribsDetails";

const TrendingCribsCard = ({Image, city, place, address}) => {
	return (
		<Card className="py-5 px-2 mt-12">
			<div>
				<img className="w-full" src={Image} alt="" />
			</div>

			<div className="mt-9 pl-4">
				<CribsDetails text={city} />
				<CribsDetails text={place} />
				<CribsDetails text={address} />
			</div>
		</Card>
	);
};

export default TrendingCribsCard;

const Card = styled.div`
	box-shadow: 0px 4px 40px rgba(196, 196, 196, 0.1);
	border-radius: 20px;
	border: 1px solid #0066ff;
`;
