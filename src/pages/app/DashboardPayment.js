import React from 'react';
import Layout from './layout';
import '../../scss/dashboard_payment.scss';
import { ArrowDropDown } from '@material-ui/icons';


const DashboardPayment = () => {
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
					<div>Paypal</div>
					<div>Bank Transfer</div>
				</div>

				<h4>Show</h4>
				<div className="dashboard__show">
					<div>
						<p>
							Everything 
						</p><span> <ArrowDropDown/> </span>
					</div>
					<div>
						<p>
							2020 
						</p><span> <ArrowDropDown/> </span>
					</div>
					<div>
						<p>
							All months 
						</p><span> <ArrowDropDown/> </span>
					</div>
				</div>
			</div>
		</Layout>
	);
}

export default DashboardPayment;
