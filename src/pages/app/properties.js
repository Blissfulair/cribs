import React from "react";
import "./inbox.css"
import {Link} from "react-router-dom"
import Layout from "./layout"
import {
    Table,
    TableHead,
    TableBody,
    TableCell,
    TablePagination,
    TableContainer,
    Paper,
    TableRow,
    withStyles,
    Grid,
    Fab,
    Switch,
    Snackbar, Slide,
    IconButton,
    Typography
} from "@material-ui/core"
import {Alert} from "@material-ui/lab"
import AddIcon from "@material-ui/icons/Add"
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import AppContext from "../../state/context"
import { currency } from "../../helpers/helpers";
import Modal from "../../components/modal";


const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }
export const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);
  
  export const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);
  


export const styles = (theme)=>({
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
            page:0,
            rowsPerPage:10,
            loading:true,
            success:false,
            message:'',
            transition:undefined,
            open:false,
        }
    }
    componentDidMount(){
        this.context.getMyProperties()
        .then(()=>{
            this.setState({loading:false})
        })

    }
    handleClick = (Transition) => () => {
        this.setState({transition:Transition, open:true})
        };
    handleCloseSnackBar = (event,reason) => {
        if (reason === 'clickaway') {
            return;
          }
        this.setState({open:false})
        }
    changeHandler =e=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onDelete=(id)=>{
        this.setState({loading:true,success:false})
        this.context.deleteProperty(id)
        .then(()=>{
            this.setState({loading:false, message:'Deleted Successfully',success:true})
        })
    }
    handleChangePage = (event, newPage) => {
		this.setState({page:newPage});
	  };
	handleChangeRowsPerPage = (event) => {
		this.setState({rowsPerPage:Number(event.target.value),page:0});
	  };

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
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, properties.length - this.state.page * this.state.rowsPerPage);
      
        return (
                <Layout>
                                            {
                                this.state.message&&
                                <Snackbar
                                open={this.state.open}
                                onClose={this.handleCloseSnackBar}
                                TransitionComponent={this.state.transition}
                                anchorOrigin={{vertical:'top',horizontal:'right'}}
                                autoHideDuration={5000}
                                key={this.state.transition ? this.state.transition.name : ''}
                                >
                                    <Alert variant="filled" severity={this.state.success?"success":"error"}>{this.state.message}</Alert>
                                </Snackbar>
                            }
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
                            <TableContainer className="property-table" style={{position:'relative'}} component={Paper} >
                                <Modal loading={this.state.loading} />
                            <Table  aria-label="property table">
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
                                properties.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((property, i) =>{
                                        const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
                                        const avail = property.bookedDates.filter(item=>new Date(item.seconds*1000).toDateString() === date.toDateString())
                                        const update = new Date(property.updatedAt.seconds*1000);
                                        const created = new Date(property.createdAt.seconds*1000);
                                        const updatedAt = update.getDate()+'/'+(update.getMonth()+1)+'/'+update.getFullYear() 
                                        const createdAt = created.getDate()+'/'+(created.getMonth()+1)+'/'+created.getFullYear() 
                                    return(
                                        <StyledTableRow classes={{root:classes.trRoot}} key={i}>
                                        <StyledTableCell classes={{root:classes.tdRoot}} component="th" scope="row">
                                            {property.name}
                                        </StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdRoot}} align="left">{this.str_length(property.description, 30)}</StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdRoot}} align="left">{currency(property.amount)}</StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdRoot}} align="left">{createdAt}</StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdRoot}} align="left">{updatedAt}</StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdRoot}} align="center">
                                            <Switch name={property.id} checked={!avail.length}/>
                                        </StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdRoot}} align="center">
                                            <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
                                                <Link to={`/app/edit-property/${property.id}`}>
                                                    <IconButton>
                                                        <EditIcon/>
                                                    </IconButton>
                                                </Link>
                                               <IconButton onClick={()=>{this.onDelete(property.id);this.handleClick(TransitionUp)}}>
                                                    <DeleteIcon/>
                                               </IconButton>
                                            </div>
                                        </StyledTableCell>
                                        </StyledTableRow>
                                    )
                                })
                                :
                                <Typography style={{margin:'10px 20px', color:'#979797'}} variant="subtitle2" component="p">No Properties uploaded yet</Typography>
                            }
                            	{emptyRows > 0 && (
										<StyledTableRow classes={{root:classes.trRoot}} style={{ height: 53 * emptyRows }}>
										<StyledTableCell classes={{root:classes.tdRoot}}  colSpan={6} />
										</StyledTableRow>
									)}
                                </TableBody>
                            </Table>
                            <TablePagination
								rowsPerPageOptions={[8, 16, 24]}
								component="div"
								count={properties.length}
								rowsPerPage={this.state.rowsPerPage}
								page={this.state.page}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={this.handleChangeRowsPerPage}
								/>
                            </TableContainer>
                        </Grid>

                    </Grid> 
                </Layout>
        )
    }
}
export default withStyles(styles)(Properties);