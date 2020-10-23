import React from "react";
import Layout from "./layout"
import {
    Grid, 
    withStyles,
} from '@material-ui/core'
import AppContext from "../../state/context"
import HostDashboard from "./host/dashboard"
import RenterDashboard from "./renter/dashboard";
const styles = (theme)=>({
    user:{
        borderRadius:0,
        height: 330,
        justifyContent:'center',
        display:'flex',
        paddingTop:15
    },
    impression:{
        borderRadius:0,
        minHeight: 200,
        padding:'10px',
        paddingTop:15
    },
    avater:{
        width:theme.spacing(12),
        height:theme.spacing(12),
        margin:'0 auto'
    },
    userInner:{
        width:'90%',
        
    },
    list:{
        paddingLeft:0,
        paddingRight:0,
        textAlign:'center',
        whiteSpace:'nowrap',
        color:'#00A4C1'
    },
    title:{
        color:'#707070',
        fontSize:17,
        fontWeight:'bold',
        marginBottom:30

    },
    body:{
        fontSize:15,
        lineHeight:2,
        marginBottom:30
    },
    btn:{
        textTransform:'capitalize',
        backgroundColor:'#00A8C8',
        margin:'0 auto',
        paddingLeft:15,
        paddingRight:15,
        color:'#fff',
        width:'100%',
        borderRadius:30
    },
    active:{
        color:'#00A8C8'
    }
})

// const Transition = React.forwardRef(function Transition(props, ref) {
//     return <Slide direction="up" ref={ref} {...props} />;
//   });
class Dashboard extends React.Component{
        static contextType = AppContext
        constructor(){
            super()
            this.state={
                impression:0,
                active:0,
                verified:0,
                chart:'month'
            }

        }
        componentDidMount(){

        }
        switchChart=(type)=>{
            this.setState({chart:type})
        }


    render(){
        const {classes} = this.props
        return (
            <>
                <Layout>
                    <Grid container style={{paddingTop:120}}>
                        <Grid item xs={12} md={11} >
                            {
                                this.context.state.dashboard?
                                <RenterDashboard classes={classes} context ={this.context}/>
                                :
                                <HostDashboard classes={classes} state={this.state} context ={this.context} switchChart={this.switchChart}/>
                            }
                        </Grid>
                    </Grid>
                </Layout>
            </>
        )
    }
}
export default withStyles(styles)(Dashboard);