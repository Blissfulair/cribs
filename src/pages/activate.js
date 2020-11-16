import React, { useContext, useState } from "react";
import "./signup.css"
import "./login.css"
import { Button} from "@material-ui/core";
import AppContext from "../state/context";
import { mailVerify } from "../emailTemplates/receipt";


const  Activate = ()=>{
    const [message, setMessage]=useState('')
    const [loading, setLoading]=useState(false)
    const [status, setStatus]=useState(true)
    const {state,resendVerification} = useContext(AppContext)
    const onResend = ()=>{
        setLoading(true)
        const data = {
            from:'noreply@givitec.com',
            to:state.user.email,
            subject:'Email Verification',
            firstname:state.userData.firstname,
            senderName:process.env.REACT_APP_NAME,
        }
        mailVerify(data)
        .then(()=>{
            setLoading(false)
            setStatus(true)
            setMessage('Verification link has been sent successfully!')
        })
        .catch(e=>{
            setLoading(false)
            setStatus(false)
            setMessage('Failed to send link, please try again.')
        })

        setTimeout(()=>{
            setMessage('')
        }, 3000)
    }
        return (
            <>
                <div className="label"></div>
                <div className="header-wrap">
                    <div style={{height:300,display:'grid', alignContent:'center'}}>
                        {
                            message !== ''&&
                            <p style={{textAlign:'center', color:status?'green':'red', fontSize:17}}>{message}</p>
                        }
                        
                        <p style={{textAlign:'center', color:'#00A8C8', fontSize:20}}>Verification link has been sent to {state.user.email}</p>
                        <p  style={{textAlign:'center', marginTop:15, marginBottom:15}}>Check your inbox or spam folder for the email, if you do not receive the email, click on the button below.</p>
                        {
                            loading?
                            <Button variant="outlined" style={{width:200, margin:'0 auto', borderColor:'#707070ad',color:'#707070ad', textTransform:'capitalize'}}>Please wait...</Button>
                            :
                            <Button variant="outlined" style={{width:200, margin:'0 auto', borderColor:'rgb(0, 0, 238)',color:'rgb(0, 0, 238)', textTransform:'capitalize'}} onClick={()=>onResend()}>Resend Verification</Button>
                        }
                    </div>
                </div>
            </>
        );
    }
export default Activate;