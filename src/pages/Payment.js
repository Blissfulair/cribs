import { Button, InputLabel, MenuItem, Select, TextField } from '@material-ui/core';
// import { KeyboardArrowDown } from '@material-ui/icons';
// import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import React, { useState } from 'react';
import './../scss/payment.scss';

const Payment = () => {

    const cvvNumberLimit = 3;
    const cardNumberLimit = 19;

	const [month, setMonth] = useState(''); // month the card will expire
	const [selectedDate, handleDateChange] = useState(new Date()); // Year the card expires 

    return (
			<section>
				<div className="house-payment-details">
					<div className="location">
						<h1>Confirm and pay</h1>
						<h2>Ikot, Calabar, Ng</h2>
						<h3>Mary's Garden</h3>
						<small>2 Guests</small>
					</div>

					<div className="charges">
						<div className="amounts">
							<div>200 x 13 nights</div>
							<div>100,000</div>
						</div>
						<div className="amounts">
							<div>Owner Fees{/*  <KeyboardArrowDown /> */}</div>
							<div>100,000</div>
						</div>
						<div className="amounts">
							<div>Service Fees</div>
							<div>100,000</div>
						</div>
						<div className="amounts">
							<div>Tax</div>
							<div>100,000</div>
						</div>
					</div>

					<hr />

					<div className="amounts">
						<div style={{ fontWeight: 900 }}>Total</div>
						<div>100,000</div>
					</div>
					<div className="amounts">
						<div style={{ fontWeight: 900 }}>Refundable Damage Deposit</div>
						<div>100,000</div>
					</div>

					<p className="total-left" style={{ paddingTop: ".8rem" }}>
						Total
					</p>
					<p
						className="total-left"
						style={{ fontWeight: 900, fontSize: "1rem" }}
					>
						100,000
					</p>
				</div>
				{/* end of house-payment-details*/}

				<aside>
					<div className="card-details">
						<div className="payment-type">
							<p className="active">Card</p>
							<p>Paystack</p>
							<p>Paypal</p>
						</div>
						{/* <div className="user-card-details"> */}
						<form>
							<div className="card-name">
								<p>Name on Card</p>
								<TextField placeholder="Richard Belfast" fullWidth />
							</div>
							<div className="card-name">
								<p>Card Number</p>
								<TextField
									type="password"
									fullWidth
									inputProps={{
										maxLength: cardNumberLimit,
									}}
								/>
							</div>

							<div className="expire">
								<div className="date-expire">
									<p>Expiration Date</p>
									<div className="picker">
										<span>
											<InputLabel id="demo-simple-select-label">MM</InputLabel>
											<Select
												labelId="demo-simple-select-label"
												id="demo-simple-select"
												value={month}
												onChange={(e) => {
													setMonth(e.target.value);
												}}
											>
												<MenuItem value={1}>January</MenuItem>
												<MenuItem value={2}>February</MenuItem>
												<MenuItem value={3}>March</MenuItem>
												<MenuItem value={4}>April</MenuItem>
												<MenuItem value={5}>May</MenuItem>
												<MenuItem value={6}>June</MenuItem>
												<MenuItem value={7}>July</MenuItem>
												<MenuItem value={8}>August</MenuItem>
												<MenuItem value={9}>September</MenuItem>
												<MenuItem value={10}>October</MenuItem>
												<MenuItem value={11}>November</MenuItem>
												<MenuItem value={12}>December</MenuItem>
											</Select>
										</span>
										<span>
											<DatePicker
												views={["year"]}
												label="YYYY"
												value={selectedDate}
												onChange={handleDateChange}
												animateYearScrolling
											/>
										</span>
										<div>
											<p>CVV</p>
											<TextField
												type="password"
												inputProps={{
													maxLength: cvvNumberLimit,
												}}
											/>
										</div>
									</div>
								</div>
								{/* <div className="cvv">
									<p>CVV</p>
									<TextField
										type="password"
										inputProps={{
											maxLength: cvvNumberLimit,
										}}
									/>
								</div> */}
							</div>

							<Button>Pay</Button>
						</form>

						{/* </div> */}
					</div>
				</aside>
			</section>
		);
}

export default Payment;
