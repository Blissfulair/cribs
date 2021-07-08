import React from "react";
import SectionHeading from "./SectionHeading";
import TrendingCribsList from "./TrendingCribsList";

const TrendingCribs = () => {
	return (
		<div className="#FAFAFA pt-14">
			<SectionHeading title="Trending cribs" />
			<TrendingCribsList />
		</div>
	);
};

export default TrendingCribs;
