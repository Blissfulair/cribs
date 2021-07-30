import React, { Component } from 'react';
import Layout from './layout';
import '../../scss/dashboard_payment.scss';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
    Table,
    TableHead,
    TableBody,
	TableContainer,
	TablePagination,
	Paper,
	TableRow,
	Typography,
	withStyles,
	Grid,
	Button
} from "@material-ui/core"
import { StyledTableCell, StyledTableRow, styles } from './properties';
import WithdrawPopUp from '../../components/withdrawPopup';
import { currency } from '../../helpers/helpers';
import Modal from '../../components/modal';
import { connect } from 'react-redux';
import AppHeader from '../../components/appHeader';



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
			rowsPerPage:8
		}
	}

	componentDidMount(){
		// this.context.approveWithdrawal('150000000','HsAcNIqVWXSdLmGcgV2fhiL8MNn1',200)
		//const date = new Date()
		// this.context.getPaymentHistory()
		// .then(history=>{
		// 	history.sort((a,b) => (a.createdAt*1000 > b.createdAt*1000) ? -1 : ((b.createdAt*1000 > a.createdAt*1000) ? 1 : 0)); 
		// 	const payments = history
		// 	this.setState({allPayments:history, payments, year:date.getFullYear().toString(),tableLoading:false})
		// })
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
	filterByStatus =(status)=>{
		if(status === '' && this.state.month === ''){
			const filterYear = this.state.year !== ''? this.state.year:new Date().getFullYear().toString();
	
			const payments = this.state.allPayments.filter((payment)=>{if(payment.year.toString() === filterYear)return payment;else return ''} )
			console.log(payments, 'month and status empty')
			this.setState({payments,status})
		}
		else{
			if(status !== '' && this.state.month !== ''){
				const filterStatus = status
				const filterMonth = this.state.month
				const filterYear = this.state.year !== ''? this.state.year:new Date().getFullYear().toString();
		
				const payments = this.state.allPayments.filter((payment)=>{if(payment.status === filterStatus && payment.month.toString() === filterMonth &&  payment.year.toString() === filterYear)return payment;else return ''} )
				this.setState({payments,status})
			}
			else if(status !== '' && this.state.month === ''){
				const filterStatus = status
				const filterYear = this.state.year !== ''? this.state.year:new Date().getFullYear().toString();
		
				const payments = this.state.allPayments.filter((payment)=>{if(payment.status === filterStatus &&  payment.year.toString() === filterYear)return payment;else return ''} )
				this.setState({payments,status})
			}
			else if(status === '' && this.state.month !== ''){
				const filterMonth = this.state.month
				const filterYear = this.state.year !== ''? this.state.year:new Date().getFullYear().toString();
		
				const payments = this.state.allPayments.filter((payment)=>{if(payment.month.toString() === filterMonth  && payment.year.toString() === filterYear)return payment;else return ''} )
				this.setState({payments,status})	
			}
			else{
				const filterYear = this.state.year !== ''? this.state.year:new Date().getFullYear().toString();
				const payments = this.state.allPayments.filter((payment)=>{if( payment.year.toString() === filterYear)return payment;else return ''} )
				this.setState({payments,status})	
				console.log(payments, 'last empty')
			}
		}

	}
	filterByYear =(year)=>{
		if(this.state.status === '' && this.state.month === ''){
			const filterYear = year !== ''?year:new Date().getFullYear().toString()
			const payments = this.state.allPayments.filter((payment)=>{if( payment.year.toString() === filterYear)return payment;else return ''} )
			this.setState({payments,year})
		}
		else{
			console.log('top')
			if(this.state.status !== '' && this.state.month !== ''){
				console.log('first')
				const filterYear = year !== ''?year:new Date().getFullYear().toString()
				const filterStatus = this.state.status
				const filterMonth = this.state.month
				const payments = this.state.allPayments.filter((payment)=>{if(payment.status === filterStatus && payment.month.toString() === filterMonth && payment.year.toString() === filterYear)return payment;else return ''} )
				this.setState({payments,year})
			}
			else if(this.state.status !== '' && this.state.month === ''){
				const filterYear = year !== ''?year:new Date().getFullYear().toString()
				const filterStatus = this.state.status
				const payments = this.state.allPayments.filter((payment)=>{if(payment.status === filterStatus && payment.year.toString() === filterYear)return payment;else return ''} )
				this.setState({payments,year})
			}
			else if(this.state.month !== '' && this.state.status === ''){
				const filterYear = year !== ''?year:new Date().getFullYear().toString()
				const filterMonth = this.state.month
				const payments = this.state.allPayments.filter((payment)=>{if(payment.month.toString() === filterMonth  && payment.year.toString() === filterYear)return payment;else return ''} )
				this.setState({payments,year})
			}
			else{
				const filterYear = year !== ''?year:new Date().getFullYear().toString()
				const payments = this.state.allPayments.filter((payment)=>{if(payment.year.toString() === filterYear)return payment;else return ''} )
				this.setState({payments,year})
			}
		}
		
	}
	filterByMonth =(month)=>{
		
			if(month === '' && this.state.status === ''){
				const filterYear = this.state.year !== ''? this.state.year:new Date().getFullYear().toString();
				const payments = this.state.allPayments.filter((payment)=>{if( payment.year.toString() === filterYear)return payment;else return ''} )
				this.setState({payments,month})
			}
			else{
				if(month !== '' && this.state.status !== '')
				{
					const filterMonth = month
					const filterStatus = this.state.status
					const filterYear = this.state.year !== ''? this.state.year:new Date().getFullYear().toString();
					const payments = this.state.allPayments.filter((payment)=>{if(payment.status === filterStatus && payment.month.toString() === filterMonth && payment.year.toString() === filterYear)return payment;else return ''} )
					this.setState({payments,month})
				}
				else if(month === '' && this.state.status !== ''){
					const filterStatus = this.state.status
					const filterYear = this.state.year !== ''? this.state.year:new Date().getFullYear().toString();
					const payments = this.state.allPayments.filter((payment)=>{if(payment.status === filterStatus  && payment.year.toString() === filterYear)return payment;else return ''} )
					this.setState({payments,month})
				}
				else if(month !== '' && this.state.status === ''){
					const filterMonth = month
					const filterYear = this.state.year !== ''? this.state.year:new Date().getFullYear().toString();
					const payments = this.state.allPayments.filter((payment)=>{if(payment.month.toString() === filterMonth && payment.year.toString() === filterYear)return payment;else return ''} )
					this.setState({payments,month})
				}
			}
			// else{
			// 	const filterMonth = month
			// 	const filterStatus = this.state.status !== ''? this.state.status:'pending';
			// 	const filterYear = this.state.year !== ''? this.state.year:new Date().getFullYear().toString();
			// 	const payments = this.state.allPayments.filter((payment)=>{if(payment.status === filterStatus && payment.month.toString() === filterMonth && payment.year.toString() === filterYear)return payment;else return ''} )
			// 	this.setState({payments,month})
			// }
	}
	onSubmit=(e)=>{
		e.preventDefault()
		// if(this.state.amount >= this.context.state.earnings.balance)
		// {
		// 	this.setState({err:'Insufficient balance!'})
		// 	return false;
		// }
		// if(this.state.amount === '' || this.state.accountName === '' || this.state.bankName === '' || this.state.accountNumber === ''){
		// 	this.setState({err:'All inputs are required!'})
		// 	return false;
		// }
		this.setState({loading:true,err:''})
		// const data ={
		// 	hostId:this.context.state.user.uid,
		// 	amount:this.state.amount,
		// 	type:'direct transfer',
		// 	balance:this.context.state.earnings.balance,
		// 	pending:this.context.state.earnings.pending,
		// 	details:{
		// 		accountName:this.state.accountName,
		// 		accountNumber:this.state.accountNumber,
		// 		bankName:this.state.bankName,
		// 	}
		// }
		// this.context.withdrawal(data)
		// .then((withdraw)=>{
		// 	this.setState({
		// 		loading:false,
		// 		payments:[
		// 			{
		// 				...withdraw
		// 			},
		// 			...this.state.payments
		// 		]
		// 	})
		// 	this.directTransferClose()
		// })
	}

	onPayPaySubmit=(e)=>{
		e.preventDefault()
		// if(this.state.amount >= this.context.state.earnings.balance){
		// 	this.setState({err:'Insufficient balance!'})
		// 	return false;
		// }
		// if(this.state.amount === '' || this.state.accountName === '' || this.state.email === ''){
		// 	this.setState({err:'All inputs are required!'})
		// 	return false;
		// }
		this.setState({loading:true,err:''})
		// const data ={
		// 	hostId:this.context.state.user.uid,
		// 	amount:this.state.amount,
		// 	type:'paypal',
		// 	balance:this.context.state.earnings.balance,
		// 	pending:this.context.state.earnings.pending,
		// 	details:{
		// 		accountName:this.state.accountName,
		// 		email:this.state.email,
		// 	}
		// }
		// this.context.withdrawal(data)
		// .then((withdraw)=>{
		// 	this.setState({
		// 		loading:false,
		// 		payments:[
		// 			{
		// 				...withdraw
		// 			},
		// 			...this.state.payments
		// 		]
		// 	})
		// 	this.handleClose()
		// })
	}
	render(){
		const {classes, user, earnings} = this.props
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
									<input name="amount" onChange={this.handleChange}/>
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
									<input name="accountNumber" onChange={this.handleChange}/>
								</td>
							</tr>
							<tr>
								<td>Amount</td>
								<td>
									<input name="amount" onChange={this.handleChange}/>
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
						<p className="dashboard__amount">{currency(user.income)}</p>
					</div>
					<div>
						<p>Withdrawn</p>
						<p className="dashboard__amount">{currency(user.withdrawn)}</p>
					</div>
					<div>
						<p>Pending Clerance</p>
						<p className="dashboard__amount">{currency(user.pending)}</p>
					</div>
					<div>
						<p>Available for Withdrawal</p>
						<p className="dashboard__amount">{currency(earnings.balance)}</p>
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
								onChange={(e)=>{this.filterByStatus(e.target.value)}}
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
                                onChange={(e)=>this.filterByYear(e.target.value)}
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
							onChange={(e)=>this.filterByMonth(e.target.value)}
							inputProps={{
								name: 'month'
							}}
							>
							<option value="">All months</option>	
							<option value="0">Jan</option>
							<option value='1'>Feb</option>
							<option value='2'>Mar</option>
							<option value='3'>Apr</option>
							<option value='4'>May</option>
							<option value='5'>Jun</option>
							<option value='6'>Jul</option>
							<option value='7'>Aug</option>
							<option value='8'>Sep</option>
							<option value='9'>Oct</option>
							<option value='10'>Nov</option>
							<option value='11'>Dec</option>
							</NativeSelect>
						</FormControl>
					</div>
				</div>

				<Grid container style={{marginTop:80}}>
					<Grid item xs={10}>
					<TableContainer style={{position:'relative'}} className='payment-table' component={Paper} >
							<Modal loading={this.state.tableLoading}/>
                            <Table  aria-label="payment">
                                <TableHead>
                                <TableRow>
                                    <StyledTableCell classes={{root:classes.tdHead}} align="left">Date</StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdHead}} align="left">Amount</StyledTableCell>
									<StyledTableCell classes={{root:classes.tdHead}} align="left">Payment Method</StyledTableCell>
									<StyledTableCell classes={{root:classes.tdHead}} align="left">Transaction ID</StyledTableCell>
									<StyledTableCell classes={{root:classes.tdHead}} align="left">Status</StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                this.state.payments.length>0?
                                this.state.payments.slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage).map((payment, i) =>{
                                        const created = new Date(payment.createdAt*1000);
                                        const createdAt = created.getDate()+'/'+(created.getMonth()+1)+'/'+created.getFullYear() 
                                    return(
                                        <StyledTableRow classes={{root:classes.trRoot}} key={i}>
                                        <StyledTableCell classes={{root:classes.tdRoot}} component="th" scope="row">
                                            {createdAt}
                                        </StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdRoot}} align="left">{currency(payment.amount)}</StyledTableCell>
										<StyledTableCell classes={{root:classes.tdRoot}} style={{textTransform:'capitalize'}} align="left">{payment.type}</StyledTableCell>
										<StyledTableCell classes={{root:classes.tdRoot}} align="left">{payment.transactionID}</StyledTableCell>
										<StyledTableCell classes={{root:classes.tdRoot}}  align="left"><span style={{color:payment.status === 'pending'?'#ff9800':payment.status === 'processed'?'#4caf50':'#f44336'}}>{payment.status}</span></StyledTableCell>
                                        </StyledTableRow>
									)
									
								})
								
                                :
                                <Typography style={{margin:'10px 20px', color:'#979797'}} variant="subtitle2" component="p">There are no transaction to show yet...</Typography>
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
								count={this.state.payments.length}
								rowsPerPage={this.state.rowsPerPage}
								page={this.state.page}
								onChangePage={this.handleChangePage}
								onChangeRowsPerPage={this.handleChangeRowsPerPage}
								/>
                            </TableContainer>

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
