import React from "react";
import {withStyles} from "@material-ui/core/styles"
import {Select, FormControl,Grid,MenuItem, Typography,Paper} from '@material-ui/core';
import Searchs from "../components/search"
import Explore from "../components/explore";
import  MapContainer  from "../components/map";
import {withRouter} from "react-router-dom"
const styles = theme =>({
    container:{
        paddingTop:200
    },
    formControl: {
        minWidth: 120,
        flexDirection:'row',
        alignItems:'flex-start',
      },
    input:{
        paddingTop:0,
        marginLeft:10
    },
    text:{
        color:'#070000'
    },
    title:{
        margin:'40px 0 20px 0',
        fontSize:'28px'
    },
    map:{
        position:'sticky',
        height:400,
        width:'100%',
        borderRadius:0
    }
})
const Search = ({classes,history})=>{
    const [age, setAge] = React.useState('');

    const handleChange = (event) => {
      setAge(event.target.value);
    };
    return(
            <Grid container justify="center">
                <Grid item xs={11} md={10}>
                    <div id="search-page" className={classes.container}>
                        <Grid container justify="flex-start" style={{position:'relative'}} spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Grid container justify="space-between">
                                    <Grid item>
                                        <p className={classes.text}>1 -30 of 200</p>
                                    </Grid>
                                    <Grid item>
                                        <FormControl classes={{root:classes.formControl}}>
                                            <p className={classes.text}>Sort:</p>
                                            <Select
                                            value={age}
                                            onChange={handleChange}
                                            displayEmpty
                                            classes={{root:classes.input}}
                                            >
                                            <MenuItem value={10}>Ascending</MenuItem>
                                            <MenuItem value={20}>Descending</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                                {
                                    [1,2,2,2,2,2].map((result,index)=>{
                                        return(
                                            <Searchs props={history} name={`rating${index}`} key={index}/>
                                        )
                                    })
                                }
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <Paper elevation={0} classes={{root:classes.map}}>
                                    <MapContainer/>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Typography variant="h4" classes={{root:classes.title}}>Explore Cribs by City</Typography>
                        <Grid style={{position:'relative'}} container>
                            <Explore content={[{name:'Lagos City', description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more'},{name:'Abuja City', description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more'},{name:'Kano City', description:'440+ VERIFIED STAYS Book sunny lofts, beachfront flats, and more'}]}/>
                        </Grid>
                    </div>
                </Grid>
            </Grid>
  
    )
}
export default withRouter(withStyles(styles)(Search));