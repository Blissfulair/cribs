import React from "react";
import styled from "styled-components";
import GoogleIcon from "../../images/playstorewhite.png"
import AppleIcon from "../../images/app-store.png";

const Footer = () => {
	return (
		<div className="bg-[#F6F6F6] pt-6 pb-16 mt-20 sm:mt-60">
			<div className="sm:grid sm:grid-cols-2 w-11/12 mx-auto sm:divide-x-2 sm:divide-[#B4BCBE]">
				<div className="md:pr-5 lg:pr-20">
					<div>
						<h1 className="font-montserrat text-2xl text-[#2E2E2E] leading-[29px] font-bold pb-4">
							Beach Destinations
						</h1>
						<p className="font-montserrat text-[#2E2E2E] text-sm leading-[17px] font-medium">
							Orange Beach | Playa del Carmen Port | Aransas Mau I Bethany beach
							| rentals Folly beach | rentals Gulf Shores beach | rentals Holden
							beach rentals | Panama City Beach | Ocean Isle beach rentals |
							Rehoboth beach rentals | Rosemary beach.
						</p>
					</div>
					<div>
						<h1 className="font-montserrat text-2xl text-[#2E2E2E] leading-[29px] font-bold mt-9 mb-4">
							Resorts
						</h1>
						<p className="font-montserrat text-[#2E2E2E] text-sm leading-[17px] font-medium">
							Big Bear ski resorts | Colorado ski resorts | Massanutten resorts
							| Panama City Beach resorts | Paradise resorts | Purgatory resorts
							| Maui resorts Virginia resorts Welk resorts Westgate lakes
							resorts and spaWintergreen resorts | Disney resortsWisconsin{" "}
						</p>
					</div>
					<div className="sm:flex sm:items-center sm:mt-16">
						<h1 className="text-[#0066FF] text-2xl leading-9 font-bold font-poppins mt-4 sm:mt-0 md:mr-10 lg:mr-30 xl:mr-44">
							CRIB NG
						</h1>
						<div className="flex">
							<div className="mr-6 lg:mr-12">
								<h2 className="font-poppins font-bold text-lg text-[#0066FF] mb-2">
									Links
								</h2>
								<ul className="text-[#2E2E2E] text-xs leading-[18px] font-poppins">
									<li>List Property</li>
									<li className="my-4">Privacy Policy</li>
									<li>Community</li>
								</ul>
							</div>
							<div>
								<h2 className="font-poppins font-bold text-lg text-[#0066FF] mb-2">
									Company
								</h2>
								<ul className="text-[#2E2E2E] text-xs leading-[18px] font-poppins">
									<li>About</li>
									<li className="my-4">Career</li>
									<li>Media Center</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<div className="sm:pt-[59px] sm:pl-10 md:pr-0 lg:pr-[60px] xl:pr-[144px]">
					<h1 className="font-montserrat text-2xl leading-[29px] text-[#2E2E2E] text-center font-bold mb-8 mt-4">
						To get updates on discounts. Sign up to our Newsletter.
					</h1>
					<Form
						className="bg-[#fcfcfc] rounded-[30px] mb-24 h-16 items-center pl-7 pr-2"
						// className="bg-[#FCFCFC] rounded-[30px]  pl-[30px] "
					>
						<input
							type="email"
							className="bg-[#fcfcfc] h-12 pr-2 outline-none font-medium font-poppins text-sm lg:text-lg"
							placeholder="Email address"
						/>
						<button
							className="bg-[#005c9f] text-[#fcfcfc] font-poppins h-12 rounded-[63.5px] hover:opacity-80"
							type="submit"
						>
							Send
						</button>
					</Form>
					<h1 className="text-[#2E2E2E] text-2xl font-montserrat text-center leading-[29px] font-bold">
						Download for Mobile
						<div className="flex justify-center mt-6">
							<a
								href="https://wwww.play.google.com/store/apps/details?id=com.givismartatt"
								className="bg-black flex items-center rounded-[32px] h-12 mr-4 "
							>
								<img src={AppleIcon} className="h-6 mr-1" alt="" />
								<Download className="flex flex-col items-start font-poppins text-white">
									<p>Download from</p>
									<p className="font-semibold">App Store</p>
								</Download>
							</a>
							<a
								href="https://wwww.play.google.com/store/apps/details?id=com.givismartatt"
								className="bg-black flex items-center rounded-[32px] h-12"
							>
								<img src={GoogleIcon} className="h-6 mr-1" alt="" />
								<Download className="flex flex-col items-start  font-poppins text-white">
									<p>Download from</p>
									<p className="font-semibold">Play Store</p>
								</Download>
							</a>
						</div>
					</h1>
				</div>
			</div>
		</div>
	);
};

export default Footer;

const Form = styled.form`
	display: grid;
	grid-template-columns: 2fr 1fr;
`;

const Download = styled.div`
font-size:9px;
line-height: 16px;
@media (min-width: 400px) {
	font-size: 12px;
	line-height: 16px;
}
`;