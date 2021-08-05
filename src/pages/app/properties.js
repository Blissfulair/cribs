import React from "react";
import "./inbox.css"
import {Link} from "react-router-dom"
import Layout from "./layout"
import {
    withStyles,
    Grid,
    Fab,
    Snackbar, Slide,
    IconButton,
    Typography,
    Button
} from "@material-ui/core"
import {Alert} from "@material-ui/lab"
import AddIcon from "@material-ui/icons/Add"
import EditIcon from '@material-ui/icons/EditOutlined';
import DeleteIcon from '@material-ui/icons/Delete';
import AppHeader from "../../components/appHeader"
import { currency } from "../../helpers/helpers";
import Modal from "../../components/modal";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { connect } from "react-redux";
import { deleteProperty, getProperties } from "../../apis/server";
import { setProperties } from "../../state/actions";
import  Table, { 
    TableHead,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
} from "../../components/table/"

const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }

  


export const styles = (theme)=>({

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
    tdCell:{
        minWidth:120
    }
})

class Properties extends React.Component{
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
            dialogOpen:false,
            deleted:'',
            index:''
        }
    }
    componentDidMount(){
        getProperties(this.props.user.id)
        .then(properties=>{
            this.props.setProperties(properties)
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
    handleClickOpen = (Transition, id,i) => {
        this.setState({dialogOpen:true, deleted:id,transition:Transition,index:i});
        };
    
    handleClose = () => {
        this.setState({dialogOpen:false});
    };
    changeHandler =e=>{
        this.setState({[e.target.name]:e.target.value})
    }
    onDelete=()=>{
        this.setState({loading:true,success:false})
        deleteProperty(this.state.deleted)
        .then(()=>{
            console.log('dome')
            this.props.properties.splice(this.state.index, 1)
            this.props.setProperties(this.props.properties)
            this.setState({loading:false, message:'Deleted Successfully',success:true, properties:this.props.properties})
        })
    }
    handleChangePage = (event, newPage) => {
		this.setState({page:newPage});
	  };
	handleChangeRowsPerPage = (event) => {
		this.setState({rowsPerPage:Number(event.target.value),page:0});
	  };
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
        // const properties = this.context.state.myProperties
        const {properties} = this.props
        const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, properties.length - this.state.page * this.state.rowsPerPage);
        return (
            <>
                
                <Layout>
                <AppHeader/>
                    <Dialog
                        open={this.state.dialogOpen}
                        TransitionComponent={TransitionUp}
                        keepMounted
                        onClose={this.handleClose}
                        aria-labelledby="alert-dialog-slide-title"
                        aria-describedby="alert-dialog-slide-description"
                    >
                        <DialogTitle id="alert-dialog-delete">{"Confirm!!"}</DialogTitle>
                        <DialogContent>
                        <DialogContentText id="alert-dialog-delete-description">
                        Are sure you want to delete this property?
                        </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                        <Button onClick={this.handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={()=>{this.handleClose();this.onDelete()}} color="primary">
                            Continue
                        </Button>
                        </DialogActions>
                    </Dialog>
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
                    <div className="property-main">
                        <Grid>
                            <div >
                                <div>
                                    <div  style={{margin:'30px 0'}}>
                                        <Link  id="add" to="/app/add-property">
                                            <Fab  size="small"  aria-label="add">
                                                <AddIcon fontSize="small" />
                                            </Fab>
                                            Add New Crib
                                        </Link>
                                    </div>
                                </div>
                            </div>
                            <div className="property-well">
                                <p>Crib List</p>
                            </div>
                                <Modal loading={this.state.loading} />
                            <Table  className="property-table">
                                <TableHead>
                                <TableRow>
                                    <TableCell style={{minWidth:120}}>Name</TableCell>
                                    <TableCell style={{minWidth:120}}>Description</TableCell>
                                    <TableCell style={{minWidth:120}}>Amount</TableCell>
                                    <TableCell style={{minWidth:120}}>Date Added</TableCell>
                                    <TableCell style={{minWidth:120}}>Updated</TableCell>
                                    <TableCell style={{minWidth:120}}>Verified</TableCell>
                                    <TableCell> </TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                properties.length>0?
                                properties.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((property, i) =>{
                                        //const date = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
                                        // const avail = property.bookedDates.filter(item=>new Date(item.date).toDateString() === date.toDateString())
                                        // const update = new Date(property.updatedAt.seconds*1000);
                                        // const created = new Date(property.createdAt.seconds*1000);
                                        const updatedAt = new Date(property.updatedAt).toDateString() //update.getDate()+'/'+(update.getMonth()+1)+'/'+update.getFullYear() 
                                        const createdAt = new Date(property.createdAt).toDateString() //created.getDate()+'/'+(created.getMonth()+1)+'/'+created.getFullYear() 
                                    return(
                                        <TableRow key={i}>
                                        <TableCell style={{minWidth:120}}>
                                            {property.name}
                                        </TableCell>
                                        <TableCell style={{minWidth:120}}>{this.str_length(property.description, 30)}</TableCell>
                                        <TableCell style={{minWidth:120}}>{currency(property.amount)}</TableCell>
                                        <TableCell style={{minWidth:120}}>{createdAt}</TableCell>
                                        <TableCell style={{minWidth:120}}>{updatedAt}</TableCell>
                                        <TableCell style={{minWidth:120}}>
                                            {
                                                property.status === 0?
                                                <span>Pending</span>
                                                :
                                                property.status === 1?
                                                <span>Success</span>
                                                :
                                                <span>Failed</span>
                                            }
                                        </TableCell>
                                        <TableCell>
                                            <div style={{display:'flex',justifyContent:'space-between', alignItems:'center'}}>
                                                <Link to={`/app/edit-property/${property._id}`}>
                                                    <IconButton>
                                                        <EditIcon/>
                                                    </IconButton>
                                                </Link>
                                               <IconButton onClick={()=>{this.handleClickOpen(TransitionUp,property._id, i)}}>
                                                    <DeleteIcon/>
                                               </IconButton>
                                            </div>
                                        </TableCell>
                                        </TableRow>
                                    )
                                })
                                :
                                <Typography style={{margin:'10px 20px', color:'#979797'}} variant="subtitle2" component="p">No Properties uploaded yet</Typography>
                            }
                            	{emptyRows > 0 && (
										<TableRow style={{ height: 53 * emptyRows }}>
										<TableCell  colSpan={6} />
										</TableRow>
									)}
                                </TableBody>
                            </Table>
                            <TablePagination
								rowsPerPageOptions={[8, 16, 24]}
								count={properties.length}
								rowsPerPage={this.state.rowsPerPage}
								page={this.state.page}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={this.handleChangeRowsPerPage}
								/>
                        </Grid>

                    </div> 
                </Layout>
            </>
        )
    }
}
const mapStateToProps=state=>({
    properties:state.properties,
    user:state.user
})
const mapDispatchToProps=dispatch=>({
    setProperties:(payload) => dispatch(setProperties(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(withStyles(styles)(Properties));