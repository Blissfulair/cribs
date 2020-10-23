import React, { useState } from 'react';
import Layout from './layout';
import '../../scss/dashboard_payment.scss';
import FormControl from '@material-ui/core/FormControl';
import NativeSelect from '@material-ui/core/NativeSelect';
import {
    Table,
    TableHead,
    TableBody,
	TableContainer,
	Paper,
	TableRow,
	Typography,
	withStyles,
	Grid
} from "@material-ui/core"
import { StyledTableCell, StyledTableRow, styles } from './properties';


const DashboardPayment = ({classes}) => {
	const [payments]=useState([])
	return (
		<Layout>
			<div className="dashboard__earning">
				<h1>Earning</h1>

				<div className="dashboard__earningTable">
					<div>
						<p>Net Income</p>
						<p className="dashboard__amount">0</p>
					</div>
					<div>
						<p>Withdrawn</p>
						<p className="dashboard__amount">0</p>
					</div>
					<div>
						<p>Pending Clerance</p>
						<p className="dashboard__amount">0</p>
					</div>
					<div>
						<p>Available for Withdrawal</p>
						<p className="dashboard__amount">0</p>
					</div>
				</div>

				<h4>Withdraw</h4>
				<div className="dashboard__withdraw">
					<div> <strong className='paypal'>P</strong> Paypal</div>
					<div>Bank Transfer</div>
				</div>

				<h4>Show</h4>
				<div className="dashboard__show">
					<div>
					<FormControl >
                                <NativeSelect
                                className='input'
                                // value={state.age}
                                // onChange={handleChange}
                                inputProps={{
                                    name: 'everything'
                                }}
                                >
                                <option value="everything">Everything</option>
                                <option value='withdrawn'>Withdrawn</option>
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
                                // onChange={handleChange}
                                inputProps={{
                                    name: 'year'
                                }}
                                >
                                <option value="2020">2020</option>
                                <option value='2019'>2019</option>
                                <option value='2018'>2018</option>
                                <option value='2017'>2017</option>
                                </NativeSelect>
                            </FormControl>
					</div>
					<div>
						<FormControl >
							<NativeSelect
							className='input'
							// value={state.age}
							// onChange={handleChange}
							inputProps={{
								name: 'month'
							}}
							>
							<option value="">All months</option>	
							<option value="jan">Jan</option>
							<option value='feb'>Feb</option>
							<option value='mar'>Mar</option>
							<option value='apr'>Apr</option>
							</NativeSelect>
						</FormControl>
					</div>
				</div>

				<Grid container style={{marginTop:80}}>
					<Grid item xs={10}>
					<TableContainer className='payment-table' component={Paper} >
                            <Table  aria-label="payment">
                                <TableHead>
                                <TableRow>
                                    <StyledTableCell classes={{root:classes.tdHead}} align="left">Date</StyledTableCell>
                                    <StyledTableCell classes={{root:classes.tdHead}} align="left">For</StyledTableCell>
                                </TableRow>
                                </TableHead>
                                <TableBody>
                                {
                                payments.length>0?
                                payments.map((property, i) =>{
                                        const created = new Date(property.createdAt.seconds*1000);
                                        const createdAt = created.getDate()+'/'+(created.getMonth()+1)+'/'+created.getFullYear() 
                                    return(
                                        <StyledTableRow classes={{root:classes.trRoot}} key={i}>
                                        <StyledTableCell classes={{root:classes.tdRoot}} component="th" scope="row">
                                            {createdAt}
                                        </StyledTableCell>
                                        <StyledTableCell classes={{root:classes.tdRoot}} align="left">{this.str_length(property.description, 30)}</StyledTableCell>

                                        </StyledTableRow>
                                    )
                                })
                                :
                                <Typography style={{margin:'10px 20px', color:'#979797'}} variant="subtitle2" component="p">There are no transaction to show yet...</Typography>
                            }
                                </TableBody>
                            </Table>
                            </TableContainer>
						</Grid>
						</Grid>
			</div>
		</Layout>
	);
}

export default withStyles(styles)(DashboardPayment);
