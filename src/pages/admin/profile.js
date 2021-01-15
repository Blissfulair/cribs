import React, { useState } from "react";
import "../app/inbox.css"
import "../app/properties.css"
import "../app/add-property.css"
import "../app/profile.css"
import "../app/setting.css"

import Backend from "./layout"
import { Typography, IconButton, Avatar } from "@material-ui/core";
import {Snackbar, Slide } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import AppContext from "../../state/context";
import firebase from "../../components/firebase"
import Activity from "../../components/activity";
const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }
const ProfileDetails = ({context,uploadImage})=>{
    const [state, setState]=useState({
        toggle:false,
        old:'',
        password:'',
        confirm_pass:'',
        old_secure:true,
        password_secure:true,
        confirm_secure:true,
        message:'',
        transition:undefined,
        open:false,
        success:false,
        loading:false
    })
    const changeHandler =(n)=>{
        setState({...state,[n.target.name]:n.target.value})
    }
    const onSubmit = (e)=>{
        e.preventDefault()
        setState({...state, message:'',success:false, loading:true})
        if(state.password === ''|| state.old === ''){
            setState({...state, message:'Password cannot be empty!',success:false,loading:false})
            return
        }
        if(state.password !== state.confirm_pass){
            setState({...state, message:'Password doesn\'s match!',success:false,loading:false})
            return
        }
        const data = {
            password:state.old,
            newPassword:state.password,
            email:context.state.user.email
        }
        firebase.changePassword(data)
        .then((res)=>{
            if(res === true)
            setState({...state, message:'Password Successfully Changed',success:true,loading:false, old:'',password:'', confirm_pass:''})
            else 
            setState({...state, message:res,success:false,loading:false})
        })
    }
    const handleClick = (Transition) => () => {
        setState({...state, transition:Transition, open:true})
        };
    const handleCloseSnackBar = (event,reason) => {
        if (reason === 'clickaway') {
            return;
          }
        setState({...state,open:false})
        }
    return(
        <div style={{paddingTop:80}} className="inbox">
            <Activity loading={state.loading} />
        <div className="inbox-head dashboard-mt">
            <div className="inbox-title">
                <h4>Profile</h4>
            </div>
        </div>

        <div className="profile">
            <div className="profile-img">
                {
                    context.state.photoURL?
                    <img id="img" src={context.state.photoURL} alt={context.state.userData.firstname} />
                    :
                    <Avatar/>
                }
                    <input type="file" onChange={(e)=>{uploadImage(e)}} name="" id="ig" />
                    <label htmlFor="ig">
                        {/* <IconButton> */}
                            <EditOutlinedIcon fontSize="small" htmlColor="#fff"/>
                        {/* </IconButton> */}
                    </label>
            </div>
            <div className="profile-details">
                <h4 className="title">{context.state.userData.firstname + ' '+ context.state.userData.lastname}</h4>
                <p className="review"> Access Level</p>
                <Typography variant="subtitle2" style={{marginTop:12, color:'#00A8C8'}} component="p">{context.state.userData.role===3?'Administrator':'Support'}</Typography>
            </div>
        </div>


        <div className="password-form">
                    <h4>Change Password</h4>
                    {
                    state.message&&
                    <Snackbar
                    open={state.open}
                    onClose={handleCloseSnackBar}
                    TransitionComponent={state.transition}
                    anchorOrigin={{vertical:'top',horizontal:'right'}}
                    autoHideDuration={5000}
                    key={state.transition ? state.transition.name : ''}
                    >
                        <Alert variant="filled" severity={state.success?"success":"error"}>{state.message}</Alert>
                    </Snackbar>
                }
                <form onSubmit={e=>{onSubmit(e)}}>
                    <div className="password-group">
                        <label htmlFor="old">Old Password</label>
                        <div>
                            <input value={state.old} onChange={changeHandler} type={state.old_secure?"password":"text"} id="old" name="old" />
                            <IconButton onClick={()=>setState({...state,old_secure:!state.old_secure})}  className="eye">
                                {
                                    !state.old_secure?
                                    <VisibilityOffIcon/>
                                    :
                                    <VisibilityIcon />
                                }
                                
                            </IconButton>
                        </div>
                    </div>
                    <div className="password-group">
                        <label htmlFor="new">New Password</label>
                        <div>
                            <input value={state.password} onChange={changeHandler} type={state.password_secure?"password":"text"} id="new" name="password" />
                            <IconButton onClick={()=>setState({...state,password_secure:!state.password_secure})} className="eye">
                                {
                                    !state.password_secure?
                                    <VisibilityOffIcon/>
                                    :
                                    <VisibilityIcon />
                                }
                            </IconButton>
                        </div>
                    </div>
                    <div className="password-group">
                        <label htmlFor="confirm">Re-Type Password</label>
                        <div>
                        <input onChange={changeHandler} value={state.confirm_pass} type={state.confirm_secure?"password":"text"} id="confirm" name="confirm_pass" />
                        <IconButton onClick={()=>setState({...state,confirm_secure:!state.confirm_secure})} className="eye">
                            {
                                    !state.confirm_secure?
                                    <VisibilityOffIcon/>
                                    :
                                    <VisibilityIcon />
                                }
                        </IconButton>
                        </div>
                    </div>
                    <div className="password-group">
                        <button onClick={handleClick(TransitionUp)} className="btn">Save</button>
                    </div>
                </form>
            </div>
    </div>
    )
}

class AdminProfile extends React.Component{
    static contextType = AppContext
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            location:'',
            address:'',
            experience:'',
            gender:'',
            name:'',
            code:'',
            avater:null,
            profile:null,
            user:null
        }
    }

    componentDidMount(){
        // axios.get(`${api}/get_profile`,{headers:headers})
        // .then(res=>{
        //     this.setState({
        //         profile:res.data.profile,
        //         user:res.data.user,
        //         phone: res.data.profile !== null?  res.data.profile.phone:'',
        //         name: res.data.profile !== null?  res.data.profile.name:'',
        //         address: res.data.profile !== null?  res.data.profile.address:'',
        //         location: res.data.profile !== null?  res.data.profile.location:'',
        //         avater: res.data.profile !== null?  res.data.profile.avater:'',
        //         experience: res.data.profile !== null?  res.data.profile.experience:'',
        //         gender: res.data.profile !== null?  res.data.profile.gender:'',

        //     })
        // })
    }
    uploadImage = (e)=>{
        let image = e.target.files[0];
        this.context.uploadProfilePhoto(image)
        .then(()=>{
            // con
        })
    }


    render(){
        return (
            <>
                    <Backend>
                        <ProfileDetails context={this.context} uploadImage={this.uploadImage}/>
                    </Backend>
            </>
        )
    }
}
export default AdminProfile;

