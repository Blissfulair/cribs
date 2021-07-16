import React from "react";
import {
	MuiThemeProvider,
	createMuiTheme,
	responsiveFontSizes,
} from "@material-ui/core/styles";
import { CssBaseline } from "@material-ui/core";
import Navigation from "./components/navigation";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import "./scss/index.scss"

function App() {
	let theme = createMuiTheme({
		palette: {
			primary: {
				main: "#fff",
				dark: "#b2b2b2",
				light: "#ffffff",
			},
			secondary: {
				main: "#00A8C8",
				dark: "#00758c",
				light: "#33b9d3",
			},
			text: {
				primary: "#707070",
				secondary: "#000000",
				hint: "#fff",
			},
		},
	});
	theme = responsiveFontSizes(theme);
	return (
		// <LandingPage/>
		<MuiThemeProvider theme={theme}>
			<MuiPickersUtilsProvider utils={DateFnsUtils}>
				<div className="main-site-content">
					<CssBaseline />
					<Navigation />
				</div>
			</MuiPickersUtilsProvider>
		</MuiThemeProvider>
	);
}

export default App;
