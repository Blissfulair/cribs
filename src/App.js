import React from 'react';
import {MuiThemeProvider, createMuiTheme,responsiveFontSizes} from "@material-ui/core/styles"
import {CssBaseline,Paper} from "@material-ui/core"
import Navigation from './components/navigation';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';



function App() {
  let theme = createMuiTheme({
    palette:{
      primary:{
        main:'#fff',
        dark:'#b2b2b2',
        light:'#ffffff'
      },
      secondary:{
        main:'#00A8C8',
        dark:'#00758c',
        light:'#33b9d3'
      },
      text:{
        primary:"#707070",
        secondary:'#000000',
        hint:'#fff'
      }
    },
  })
      theme = responsiveFontSizes(theme)
  return (
            <MuiThemeProvider theme={theme}>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <Paper square>
                <CssBaseline/>
                <Navigation/>
              
              </Paper>
            </MuiPickersUtilsProvider>
          </MuiThemeProvider>
  );
}

export default App;
