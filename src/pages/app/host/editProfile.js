import React from "react";
import "./../inbox.css"
import "./../properties.css"
import "./../add-property.css"
import "./../profile.css"
// import "./edit-profile.css"
import Backend from "./../layout"
import { NativeSelect, Button,Snackbar, Slide } from "@material-ui/core";
import Activity from "../../../components/activity"
import {Alert} from "@material-ui/lab"
import {withRouter} from "react-router-dom"
import { connect } from "react-redux";
import AppHeader from "../../../components/appHeader"
import { updateHost } from "../../../apis/server";
import { setUser } from "../../../state/actions";

const EditProfileDom = ({state, handleCloseSnackBar, user,env, changeHandler,onSubmit,handleClick})=>{
    return(
        <>
            <Activity loading={state.loading} />

            <div style={{paddingTop:80}} className="inbox">
                <div className="inbox-head dashboard-mt">
                    <div className="inbox-title">
                        <h4>Profile</h4>
                    </div>
                </div>

                <div className="profile-edit">
                    <div className="profile-details">
                        <form onSubmit={event=>{onSubmit(event)}}>
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
                            <table>
                                <tbody>
                                    <tr>
                                    <td>Address: <span style={{color:'red'}}>*</span></td>
                                        <td><input onChange={(e)=>changeHandler(e)} name="address" defaultValue={user.address?user.address:''} /></td>
                                    </tr>
                                    <tr>
                                        <td>Phone: <span style={{color:'red'}}>*</span></td>
                                        <td>
                                            <img alt="flag" src={`https://www.countryflags.io/${env?env.country_code.toLowerCase():'us'}/shiny/32.png`}/>
                                            <input type="text" onChange={(e)=>changeHandler(e)} name="phone" defaultValue={user.phone?user.phone:env?env.country_calling_code:''} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Facebook:</td>
                                        <td>
                                            <input type="text" onChange={(e)=>changeHandler(e)} name="facebook" defaultValue={user.facebook?user.facebook:''} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>LinkedIn:</td>
                                        <td>
                                            <input type="text" onChange={(e)=>changeHandler(e)} name="linkedin" defaultValue={user.linkedin?user.linkedin:''} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Date of Birth: <span style={{color:'red'}}>*</span></td>
                                        <td>
                                            <input type="text" onChange={(e)=>changeHandler(e)} name="dob" defaultValue={user.dob?user.dob:''} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Gender: <span style={{color:'red'}}>*</span></td>
                                        <td>
                                            <NativeSelect defaultValue={user.gender?user.gender:''} onBlur={changeHandler} name="gender" id="">
                                                <option value="">Choose</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </NativeSelect>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Bio: <span style={{color:'red'}}>*</span></td>
                                        <td>
                                            <textarea onChange={(e)=>changeHandler(e)} defaultValue={user.bio?user.bio:''} name="bio"  />
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="edit-btn">
                                <Button onClick={handleClick(TransitionUp)} variant="contained" type="submit" style={{background:'#00A8C8', color:'#fff', textTransform:'capitalize'}}>Save</Button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }
class EditProfile extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            address:'',
            linkedin:null,
            gender:'',
            facebook:null,
            dob:'',
            bio:'',
            loading:false,
            message:'',
            success:false,
            transition:undefined,
            open:false,
        }
    }

    componentDidMount(){
        const dom = document.querySelector('#profiles')
        if(dom !== null)
        dom.setAttribute('class', 'is-active')
        this.setState({
            phone:this.props.user.phone,
            address:this.props.user.address,
            bio:this.props.user.bio,
            linkedin:this.props.user.linkedin === undefined?null:this.props.user.linkedin,
            facebook:this.props.user.facebook === undefined?null:this.props.user.facebook,
            dob:this.props.user.dob,
            gender:this.props.user.gender
        })
    }

    handleClick = (Transition) => () => {
        this.setState({transition:Transition, open:true})
        };
    handleCloseSnackBar = (event,reason) => {
        if (reason === 'clickaway') {
            return;
          }
        this.setState({open:false})
        }

    changeHandler = e =>{
        this.setState({[e.target.name]:e.target.value})
    }

    onSubmit = n =>{
        n.preventDefault();
        this.setState({message:'', success:false})
        if(this.state.address === '' || this.state.address === undefined){
            this.setState({message:'Address is required'})
            return
        }
       else if(this.state.phone === '' || this.state.phone === undefined){
            this.setState({message:'Phone Number is required'})
            return
        }
       else if( this.state.dob === '' || this.state.dob === undefined){
            this.setState({ message:'Date of birth is required'})
            return
        }
       else if( this.state.gender === '' || this.state.gender === undefined){
            this.setState({ message:'Gender is required' })
            return
        }
        else if( this.state.bio === '' || this.state.bio === undefined){
            this.setState({ message:'Bio is required'})
            return
        }
        this.setState({loading:true})
        const data = {
            phone:this.state.phone,
            address:this.state.address,
            bio:this.state.bio,
            linkedin:this.state.linkedin,
            facebook:this.state.facebook,
            dob:this.state.dob,
            gender:this.state.gender
        }
        updateHost(data, this.props.user.id)
        .then((user)=>{
            this.setState({loading:false,success:true, message:'Profile has been updated'})
            this.props.setUser(user)
            this.props.history.push('/app/profile')
        })
        .catch((e)=>{
            this.setState({loading:false,success:false, message:'Oops! failed to complete the operation. Please try again.'}) 
        })
        // axios.post(`${api}/profile`,data,{headers:headers})
        // .then(res=>{
        //     document.querySelector('.hide').style.display ="block"
        //     //this.setState({user:res.data.user})
        // })
    }

    render(){
        return (
            <>
               
                <Backend>
                    <AppHeader/>
                    <EditProfileDom state={this.state} onSubmit={this.onSubmit} user={this.props.user} env={this.props.env} handleClick={this.handleClick} changeHandler={this.changeHandler} handleCloseSnackBar={this.handleCloseSnackBar} />
                </Backend>
            </>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user,
    env:state.env
})
const mapDispatchToProps=dispatch=>({
    setUser:(payload)=>dispatch(setUser(payload))
})
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(EditProfile));