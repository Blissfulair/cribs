import React, {createRef} from "react";
import  "./../inbox.css"
import DeleteIcon from '@material-ui/icons/Delete';
import SearchIcon from '@material-ui/icons/Search';
import PanToolIcon from '@material-ui/icons/PanTool';
import PropTypes from "prop-types"
import { 
    IconButton, 
    withStyles,
    InputBase, 
    Grid,
    Table,
    TableHead,
    TableBody,
	TableContainer,
	Paper,
	TableRow,
    Typography,
    Avatar,
    Button,
    CircularProgress
 } from "@material-ui/core";
 import Rating from '@material-ui/lab/Rating';
import { fade } from '@material-ui/core/styles';
import AppHeader from "../../../components/appHeader";
import { StyledTableCell, StyledTableRow } from './../properties';
import { getMonthInWord } from "../../../helpers/helpers";
import Modal from "../../../components/modal";
import WithdrawPopUp from "../../../components/withdrawPopup";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SwipeableViews from 'react-swipeable-views';
import Box from '@material-ui/core/Box';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { connect } from "react-redux";
const styles = (theme)=>({
    inputRoot: {
        color: 'inherit',
      },
      search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
          backgroundColor: fade(theme.palette.common.white, 0.25),
        },
    },
      inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          width: '12ch',
          '&:focus': {
            width: '20ch',
          },
        },
      },
      trRoot:{
        backgroundColor:'#fff !important',
        cursor:'pointer'
    },
    tdRoot:{
        borderBottom:'none !important'
    },
    tdHead:{
        borderBottomColor:'#DCDCDC !important',
        fontWeight:'bold !important'
    }
})

const StyledRating = withStyles({
    iconFilled: {
      color: '#FCEC0A',
    },
    iconHover: {
      color: '#FCEC0A',
    },
  })(Rating);

