import React from "react";
import "./inbox.css"
import {Link} from "react-router-dom"
import Layout from "./layout"
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TableContainer,
    Paper,
    TableRow,
    withStyles,
    Grid,
    Fab,
    Switch,
    IconButton,
    Typography
} from "@material-ui/core"
import AddIcon from "@material-ui/icons/Add"
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import AppContext from "../../state/context"

const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  


const styles = (theme)=>({
    container:{
        paddingTop:120
    },
    btn:{
        width:36,
        height:36, 
        marginLeft:theme.spacing(2)
    },
    btnRoot:{
        backgroundColor:'#00A8C8',
        color:'#fff'
    },
    trRoot:{
        backgroundColor:'#fff !important'
    },
    tdRoot:{
        borderBottom:'none !important'
    },
    tdHead:{
        borderBottomColor:'#DCDCDC !important',
        fontWeight:'bold !important'
    }
})

class Properties extends React.Component{
    static contextType = AppContext
    constructor(prop){
        super(prop)
        this.state ={
            property:[],
            properties :[],
        }
    }
    componentDidMount(){
        this.context.getMyProperties();

    }

    changeHandler =e=>{
        this.setState({[e.target.name]:e.target.value})
    }

    mark = n=>{
        //let properties = this.state.property.push(n.target.dataset[n.target.name]);
        //console.log(properties)
        // this.setState({[n.target.name]: this.state.property.push(n.target.dataset[n.target.name])})
    }
    str_length = (str, length, ending)=> {
        if (length == null) {
          length = 100;
        }
        if (ending == null) {
          ending = '...';
        }
        if (str.length > length) {
          return str.substring(0, length - ending.length) + ending;
        } else {
          return str;
        }
      };
    render(){
        const properties = this.context.state.myProperties
        const {classes} = this.props

        return (
                <Layout>
                    <Grid container justify="center" classes={{root:classes.container}}>
                        <Grid item xs={11}>
                            <div className="inbox-title">
                                <h4>Property Listing</h4>
                            </div>
                            <div >
                                <div>
                                    <div  style={{margin:'30px 0'}}>
                                        <Link style={{textDecoration:'underline',color:'#74D8EB'}} id="add" to="/app/add-property">Add Property to Cribs
                                            <Fab classes={{sizeSmall:classes.btn,root:classes.btnRoot}} size="small"  aria-label="add">
                                                <AddIcon fontSize="small" />
                                            </Fab>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <TableContainer component={Paper} >
                            <Table  aria-label="customized table">
                                <TableHead>
                                <TableRow>
                                    <StyledTableCell classes={{root:classes.tdHead}}>Property Title</StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdHead}} align="left">Property Description</StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdHead}} align="left">Amount</StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdHead}} align="left">Date Added</StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdHead}} align="left">Updated</StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdHead}} align="center">Availability</StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdHead}} align="center"> </StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                properties.length>0?
                                properties.map((property, i) => (
                                    <StyledTableRow classes={{root:classes.trRoot}} key={i}>
                                    <StyledTableCell classes={{root:classes.tdRoot}} component="th" scope="row">
                                        {property.name}
                                    </StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdRoot}} align="left">{this.str_length(property.description, 30)}</StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdRoot}} align="left">{property.amount}</StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdRoot}} align="left">{property.createdAt}</StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdRoot}} align="left">{property.updatedAt}</StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdRoot}} align="center">
                                        <Switch name={property.uid} checked={property.availability}/>
                                    </StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdRoot}} align="center">
                                        <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
                                            <IconButton>
                                                <EditIcon/>
                                            </IconButton>
                                           <IconButton>
                                                <DeleteIcon/>
                                           </IconButton>
                                        </div>
                                    </StyledTableCell>
                                    </StyledTableRow>
                                ))
                                :
                                <Typography style={{margin:'10px 20px', color:'#979797'}} variant="subtitle2" component="p">No Properties uploaded yet</Typography>
                            }
                                </TableBody>
                            </Table>
                            </TableContainer>
                        </Grid>

                    </Grid> 
                </Layout>
        )
    }
}
export default withStyles(styles)(Properties);