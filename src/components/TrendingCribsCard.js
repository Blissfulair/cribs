import React from "react";
import styled from "styled-components";
import CribsDetails from "./CribsDetails";
import FavoriteIcon from "../images/favorite.png";
import StarIcon from "../images/star.png";

const TrendingCribsCard = ({ Image, city, place, address }) => {
	const starList = new Array(5).fill(StarIcon);
	return (
		<Card className="py-5 px-2 mt-12">
			<div className="relative">
				<img className="w-full" src={Image} alt="" />
				<img
					className="absolute top-[14px] left-[17px]"
					src={FavoriteIcon}
					alt=""
				/>
				<div className="absolute flex bottom-[20px] left-[17px]">
					{starList.map((Icon, index) => (
						<img src={Icon} key={index} alt="" />
					))}
				</div>
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