const TabPanel=(props)=>{
    const { children, value, index, ...other } = props;
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`full-width-tabpanel-${index}`}
        aria-labelledby={`full-width-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };
  
  const a11yProps=(index)=> {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }
class History extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            histories:[],
            loading:true,
            selected:[],
            deleteStatus:false,
            open:false,
            history:null,
            value:0,
            rating:0,
            review:'',
            labels : {
                0.5: 'Useless',
                1: 'Useless+',
                1.5: 'Poor',
                2: 'Poor+',
                2.5: 'Ok',
                3: 'Ok+',
                3.5: 'Good',
                4: 'Good+',
                4.5: 'Excellent',
                5: 'Excellent+',
            },
            hover:-1,
            reviewLoading:false,
            massage:'',


        }
        this.search = createRef()
        
    }

    componentDidMount(){
        // this.context.getHistories(this.context.state.user.uid)
        // .then(()=>{
        //     this.setState({loading:false, histories:this.props.histories})
        // })
    }
	handleClickOpen = (history) => {
		this.setState({open:true, history:history});
      }
    handleClose = () => {
    this.setState({open:false});
    }
    onSearch = (text)=>{
        if(text !== ''){
        const histories = this.props.histories.filter(history=>{
            if(history.propertyName.toLowerCase().includes(text.toLowerCase()) || history.propertyState.toLowerCase().includes(text.toLowerCase()) || history.propertyCity.toLowerCase().includes(text.toLowerCase()) || history.amount.toString().includes(text.toLowerCase()))
            return history
            else
            return ''
        })
        
        this.setState({histories})
    }   
    else this.setState({histories:this.props.histories})
    }

    onSelect = (id, checked)=>{
        if(checked)
        this.setState({selected:[...this.state.selected, id]})
        else{
           const selected = this.state.selected.filter(select=> select !== id)
           this.setState({selected:selected})
        }
    }
    handleChange = (event, newValue) => {
        this.setState({value:newValue});
      };
    
    handleChangeIndex = (index) => {
        this.setState({value:index});
      };
    onDelete = ()=>{
        this.setState({deleteStatus:true})
        // this.context.deleteHistory(this.state.selected)
        // .then(()=>{
        //     const histories = this.state.histories.filter(history=>!this.state.selected.includes(history.transactionID))
        //     this.setState({histories,deleteStatus:false})
        // })
    }
    onDisplayUsers = e=>{
        e.preventDefault();
        document.querySelector('.delete-modal').style.display="flex"
    }
    closeModal = e=>{
        e.preventDefault();
        document.querySelector('.delete-modal').style.display="none"
    }

    onSendReview=()=>{
        if(this.state.review === '' || this.state.rating === 0)
       {
           this.setState({err:'Rating and review are required.'})
            return false
       }
       this.setState({err:'', reviewLoading:true})
        const {user} = this.props
        const data ={
            name:user.firstname+' '+user.lastname,
            checkIn:this.state.history.checkIn,
            checkOut:this.state.history.checkOut,
            photoURL:user.photoURL,
            propertyID:this.state.history.propertyID,
            amount:this.state.history.amount,
            review:this.state.review,
            rating:this.state.rating,
            email:user.email,
            historyId:this.state.history.transactionID
            // hostId:
        }
        // this.context.sendReview(data)
        // .then(()=>{
        //     this.handleClose()
        //     this.setState({review:'',reviewLoading:false})
        // })
    }
    render(){
        const {history} = this.state
        const {classes,histories} =this.props
        const inbox = (
            <>
            {histories.length>0?histories.map((history,i)=>{
                const createdAt = new Date(history.creactedAt.seconds*1000)
                return (
                    <StyledTableRow  classes={{root:classes.trRoot}} key={i}>
                    <StyledTableCell classes={{root:classes.tdRoot}} className="history"  component="th" scope="row">
                        <label  htmlFor={history.id} className="radio">
                            <input onChange={(e)=>this.onSelect(history.transactionID, e.target.checked)}  type="checkbox" value={history.id} name="" id={history.id}/>
                            <span className="radio-mark"></span>
                        </label>
                    </StyledTableCell>
                        <StyledTableCell onClick={()=>{this.handleClickOpen(history)}} classes={{root:classes.tdRoot}} style={{textTransform:'capitalize'}} align="left">{history.propertyName}</StyledTableCell>
                        <StyledTableCell onClick={()=>{this.handleClickOpen(history)}} classes={{root:classes.tdRoot}} style={{textTransform:'capitalize'}} align="left">{history.amount}</StyledTableCell>
                        <StyledTableCell onClick={()=>{this.handleClickOpen(history)}} classes={{root:classes.tdRoot}} style={{textTransform:'capitalize'}} align="left">{history.propertyState}</StyledTableCell>
                        <StyledTableCell onClick={()=>{this.handleClickOpen(history)}} classes={{root:classes.tdRoot}} style={{textTransform:'capitalize'}} align="left">{history.propertyCity}</StyledTableCell>
                        <StyledTableCell onClick={()=>{this.handleClickOpen(history)}} classes={{root:classes.tdRoot}} style={{textTransform:'capitalize'}} align="left">{history.status}</StyledTableCell>
                        <StyledTableCell onClick={()=>{this.handleClickOpen(history)}} classes={{root:classes.tdRoot}} style={{textTransform:'capitalize'}} align="left">{createdAt.getDate()+' ' + getMonthInWord(createdAt)+', '+ createdAt.getFullYear()+' '+createdAt.getHours()+':'+createdAt.getMinutes()+':'+createdAt.getSeconds()}</StyledTableCell>
                    </StyledTableRow>
            
                                   )   
            }):''
            }
            </>
        )

        return (
            <>
            <AppHeader/>
            <Grid container justify ="center">
                { this.state.history&&
                <WithdrawPopUp open={this.state.open} title="" handleClose={this.handleClose} className="history-modal">
                    <Tabs
                    value={this.state.value}
                    onChange={this.handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="full width tabs example"
                    >
                    <Tab label="History" {...a11yProps(0)} />
                    <Tab label="Review" {...a11yProps(1)} />
                    </Tabs>
                    <SwipeableViews
                        axis={this.props.theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                        index={this.state.value}
                        onChangeIndex={this.handleChangeIndex}
                    >
                        <TabPanel value={this.state.value} index={0} dir={this.props.theme.direction}>
                           <p></p>
                           <table>
                               <tr>
                                   <td>Check-in Date</td>
                                   <td>{new Date(history.checkIn.seconds*1000).toDateString()}</td>
                               </tr>
                               <tr>
                                   <td>Check-out Date</td>
                                   <td>{new Date(history.checkOut.seconds*1000).toDateString()}</td>
                               </tr>
                               <tr>
                                   <td>Amount</td>
                                   <td>{history.amount}</td>
                               </tr>
                               <tr>
                                   <td>Property Name</td>
                                   <td>{history.propertyName}</td>
                               </tr>
                               <tr>
                                   <td>Property City</td>
                                   <td>{history.propertyCity}</td>
                               </tr>
                               <tr>
                                   <td>Property State</td>
                                   <td>{history.propertyState}</td>
                               </tr>
                               <tr>
                                   <td>Transaction ID</td>
                                   <td>{history.transactionID}</td>
                               </tr>
                               {/* <tr>
                                   <td>Total</td>
                                   <td>N 5000</td>
                               </tr> */}
                           </table>
                        </TabPanel>
                        <TabPanel value={this.state.value} index={1} dir={this.props.theme.direction}>
                            <div style={{width:'70%', margin:'0 auto'}}>
                                <Avatar style={{width:100,height:100,margin:'20px auto'}} src={this.context.state.user.photoURL} alt=""/>
                                {
                                    !history.reviewed?
                                    <>
                                    <Typography className="rate-title" style={{textAlign:'center' }}>Rate your stay at {history.propertyName}, {history.propertyCity}</Typography>
                                        <div className="rate">
                                            <StyledRating 
                                            name="rating" 
                                            value={this.state.rating}
                                            precision={0.5}
                                            size='large'
                                            emptyIcon={<StarBorderIcon htmlColor="#B2B2B2" fontSize="large" />}
                                            onChange={(event, newValue) => {
                                                this.setState({rating:newValue})
                                            }}
                                            onChangeActive={(event, newHover) => {
                                                this.setState({hover:newHover});
                                            }}
                                            />
                                        </div>
                                        {this.state.rating !== null? <Box className="rate-value" ml={2}>{this.state.labels[this.state.hover !== -1 ? this.state.hover : this.state.rating]}</Box>:
                                            <Box className="rate-value" ml={2}>{' '}</Box>
                                        }
                                        <textarea name="review" onChange={(e)=>this.setState({review:e.target.value})}/>
                                    <div>
                                            {
                                                !this.state.reviewLoading?
                                                <Button onClick={this.onSendReview}>Done</Button>
                                                :
                                                <Button><div className="review"><CircularProgress/></div>Please wait...</Button>
                                            }
                                    </div>
                                    </>
                                    :
                                    <>
                                        <div className="rate">
                                            <StyledRating 
                                            name="rating" 
                                            value={history.rating}
                                            className='rated-star'
                                            precision={0.5}
                                            size='large'
                                            disabled
                                            emptyIcon={<StarBorderIcon htmlColor="#B2B2B2" fontSize="large" />}
                                            />
                                            <Typography>{history.review}</Typography>
                                        </div>
                                    </>
                                }

                            </div>
                        </TabPanel>
                    </SwipeableViews>
                </WithdrawPopUp>
                    }
                <Grid item xs={11}>
                    <div style={{paddingTop:70}} className="inbox">
                        <div className="inbox-head dashboard-mt">
                            <div className="inbox-title">
                                <h4>Your History</h4>
                            </div>
                            <div className="inbox-icons">
                                <ul className="inbox-menu">
                                    <li style={{marginRight:20,position:'relative'}} className={this.props.classes.search}>

                                        <InputBase
                                        placeholder="Search…"
                                        style={{position:'absolute',right:0}}
                                        classes={{
                                            root: this.props.classes.inputRoot,
                                            input: this.props.classes.inputInput,
                                        }}
                                        onChange={(e)=>this.onSearch(e.target.value)}

                                        inputRef={this.search}
                                        inputProps={{ 'aria-label': 'search' }}
                                        />
                                         <IconButton onClick={()=>this.search.current.focus()}>
                                            <SearchIcon  htmlColor="#00A8C8"/>
                                        </IconButton>
                                    </li>
                                    {/* <li style={{marginRight:20}}>
     
                                    </li> */}
                                    <li>
                                        {
                                            this.state.deleteStatus?
                                                <PanToolIcon htmlColor="#00A8C8" />
                                            :
                                            <IconButton onClick={this.onDelete}>
                                                <DeleteIcon htmlColor="#00A8C8"/>
                                            </IconButton>
                                        }
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div style={{position:'relative'}}  className="inbox-body">
                            <TableContainer className='payment-table' component={Paper} >
                            
                                <Modal loading={this.state.loading}/>
                                <Table  aria-label="payment">
                                    <TableHead>
                                    <TableRow>
                                        <StyledTableCell className="history" classes={{root:classes.tdHead}} align="left">
                                        <label htmlFor="radio" className="radio">
                                            <input type="checkbox"  name="" id="radio"/>
                                            <span className="radio-mark"></span>
                                        </label>
                                        </StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdHead}} align="left">Property Name</StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdHead}} align="left">Amount</StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdHead}} align="left">State</StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdHead}} align="left">City</StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdHead}} align="left">Status</StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdHead}} align="left">Date</StyledTableCell>
                                    </TableRow>
                                    </TableHead>
                                    <TableBody>
                                {inbox}
                                    </TableBody>
                            </Table>
                            </TableContainer>
                                {histories.length<1&& <Typography style={{margin:'10px 20px', color:'#979797'}} variant="subtitle2" component="p">No crib history yet</Typography>}
                                    {/* <tr className="new">
                                        <td>
                                            <label htmlFor="radio" className="radio">
                                                <input type="checkbox" defaultChecked name="" id="radio"/>
                                                <span className="radio-mark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <Link to="/chat">6hrs ago</Link>
                                        </td>
                                        <td>
                                            <Link to="/chat">Locram Bella</Link>
                                        </td>
                                        <td>
                                            <Link to="/chat">Hi there, I am writing with regards to the apartme...</Link>
                                        </td>
                                    </tr>
                                    <tr className="unread">
                                        <td>
                                            <label htmlFor="unread" className="radio">
                                                <input type="checkbox" name="" id="unread" />
                                                <span className="radio-mark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <Link to="/chat">24 weeks ago</Link>
                                        </td>
                                        <td>
                                            <Link to="/chat">Locram Bella</Link>
                                        </td>
                                        <td>
                                            <Link to="/chat">Hi there, I am writing with regards to the apartme...</Link>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <label htmlFor="btn1" className="radio">
                                                <input type="checkbox" name="" id="btn1" />
                                                <span className="radio-mark"></span>
                                            </label>
                                        </td>
                                        <td>
                                            <Link to="/chat">24 weeks ago</Link>
                                        </td>
                                        <td>
                                            <Link to="/chat">Locram Bella</Link>
                                        </td>
                                        <td>
                                            <Link to="/chat">Hi there, I am writing with regards to the apartme...</Link>
                                        </td>
                                    </tr> */}
                                   
                                {/* </tbody>
                            </table> */}
                        </div>
                    </div>
                </Grid>
            </Grid>
            </>
        )
    }
}
const mapStateToProps=state=>({
    histories:state.histories,
    user:state.user
})
export default connect(mapStateToProps)(withStyles(styles,{withTheme:true})(History));