import React from "react";
import {Link} from "react-router-dom"
import "./../inbox.css"
import "./../properties.css"
import "./../add-property.css"
import "./../profile.css"

import Backend from "./../layout"
import { Grid, Typography,withStyles, IconButton, Avatar } from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import {connect} from "react-redux";
import AppHeader from "../../../components/appHeader"


const ProfileDetails = ({user,uploadImage})=>{
    return(
        <div style={{paddingTop:80}} className="inbox">
        <div className="inbox-head dashboard-mt">
            <div className="inbox-title">
                <h4>Profile</h4>
            </div>
        </div>

        <div className="profile">
            <div className="profile-img">
                {
                    user.image?
                    <img id="img" src={user.image} alt={user.firstname} />
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
                <h4 className="title">{user.firstname + ' '+ user.lastname}</h4>
                <p className="review"> Reviews</p>
                <Grid container alignItems="center">
                    <Typography style={{color:'#00A8C8', fontSize:20, fontWeight:'bold', marginRight:10}}>6.6</Typography>
                    <StyledRating
                        name="rate"
                        defaultValue={5}
                    />
                </Grid>
                <Typography variant="subtitle2" style={{marginTop:12, color:'#00A8C8'}} component="p">Top Host</Typography>

                <Link to="/app/edit-profile">
                    <div className="btn">
                        <IconButton>
                            <EditOutlinedIcon fontSize="small" htmlColor="#fff"/>
                        </IconButton>
                    </div>
                </Link>
            </div>
        </div>


        <div className="profile">
            <div>
                <Typography variant="h5" className="underline-title">Bio</Typography>
                <p>
                    {
                        user.bio?
                        user.bio
                        :'Write something about yourself'
                    }
                </p>
            </div>
            <div className="profile-details">
                <Typography variant="h5" className="underline-title">About</Typography>
                <Typography variant="subtitle1" component="p" style={{color:'#DCDCDC', fontSize:14, marginTop:-5}}>Contact Information</Typography>
                <table>
                    <tbody>
                        <tr>
                            <td>Phone:</td>
                            <td>{user.phone }</td>
                        </tr>
                        <tr>
                            <td>Address:</td>
                            <td>{user.address }</td>
                        </tr>
                        <tr>
                            <td>Email:</td>
                            <td>{user.email }</td>
                        </tr>
                        <tr>
                            <td>Facebook:</td>
                            <td>{user.facebook }</td>
                        </tr>
                        <tr>
                            <td>LinkedIn:</td>
                            <td>{user.linkedin }</td>
                        </tr>
                    </tbody>
                </table>
                <Typography variant="subtitle1" component="p" style={{color:'#DCDCDC', fontSize:14}}>Basic Information</Typography>
                <table>
                    <tbody>
                        <tr>
                            <td>Date of Birth:</td>
                            <td>{user.dob }</td>
                        </tr>
                        <tr>
                            <td>Gender:</td>
                            <td>{user.gender }</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    )
}

const StyledRating = withStyles({
    iconFilled: {
      color: '#FFE600',
    },
    iconHover: {
      color: '#FFE600',
    },
  })(Rating);
class Profile extends React.Component{
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
        //let image = e.target.files[0];
        // this.context.uploadProfilePhoto(image)
        // .then(()=>{
        //     // con
        // })
    }


    render(){
        return (
            <>
                    <AppHeader/>
                    <Backend>
                        <ProfileDetails user={this.props.user} uploadImage={this.uploadImage}/>
                    </Backend>
            </>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user
})
export default connect(mapStateToProps)(Profile);

