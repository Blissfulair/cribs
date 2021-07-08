import React from "react";
import styled from "styled-components";
import Footer from "../../components/footer";
import showcase from "../../images/showcase.png";

const LandingPage = () => {
	const Features = (title)=>(
		<h1>{title}</h1>
	)
	return (
		<div>
			<main>
				<h1>Features that will help you better!</h1>
				<div>
					{Features("Reliability")}
				</div>
			</main>
			<Footer />
		</div>
	);
};

export default LandingPage;

// const ShowCase = styled.section`
// 	/* background: url(${showcase}) no-repeat center center/cover; */
// 	/* position: relative; */
// 	/* height: 130vh; */
// `;
