import React, {Component, useContext, useState} from "react"
import { PaystackConsumer } from 'react-paystack';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Button, MenuItem, Select, TextField } from '@material-ui/core';
// import {Elements,CardNumberElement,CardCvcElement} from '@stripe/react-stripe-js';
import AppContext from '../state/context';
// import {loadStripe} from '@stripe/stripe-js';
import {mailReciept} from "../emailTemplates/receipt"
import {withRouter} from "react-router-dom"
import Splash from "./splash";
// import emailjs from 'emailjs-com';

//const stripePromise = loadStripe('pk_test_51Hg8hoK2fIb9aYwzRl3MOcLEWpgHCGKnqkXzl8emOzsoNn5ii8oMMuKRAyjV1tanLgvOBuRvFFDu0MK9frmDdDuZ00uaY2DWuF');

const PayStack = withRouter(({changeHandler,state,data,history})=>{
    const context = useContext(AppContext)
    const [loading, setLoading] = useState(false)
    const config = {
        reference: (new Date()).getTime(),
        email: state.email,
        amount: (data.total+data.refund)*100,
        publicKey: process.env.REACT_APP_PAYSTACK_PUBLIC_KEY,
    };

    const handleSubmit =()=> {
        setLoading(true)
        const mailData = {
            from:'noreply@givitec.com',
            to:state.email,
            subject:'Reciept of Payment',
            senderName:process.env.REACT_APP_NAME,
            message:{...data, id:data.id.replace('/',''), tranxID:config.reference, clientName:state.name}
        }
        const reserve = {
            ...data,
            id:data.id.replace('/',''),
            transactionID:config.reference,
            renterEmail:state.email,
            fullname:state.name,
            userId:context.state.user?context.state.user.uid:null,
            propertyName:data.name,
            rooms:data.rooms,
            propertyState:data.state,
            propertyCity:data.city
        }
        context.reserveCrib(reserve)
        .then(()=>{
            context.notifications(data.hostId, {
                name:state.name,
                email:state.email,
                hostEmail:data.hostEmail,
                id:data.id,
                checkIn:data.checkIn,
                checkOut:data.checkOut,
                photoURL:data.photoURL,
            }, 'booking')
            mailReciept(mailData)
            .then(()=>{

                window.sessionStorage.removeItem('@py')
                setLoading(false)
                if(context.state.userData)
                history.push('/app/home')
                else
                history.push('/')
            })

            
        })
        
    
        // sendMail(templateId, {to_name:state.name,message: 'Your transaction ID on Crib NG is '+config.reference, from_name: 'Crib NG', reply_to: state.email})
      }
    const componentProps = {
        ...config,
        text: 'Paystack',
        onSuccess: () => {
            handleSubmit()
        },
        onClose: () => null
    }
    return <form>
        {
            loading&&<Splash/>
        }
        <div className="card-name">
            <p>Full Name</p>
            <TextField value={state.name} placeholder="Richard Belfast" name="name" fullWidth onChange={(e)=>changeHandler(e)} />
        </div>
        <div className="card-name">
            <p>Email Address</p>
            <TextField
                fullWidth
                value={state.email}
                onChange={(e)=>changeHandler(e)}
                placeholder="example@email.com"
                name="email"
            />
        </div>
        <div className="card-name">
            <p>Phone Number</p>
            <TextField value={state.phone} placeholder="+2347062345434" name="phone" onChange={(e)=>changeHandler(e)} fullWidth />
        </div>

        <PaystackConsumer {...componentProps} >
                {({initializePayment}) => <Button onClick={() => {initializePayment();}}>Pay</Button>}
        </PaystackConsumer>


    </form>
})
// const Card = ({state, changeMonth,changeYear})=>{
// return    <form>
//     <Elements stripe={stripePromise}>

//         <div className="card-name">
//             <p>Name on Card</p>
//             <TextField placeholder="Richard Belfast" fullWidth />
//         </div>
//         <div className="card-name">
//             <p>Card Number</p>
//             {/* <TextField
//                 type="password"
//                 fullWidth
//                 inputProps={{
//                     maxLength: cardNumberLimit,
//                 }}
//             /> */}
//             <CardNumberElement options={{classes:{base:'cardinput', invalid:'card-error', complete:'card-success'}, style:{
//                         base:{
//                             color:'#fff', 
//                             fontSize:'16px',
//                             '::placeholder': {
//                                 color: '#707070',
//                             },
//                         }
//                     }
//                 }}
//             />
//         </div>

