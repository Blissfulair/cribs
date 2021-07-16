import React, { useEffect } from "react";
import "./signup.css"
import "./login.css"
import { connect } from "react-redux";
import { verifyEmail } from "../apis/server";
import { setUser } from "../state/actions";



const  Verify = ({user,setUser, history, location})=>{

    useEffect(()=>{
        const token = location.pathname.split('/')[2]
        const cleanup = async()=>{
            const userData = await verifyEmail(token)
           if(userData){
            setUser(userData)
            history.push('/app/home')
           }

            
        }
       cleanup()
    },[location,history, setUser])
        return (
            <>
                <div className="label"></div>
                <div className="header-wrap">
                    <div style={{height:300,display:'grid', alignContent:'center'}}>
                        
                        <p style={{textAlign:'center', color:'#00A8C8', fontSize:20}}>Verifying email address</p>
 
                    </div>
                </div>
            </>
        );
    }
    const mapStateToProps = state => ({
        user:state.user
    });
    const mapDispatchToProps = dispatch => ({
        setUser: (payload) => dispatch(setUser(payload))
      });
    export default connect(mapStateToProps,mapDispatchToProps)(Verify);