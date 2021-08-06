import React, { Component,createRef } from 'react';
import Layout from './layout';
import '../../scss/dashboard_payment.scss';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
	Typography,
	withStyles,
	Grid,
	Button
} from "@material-ui/core"
import Table,{
    TableHead,
    TableBody,
	TableCell,
	TableRow,
	TablePagination
} from "../../components/table/index"
import { styles } from './properties';
import WithdrawPopUp from '../../components/withdrawPopup';
import { currency } from '../../helpers/helpers';
import Activity from '../../components/activity';
import { connect } from 'react-redux';
import AppHeader from '../../components/appHeader';
import { bankWithdraw, getWallet, getWithdraw, paypalWithdraw } from '../../apis/server';



class DashboardPayment extends Component {
	constructor(props){
		super(props)
		this.state={
			payments:[],
			allPayments:[],
			open:false,
			directTransfer:false,
			amount:'',
			accountNumber:'',
			accountName:'',
			bankName:'',
			email:'',
			loading:false,
			tableLoading:true,
			err:'',
			year:'',
			month:'',
			status:'',
			page:0,
			rowsPerPage:8,
			wallet:{}
		}
		this.table= createRef()
	}

	componentDidMount(){
		this.onLoadWallet()
		getWithdraw(this.props.user.id)
		.then(withdraws=>{
			console.log(withdraws)
			this.setState({tableLoading:false, payments:withdraws})
		})
		// this.context.approveWithdrawal('150000000','HsAcNIqVWXSdLmGcgV2fhiL8MNn1',200)
		//const date = new Date()
		// this.context.getPaymentHistory()
		// .then(history=>{
		// 	history.sort((a,b) => (a.createdAt*1000 > b.createdAt*1000) ? -1 : ((b.createdAt*1000 > a.createdAt*1000) ? 1 : 0)); 
		// 	const payments = history
		// 	this.setState({allPayments:history, payments, year:date.getFullYear().toString(),tableLoading:false})
		// })
	}
	onLoadWallet=()=>{
		getWallet(this.props.user.id)
		.then(wallet=>{
			this.setState({wallet:wallet, loading:false})

		})
		.catch(e=>{
			this.setState({loading:false})
		})
	}

	handleChangePage = (event, newPage) => {
		this.setState({page:newPage});
	  };
	handleChangeRowsPerPage = (event) => {
		this.setState({rowsPerPage:Number(event.target.value),page:0});
	  };
	handleClickOpen = () => {
		this.setState({open:true});
	  }
	directTransfer = () => {
	this.setState({directTransfer:true});
	}
	
	handleClose = () => {
	this.setState({open:false});
	}
	directTransferClose = () => {
	this.setState({directTransfer:false});
	}

	handleChange=(e)=>{
		this.setState({[e.target.name]:e.target.value})
	}
	onSubmit=(e)=>{
		e.preventDefault()
		if(this.state.amount >= this.state.wallet.available)
		{
			this.setState({err:'Insufficient balance!'})
			return false;
		}
		if(this.state.amount === '' || this.state.accountName === '' || this.state.bankName === '' || this.state.accountNumber === ''){
			this.setState({err:'All inputs are required!'})
			return false;
		}
		this.setState({loading:true,err:''})
		const data ={
			id:this.props.user.id,
			firstname:this.props.user.firstname,
			lastname:this.props.user.lastname,
			amount:this.state.amount,
			account_name:this.state.accountName,
			account_number:this.state.accountNumber,
			bank_name:this.state.bankName
		}
		bankWithdraw(data)
		.then((withdraw)=>{
			this.setState({
				loading:false,
				payments:[
					{
						...withdraw
					},
					...this.state.payments
				]
			})
			this.onLoadWallet()
			this.directTransferClose()
		})
	}

	onPayPaySubmit=(e)=>{
		e.preventDefault()
		if(this.state.amount >= this.state.wallet.available){
			this.setState({err:'Insufficient balance!'})
			return false;
		}
		if(this.state.amount === '' || this.state.accountName === '' || this.state.email === ''){
			this.setState({err:'All inputs are required!'})
			return false;
		}
		this.setState({loading:true,err:''})
		const data ={
			id:this.props.user.id,
			firstname:this.props.user.firstname,
			lastname:this.props.user.lastname,
			amount:this.state.amount,
			paypal_name:this.state.accountName,
			paypal_email:this.state.email,
		}
		paypalWithdraw(data)
		.then((withdraw)=>{
			this.setState({
				loading:false,
				payments:[
					{
						...withdraw
					},
					...this.state.payments
				]
			})
			this.onLoadWallet()
			this.handleClose()
		})
	}

	statusFilter=(e)=> {
		var input, filter, table, tr, td, i, txtValue;
		input = e.target.value
		filter = input.toUpperCase();
		table = this.table.current;
		tr = table.getElementsByTagName("tr");
		this.setState({status:filter})
		for (i = 0; i < tr.length; i++) {
		  td = tr[i].getElementsByTagName("td")[4];
		  if (td) {
			txtValue = td.textContent || td.innerText;
			if (txtValue.toUpperCase().indexOf(filter) > -1) {
			  tr[i].style.display = "";
			} else {
			  tr[i].style.display = "none";
			}
		  }       
		}
	  }

