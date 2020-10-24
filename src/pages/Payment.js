import { Button, MenuItem, Select, TextField } from '@material-ui/core';
// import { KeyboardArrowDown } from '@material-ui/icons';
// import { makeStyles } from '@material-ui/core/styles';
import { DatePicker } from '@material-ui/pickers';
import React, { useState } from 'react';
import './../scss/payment.scss';
import { PaystackConsumer } from 'react-paystack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
const Payment = () => {
    const config = {
        reference: (new Date()).getTime(),
        email: "user@example.com",
        amount: 20000,
        publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    };
    const componentProps = {
        ...config,
        text: 'Paystack',
        onSuccess: () => {
            console.log('paid')
        },
        onClose: () => null
    }
    const cvvNumberLimit = 3;
    const cardNumberLimit = 19;

	const [month, setMonth] = useState(0); // month the card will expire
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
							<button className="active">Card</button>
                            <PaystackConsumer {...componentProps} >
                                {({initializePayment}) => <button onClick={() => initializePayment()}>Paystack</button>}
                            </PaystackConsumer>
							<button>Paypal</button>
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
									<div className="picker">
										<div>
                                            <p>Expiration Date</p>
                                            <div>
                                                <Select
                                                    labelId="card-month-label"
                                                    id="card-month"
                                                    value={month}
                                                    IconComponent={ExpandMoreIcon}
                                                    
                                                    onChange={(e) => {
                                                        setMonth(e.target.value);
                                                    }}
                                                >
                                                    <MenuItem value={0}>MM</MenuItem>
                                                    <MenuItem value={1}>Jan</MenuItem>
                                                    <MenuItem value={2}>Feb</MenuItem>
                                                    <MenuItem value={3}>Mar</MenuItem>
                                                    <MenuItem value={4}>Apr</MenuItem>
                                                    <MenuItem value={5}>May</MenuItem>
                                                    <MenuItem value={6}>Jun</MenuItem>
                                                    <MenuItem value={7}>Jul</MenuItem>
                                                    <MenuItem value={8}>Aug</MenuItem>
                                                    <MenuItem value={9}>Sep</MenuItem>
                                                    <MenuItem value={10}>Oct</MenuItem>
                                                    <MenuItem value={11}>Nov</MenuItem>
                                                    <MenuItem value={12}>Dec</MenuItem>
                                                </Select>
                                                <DatePicker
                                                views={["year"]}
                                
                                                value={selectedDate}
                                                defaultValue="YYYY"
												onChange={handleDateChange}
												animateYearScrolling
											/>
                                            </div>
		
                                        </div>
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
