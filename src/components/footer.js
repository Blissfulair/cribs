import React from "react";
import styled from "styled-components";
import GoogleIcon from "../images/playstorewhite.png";
import AppleIcon from "../images/app-store.png";

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

// import React from "react";
// import {Paper, withStyles,Grid,Typography} from "@material-ui/core";
// import {Facebook, Instagram, Twitter} from "@material-ui/icons";
// import {Link} from "react-router-dom";
// import Subscribe from "./subscribe";
// import AppLogo from "./appLogo";
// import play from "../images/playstore.svg";
// import apple from "../images/apple.svg";
// import SocialIcon from "./socialicon";
// import './../scss/footer.scss';

// const styles = (theme)=>({
//     container:{
//         minHeight:380,
//         backgroundColor:'#E9E9E9',
//         marginTop:130
//     },
//     inner:{
//         padding:'25px 0 35px 0'
//     },
//     line:{
//         borderLeft:'2px solid #CCCCCC',
//         height:'100%'
//     },
//     list:{
//         listStyle:'none',
//     },
//     listItem:{
//         margin:`${theme.spacing(2)}px 0`
//     },
//     link:{
//         color:'#707070',
//         textDecoration:'none',
//     },
//     title:{
//         fontSize:'28px'
//     },
//     subtitle:{
//         fontSize:18,
//         margin:'15px 0'
//     },
//     paragraph:{
//         fontSize:14,
//         color:'#000000'
//     },
//     social:{
//         display:'flex',
//         listStyle:'none',
//         justifyContent:'space-between',
//         margin:'20px 0 30px 0'
//     }
// })
// const Footer = ({classes})=>{
//     return(
//         <Paper className="footer" classes={{root:classes.container}} square>
//             <Grid container classes={{root:classes.inner}}>
//                 <Grid item xs={false} md={1}/>
//                 <Grid item xs={12} md={10}>
//                     <Typography classes={{root:classes.subtitle}} color="secondary" variant="h4">Beach destinations</Typography>
//                     <Grid container spacing={2}>
//                         <Grid item xs={12} md={7}>
//                             <Typography classes={{root:classes.paragraph}}   variant="body1" component="p">
//                                 Orange Beach | Playa del Carmen Port | Aransas Mau I Bethany beach | rentals Folly beach | rentals Gulf Shores beach | rentals Holden beach rentals | Panama City Beach | Ocean Isle beach rentals | Rehoboth beach rentals | Rosemary beach.
//                             </Typography>
//                             <Typography classes={{root:classes.subtitle}} variant="h4" color="secondary">
//                                 Resorts
//                             </Typography>
//                             <Typography classes={{root:classes.paragraph}} variant="body1" component="p">
//                                 Big Bear ski resorts | Colorado ski resorts | Massanutten resorts | Panama City Beach resorts | Paradise resorts | Purgatory resorts | Maui resorts Virginia resorts Welk resorts Westgate lakes resorts and spaWintergreen resorts | Disney resortsWisconsin
//                             </Typography>
//                             <Grid container>
//                                 <Grid item md={10}>
//                                     <Grid container style={{marginTop:40}} alignItems="center">
//                                         <Grid item md={4} xs={12}>
//                                             <Typography classes={{root:classes.title}} noWrap variant="h2">CRIB NG</Typography>
//                                         </Grid>
//                                         <Grid item md={4}  xs={12}  >
//                                             <Typography classes={{root:classes.title}} variant="h2">Links</Typography>
//                                             <ul className={classes.list}>
//                                                 <li className={classes.listItem} ><Link className={classes.link} to="/">List Property</Link></li>
//                                                 <li className={classes.listItem} ><Link className={classes.link} to="/">Privacy Policy</Link></li>
//                                                 <li className={classes.listItem} ><Link className={classes.link} to="/">Community</Link></li>
//                                             </ul>
//                                         </Grid>
//                                         <Grid item md={4}  xs={12}>
//                                             <Typography classes={{root:classes.title}} variant="h2">Company</Typography>
//                                             <ul className={classes.list}>
//                                                 <li className={classes.listItem} ><Link className={classes.link} to="/">About</Link></li>
//                                                 <li className={classes.listItem} ><Link className={classes.link} to="/">Carreer</Link></li>
//                                                 <li className={classes.listItem} ><Link className={classes.link} to="/">Media center</Link></li>
//                                             </ul>
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                             </Grid>
//                         </Grid>
//                         <Grid item xs={12} md={5} style={{display:'flex', alignItems:'flex-end',width:'100%'}} classes={{root:classes.line}}>
//                             <div style={{paddingLeft:10, width:'100%'}}>
//                                 <Typography style={{marginBottom:10}} variant="body1" component="p">
//                                     To get updates on discounts. Sign up to our Newsletter.
//                                 </Typography>
//                                 <Subscribe/>
//                                 <Grid container>
//                                     <Grid item xs={6} md={4}>
//                                     <ul className={classes.social}>
//                                         <SocialIcon backgroundColor="#375FA5" href="https://wwww.facebook.com"><Facebook  htmlColor="#fff"/></SocialIcon>
//                                         <SocialIcon backgroundColor="#6FAEEB" href="https://wwww.facebook.com"><Twitter  htmlColor="#fff"/></SocialIcon>
//                                         <SocialIcon backgroundColor="#FFFFFF" href="https://wwww.facebook.com"><Instagram htmlColor="#375FA5"/></SocialIcon>
//                                     </ul>
//                                     </Grid>
//                                 </Grid>
//                                 <Typography style={{marginBottom:10}} variant="body1" component="p">Download Cribs Mobile App</Typography>
//                                 <Grid container>
//                                     <Grid item xs={12} sm={6} md={10} >
//                                         <Grid container spacing={1}>
//                                            <Grid item xs={6}>
//                                                 <AppLogo name="App" image={apple} href="https://wwww.play.google.com/store/apps/details?id=com.givismartatt" target="_blank" />
//                                             </Grid>
//                                             <Grid item xs={6}>
//                                                 <AppLogo name="Play" image={play} href="https://wwww.play.google.com/store/apps/details?id=com.givismartatt" target="_blank" />
//                                             </Grid>
//                                         </Grid>
//                                     </Grid>
//                                 </Grid>
//                             </div>
//                         </Grid>
//                     </Grid>
//                 </Grid>
//                 <Grid item xs={false} md={1}/>
//             </Grid>
//         </Paper>
//     )
// }
// export default withStyles(styles)(Footer);
