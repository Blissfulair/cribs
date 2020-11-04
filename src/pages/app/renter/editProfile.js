import React from "react";
import "./../inbox.css"
import "./../properties.css"
import "./../add-property.css"
import "./../profile.css"
import AppContext from "../../../state/context";
import { NativeSelect, Button,Snackbar, Slide, Grid } from "@material-ui/core";
import Activity from "../../../components/activity"
import {Alert} from "@material-ui/lab"
import {withRouter} from "react-router-dom"

const EditProfileDom = ({state, handleCloseSnackBar, context, changeHandler,onSubmit,handleClick})=>{
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
                                    <td>Address:</td>
                                        <td><input onChange={(e)=>changeHandler(e)} name="address" defaultValue={context.state.userData.address?context.state.userData.address:''} /></td>
                                    </tr>
                                    <tr>
                                        <td>Phone:</td>
                                        <td>
                                            <img alt="flag" src={`https://www.countryflags.io/${context.state.env?context.state.env.country_code.toLowerCase():'us'}/shiny/32.png`}/>
                                            <input type="text" onChange={(e)=>changeHandler(e)} name="phone" defaultValue={context.state.userData.phone?context.state.userData.phone:context.state.env.country_calling_code} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Facebook:</td>
                                        <td>
                                            <input type="text" onChange={(e)=>changeHandler(e)} name="facebook" defaultValue={context.state.userData.facebook?context.state.userData.facebook:''} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>LinkedIn:</td>
                                        <td>
                                            <input type="text" onChange={(e)=>changeHandler(e)} name="linkedin" defaultValue={context.state.userData.linkedin?context.state.userData.linkedin:''} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Date of Birth:</td>
                                        <td>
                                            <input type="text" onChange={(e)=>changeHandler(e)} name="dob" defaultValue={context.state.userData.dob?context.state.userData.dob:''} />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Gender:</td>
                                        <td>
                                            <NativeSelect defaultValue={context.state.userData.gender?context.state.userData.gender:''} onBlur={changeHandler} name="gender" id="">
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                            </NativeSelect>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Bio:</td>
                                        <td>
                                            <textarea onChange={(e)=>changeHandler(e)} defaultValue={context.state.userData.bio?context.state.userData.bio:''} name="bio"  />
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
    static contextType =AppContext
    constructor(props){
        super(props);
        this.state = {
            phone:'',
            address:'',
            linkedin:'',
            gender:'',
            facebook:'',
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
            phone:this.context.state.userData.phone,
            address:this.context.state.userData.address,
            bio:this.context.state.userData.bio,
            linkedin:this.context.state.userData.linkedin,
            facebook:this.context.state.userData.facebook,
            dob:this.context.state.userData.dob,
            gender:this.context.state.userData.gender
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
        if(this.state.phone === '' || this.state.address === '' || this.state.bio === '' || this.state.dob === '' || this.state.gender === ''){
            this.setState({
                message:'All fields are required. Please fill and try again'
            })
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
        this.context.updateProfile(data)
        .then(()=>{
            this.setState({loading:false,success:true, message:'Profile has been updated'})
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
                    <Grid container justify="center">
                        <Grid item md={11}>
                            <Grid container>
                                <EditProfileDom state={this.state} onSubmit={this.onSubmit} context={this.context} handleClick={this.handleClick} changeHandler={this.changeHandler} handleCloseSnackBar={this.handleCloseSnackBar} />
                            </Grid>
                        </Grid>
                    </Grid>
            </>
        )
    }
}
export default withRouter(EditProfile);