	  monthFilter=(e)=> {
		var input, filter, table, tr, td, i, txtValue;
		input = e.target.value
		filter = input;
		table = this.table.current;
		tr = table.getElementsByTagName("tr");
		
		for (i = 0; i < tr.length; i++) {
		  td = tr[i].getElementsByTagName("td")[0];
		  if (td) {
			txtValue = td.textContent.split('/') || td.innerText.split('/');
			if(txtValue.length>2)
			if (txtValue[1] === filter) {
			  tr[i].style.display = "";
			} else {
			  tr[i].style.display = "none";
			}
		  }       
		}
	  }

	  yearFilter=(e)=> {
		var input, filter, table, tr, td, i, txtValue;
		input = e.target.value
		filter = input;
		table = this.table.current;
		tr = table.getElementsByTagName("tr");
		
		for (i = 0; i < tr.length; i++) {
		  td = tr[i].getElementsByTagName("td")[0];
		  if (td) {
			txtValue = td.textContent.split('/') || td.innerText.split('/');
			if(txtValue.length>2)
			if (txtValue[2] === filter) {
			  tr[i].style.display = "";
			} else {
			  tr[i].style.display = "none";
			}
		  }       
		}
	  }
	render(){
		const {classes} = this.props
		const today = new Date().getFullYear()
		const emptyRows = this.state.rowsPerPage - Math.min(this.state.rowsPerPage, this.state.payments.length - this.state.page * this.state.rowsPerPage);
		const years = []
		for(let year = today; year >= 2018; year --)
			years.push(year)
	return (
		<>
		
		<Layout>
		<AppHeader/>
			<WithdrawPopUp className="withdraw-modal" title="Withdrawal Details" open={this.state.open} handleClose={this.handleClose}>
			<p style={{color:'#f44336'}}>{this.state.err}</p>
			<form onSubmit={this.onPayPaySubmit}>
					<table>
						<tbody>
							<tr>
								<td>
									
								</td>
								<td>Input PayPal Details</td>
							</tr>
							<tr>
								<td>Paypal Name</td>
								<td>
									<input name="accountName" onChange={this.handleChange}/>
								</td>
							</tr>
							<tr>
								<td>Paypal Email</td>
								<td>
									<input name="email" onChange={this.handleChange}/>
								</td>
							</tr>
							<tr>
								<td>Amount</td>
								<td>
									<input name="amount" onInput={(e)=>e.target.value=e.target.value.replace(/[A-Za-z]/g, '')} onChange={this.handleChange}/>
								</td>
							</tr>
						</tbody>
					</table>
					{
						this.state.loading?
						<Button style={{background:'#DBDBDB'}} type="btn">Please wait ...</Button>
						:
						<Button style={{background:'#00A8C8'}} type="submit">Submit Request</Button>
					}
				</form>
			</WithdrawPopUp>
			<WithdrawPopUp className="withdraw-modal" title="Withdrawal Details" open={this.state.directTransfer} handleClose={this.directTransferClose}>
			<p style={{color:'#f44336'}}>{this.state.err}</p>
			<form onSubmit={this.onSubmit}>
					<table>
						<tbody>
							<tr>
								<td>
								
								</td>
								<td>Input Bank Details</td>
							</tr>
							<tr>
								<td>Account Name</td>
								<td>
									<input name="accountName" onChange={this.handleChange}/>
								</td>
							</tr>
							<tr>
								<td>Bank Name</td>
								<td>
									<input name="bankName" onChange={this.handleChange}/>
								</td>
							</tr>
							<tr>
								<td>Account Number</td>
								<td>
									<input onInput={(e)=>e.target.value=e.target.value.replace(/[A-Za-z]/g, '')}  name="accountNumber" onChange={this.handleChange}/>
								</td>
							</tr>
							<tr>
								<td>Amount</td>
								<td>
									<input onInput={(e)=>e.target.value=e.target.value.replace(/[A-Za-z]/g, '')}  name="amount" onChange={this.handleChange}/>
								</td>
							</tr>
						</tbody>
					</table>
					{
						this.state.loading?
						<Button style={{background:'#DBDBDB'}} type="btn">Please wait ...</Button>
						:
						<Button style={{background:'#00A8C8'}} type="submit">Submit Request</Button>
					}
				</form>
			</WithdrawPopUp>
			<div className="dashboard__earning">
				<h1>Earning</h1>

				<div className="dashboard__earningTable">
					<div>
						<p>Net Income</p>
						<p className="dashboard__amount">{currency(this.state.wallet.income)}</p>
					</div>
					<div>
						<p>Withdrawn</p>
						<p className="dashboard__amount">{currency(this.state.wallet.withdrawn)}</p>
					</div>
					<div>
						<p>Pending Clerance</p>
						<p className="dashboard__amount">{currency(this.state.wallet.pending)}</p>
					</div>
					<div>
						<p>Available for Withdrawal</p>
						<p className="dashboard__amount">{currency(this.state.wallet.available)}</p>
					</div>
				</div>

				<h4>Withdraw</h4>
				<div className="dashboard__withdraw">
					<button onClick={this.handleClickOpen}> <strong className='paypal'>P</strong> Paypal</button>
					<button onClick={this.directTransfer}>Bank Transfer</button>
				</div>

				<h4>Show</h4>
				<div className="dashboard__show">
					<div>
					<FormControl >
                                <NativeSelect
                                className='input'
                                // value={state.age}
								onChange={(e)=>{this.statusFilter(e)}}
                                inputProps={{
                                    name: 'everything'
                                }}
                                >
                                <option value="">Everything</option>
                                <option value='processed'>processed</option>
                                <option value='cancelled'>Cancelled</option>
                                <option value='pending'>Pending</option>
                                </NativeSelect>
                            </FormControl>
					</div>
					<div>
							<FormControl >
                                <NativeSelect
                                className='input'
                                // value={state.age}
                                onChange={(e)=>this.yearFilter(e)}
                                inputProps={{
                                    name: 'year'
                                }}
                                >
									{
										years.map(year=>(
										<option value={year}>{year}</option>
										))
									}
                                </NativeSelect>
                            </FormControl>
					</div>
					<div>
						<FormControl >
							<NativeSelect
							className='input'
							// value={state.age}
							onChange={(e)=>this.monthFilter(e)}
							inputProps={{
								name: 'month'
							}}
							>
							<option value="">All months</option>	
							<option value="1">Jan</option>
							<option value='2'>Feb</option>
							<option value='3'>Mar</option>
							<option value='4'>Apr</option>
							<option value='5'>May</option>
							<option value='6'>Jun</option>
							<option value='7'>Jul</option>
							<option value='8'>Aug</option>
							<option value='9'>Sep</option>
							<option value='10'>Oct</option>
							<option value='11'>Nov</option>
							<option value='12'>Dec</option>
							</NativeSelect>
						</FormControl>
					</div>
				</div>

				<Grid container style={{marginTop:80}}>
					<Grid item xs={10}>
							<Activity loading={this.state.tableLoading}/>
                            <Table innerRef={this.table}  className="cribs-payment">
                                <TableHead>
                                <TableRow>
                                    <TableCell classes={{root:classes.tdHead}} align="left">Date</TableCell>
                                    <TableCell classes={{root:classes.tdHead}} align="left">Amount</TableCell>
									<TableCell classes={{root:classes.tdHead}} align="left">Payment Method</TableCell>
									<TableCell classes={{root:classes.tdHead}} align="left">Transaction ID</TableCell>
									<TableCell classes={{root:classes.tdHead}} align="left">Status</TableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                this.state.payments.length>0?
                                this.state.payments.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((payment, i) =>{
                                        const created = new Date(payment.createdAt);
                                        const createdAt = created.getDate()+'/'+(created.getMonth()+1)+'/'+created.getFullYear() 
                                    return(
                                        <TableRow classes={{root:classes.trRoot}} key={i}>
                                        <TableCell classes={{root:classes.tdRoot}}>
                                            {createdAt}
                                        </TableCell>
                                        <TableCell classes={{root:classes.tdRoot}} align="left">{currency(payment.amount)}</TableCell>
										<TableCell classes={{root:classes.tdRoot}} style={{textTransform:'capitalize'}} align="left">{payment.method?'Bank Transfer':'Paypal'}</TableCell>
										<TableCell classes={{root:classes.tdRoot}} align="left">{payment._id}</TableCell>
										<TableCell classes={{root:classes.tdRoot}}  align="left"><span style={{color:payment.status === 0?'#ff9800':payment.status === 1?'#4caf50':'#f44336'}}>{payment.status === 0?'pending':payment.status ===1?'Processed':'Cancelled'}</span></TableCell>
                                        </TableRow>
									)
									
								})
								
                                :
                                <Typography style={{margin:'10px 20px', color:'#979797'}} variant="subtitle2" component="p">There are no transaction to show yet...</Typography>
                            }
							    {emptyRows > 0 && (
										<TableRow classes={{root:classes.trRoot}} style={{ height: 53 * emptyRows }}>
										<TableCell classes={{root:classes.tdRoot}}  colSpan={6} />
										</TableRow>
									)}
                                </TableBody>
                            </Table>
							<TablePagination
								rowsPerPageOptions={[8, 16, 24]}
								component="div"
								count={this.state.payments.length}
								rowsPerPage={this.state.rowsPerPage}
								page={this.state.page}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={this.handleChangeRowsPerPage}
								/>

						</Grid>
						</Grid>
			</div>
		</Layout>
		</>
	);
}
}
const mapStateToProps=state=>({
	user:state.user,
	earnings:state.earnings
})
export default connect(mapStateToProps)(withStyles(styles)(DashboardPayment));
