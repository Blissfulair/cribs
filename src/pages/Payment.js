import React, { useState, useEffect } from 'react';
import './../scss/payment.scss';
import {withRouter} from "react-router-dom"
import PaymentCard from '../components/payment';
const Payment = ({location}) => {
    const [data, setData] =useState({
        amount:0,
        name:'',
        nights:1,
        ownerFee:0,
        systemFee:0,
        tax:0,
        total:0,
        refund:0,
        guest:1,
        checkIn:'',
        checkOut:'',
        id:'',
        accumulate:0,
        state:'',
        city:0,
        address:'',
        image:'',
        hostEmail:'',
        firstname:'',
        lastname:'',
        phone:'',
        hostId:'',
        photoURL:''
        
    })
    useEffect(()=>{
        if(location.state !== undefined){
            setData({
                name:location.state.name,
                amount:location.state.amount,
                nights:location.state.nights,
                ownerFee:location.state.ownerFee,
                systemFee:location.state.systemFee,
                tax:location.state.tax,
                total:location.state.total,
                refund:location.state.refund,
                guest:location.state.guest,
                checkIn:location.state.checkIn,
                checkOut:location.state.checkOut,
                id:location.state.id,
                accumulate:location.state.accumulate,
                state:location.state.state,
                city:location.state.city,
                address:location.state.address,
                image:location.state.image,
                hostEmail:location.state.hostEmail,
                firstname:location.state.firstname,
                lastname:location.state.lastname,
                phone:location.state.phone,
                hostId:location.state.hostId,
                photoURL:location.state.photoURL
                
            })
        }
        else{
           let pay = JSON.parse(window.sessionStorage.getItem(location.search))
            if(pay){
                setData({
                    name:pay.name,
                    amount:pay.amount,
                    nights:pay.nights,
                    ownerFee:pay.ownerFee,
                    systemFee:pay.systemFee,
                    tax:pay.tax,
                    total:pay.total,
                    refund:pay.refund,
                    guest:pay.guest,
                    checkIn:pay.checkIn,
                    checkOut:pay.checkOut,
                    id:pay.id,
                    accumulate:pay.accumulate,
                    state:pay.state,
                    city:pay.city,
                    address:pay.address,
                    image:pay.image,
                    hostEmail:pay.hostEmail,
                    firstname:pay.firstname,
                    lastname:pay.lastname,
                    phone:pay.phone,
                    hostId:pay.hostId,
                    photoURL:pay.photoURL
                })
            }
        }
    },[location])
    return (
			<section>
				<div className="house-payment-details">
					<div className="location">
						<h1>Confirm and pay</h1>
						<h2 style={{textTransform:'capitalize'}}>{`${data.city}, ${data.state}, Ng`}</h2>
						<h3 style={{fontSize:15,fontWeight:600}}>{data.name}</h3>
						<small style={{ fontWeight: 600 }}>{`${data.guest} ${Number(data.guest) === 1?'Guest':'Guests'}`} </small>
					</div>

					<div className="charges">
						<div className="amounts">
							<div>{data.amount} x {`${data.nights} ${data.nights===1?'night':'nights'}`}</div>
							<div>{data.accumulate}</div>
						</div>
						<div className="amounts">
							<div>Owner Fees{/*  <KeyboardArrowDown /> */}</div>
							<div>{data.ownerFee}</div>
						</div>
						<div className="amounts">
							<div>Service Fees</div>
							<div>{data.systemFee}</div>
						</div>
						<div className="amounts">
							<div>Tax</div>
							<div>{data.tax}</div>
						</div>
					</div>

					<hr />

					<div className="amounts">
						<div style={{ fontWeight: 900 }}>Total</div>
						<div style={{ fontWeight: 900 }}>{data.total}</div>
					</div>
					<div className="amounts">
						<div >Refundable Damage Deposit</div>
						<div>{data.refund}</div>
					</div>

					<p className="total-left" style={{ paddingTop: ".8rem" }}>
						Total
					</p>
					<p
						className="total-left"
						style={{ fontWeight: 900, fontSize: "1rem" }}
					>
						₦{data.total+data.refund}
					</p>
				</div>
				{/* end of house-payment-details*/}

				<aside>
					<PaymentCard data={data}/>
				</aside>
			</section>
		);
}

export default withRouter(Payment);
