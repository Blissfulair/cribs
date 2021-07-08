import React from "react";
import CribImage from "../images/trendingcrib1.png";
import CribImageTwo from "../images/trendingcrib2.png";
import CribImageThree from "../images/trendingcrib3.png";
import CribImageFour from "../images/trendingcrib4.png";
import CribImageFive from "../images/trendingcrib5.png";
import TrendingCribsCard from "./TrendingCribsCard";

const TrendingCribsList = () => {
	const cribsList = [
		{
			cribImage: CribImage,
			city: "Ikeja, Lagos",
			place: "Mary’s Garden",
			address: "Sleeps 10 - 4 BR - 3 BA",
		},
		{
			cribImage: CribImageTwo,
			city: "Ikeja, Lagos",
			place: "Mary’s Garden",
			address: "Sleeps 10 - 4 BR - 3 BA",
		},
		{
			cribImage: CribImageThree,
			city: "Ikeja, Lagos",
			place: "Mary’s Garden",
			address: "Sleeps 10 - 4 BR - 3 BA",
		},
		{
			cribImage: CribImageFour,
			city: "Ikeja, Lagos",
			place: "Mary’s Garden",
			address: "Sleeps 10 - 4 BR - 3 BA",
		},
		{
			cribImage: CribImageFive,
			city: "Ikeja, Lagos",
			place: "Mary’s Garden",
			address: "Sleeps 10 - 4 BR - 3 BA",
		},
	];
	return (
		<div className="md:grid grid-cols-5 gap-x-4">
			{cribsList.map((crib, index) => (
				<TrendingCribsCard
					Image={crib.cribImage}
					city={crib.city}
					place={crib.place}
					address={crib.address}
					key={index}
				/>
			))}
		</div>
	);
};

export default TrendingCribsList;