//         <div className="expire">
//             <div className="date-expire">
//                 <div className="picker">
//                     <div>
//                         <p>Expiration Date</p>
//                         <div>
//                             <Select
//                                 labelId="card-month-label"
//                                 id="card-month"
//                                 value={state.cardMonth}
//                                 IconComponent={ExpandMoreIcon}
                                
//                                 onChange={(e) => {
//                                   changeMonth(e)  
//                                 }}
//                             >
//                                 <MenuItem value={0}>MM</MenuItem>
//                                 <MenuItem value={1}>Jan</MenuItem>
//                                 <MenuItem value={2}>Feb</MenuItem>
//                                 <MenuItem value={3}>Mar</MenuItem>
//                                 <MenuItem value={4}>Apr</MenuItem>
//                                 <MenuItem value={5}>May</MenuItem>
//                                 <MenuItem value={6}>Jun</MenuItem>
//                                 <MenuItem value={7}>Jul</MenuItem>
//                                 <MenuItem value={8}>Aug</MenuItem>
//                                 <MenuItem value={9}>Sep</MenuItem>
//                                 <MenuItem value={10}>Oct</MenuItem>
//                                 <MenuItem value={11}>Nov</MenuItem>
//                                 <MenuItem value={12}>Dec</MenuItem>
//                             </Select>
//                             <Select
//                                 labelId="card-year-label"
//                                 id="card-year"
//                                 IconComponent={ExpandMoreIcon}
//                                 value={state.year}
//                                 onChange={(e) => {
//                                     changeYear(e)
//                                 }}
//                             >
//                                 <MenuItem value={0}>YYYY</MenuItem>
//                                 {
//                                 state.years.length>0&&
//                                  state.years.map((year,i)=>(
//                                     <MenuItem value={i+1}>{year}</MenuItem>
//                                  ))   
//                                 }
//                             </Select>
//                         </div>

//                     </div>
//                     <div>
//                         <p>CVV</p>
//                         {/* <TextField
//                             type="password"
//                             inputProps={{
//                                 maxLength: cvvNumberLimit,
//                             }}
//                         /> */}
//                         <CardCvcElement
                            
//                             options={{
//                                 classes:{
//                                     base:'cvcinput', invalid:'card-error'
//                                 },
//                                 style:{
//                                     base:{
//                                         fontSize:'15px',
//                                         color:'#fff'
//                                     }
//                                 },
                                
//                             }}
//                         />
//                     </div>
//                 </div>
//             </div>
//         </div>
//         </Elements>

//         <Button>Pay</Button>

//     </form>
// }
class PaymentCard extends Component{
    static contextType = AppContext
    constructor(props){
        super(props)
        this.state ={
            years:[],
            year:0,
            cardYear:'',
            cardMonth:0,
            method:'card',
            email:'',
            phone:'',
            name:"",
        }

    }

    componentDidMount(){
        if(this.context.state.userData){
            this.setState({
                name:this.context.state.userData.firstname+ ' '+this.context.state.userData.lastname,
                phone:this.context.state.userData.phone,
                email:this.context.state.userData.email,
            })
        }
        let today = new Date();
        today = today.getFullYear();
        const years = []
        for(let year = today; year >= today-10; year--){
            years.push(year)
        }
        this.setState({years})

    }

    changeMonth=(e)=>{
        this.setState({cardMonth:e.target.value});
    }
    changeHandler =(e)=>{
        this.setState({[e.target.name]:e.target.value})
    }
    changeYear=(e)=>{
        this.setState({year:e.target.value, cardYear:e.target.value>0?this.state.years[e.target.value-1]:''});
    }
    render(){
    return(
        <div className="card-details">
        <div className="payment-type">
            <button onClick={()=>this.setState({method:'card'})} className={this.state.method === 'card'?'active':''}>Card</button>

            <button className={this.state.method === 'paystack'?'active':''} onClick={() => { this.setState({method:'paystack'})}}>Paystack</button>

            <button className={this.state.method === 'paypal'?'active':''} onClick={()=>{this.setState({method:'paypal'})}}>Paypal</button>
        </div>
        {/* <div className="user-card-details"> */}
        {
            // this.state.method === 'card'?
            // <Card state={this.state} changeMonth={this.changeMonth} changeYear={this.changeYear}/>
            // :
            <PayStack changeHandler={this.changeHandler} data={this.props.data} state={this.state}/>

        }

        {/* </div> */}
    </div>
    )
}
}
export default PaymentCard