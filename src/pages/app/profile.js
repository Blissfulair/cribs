import React from "react";
import {Link} from "react-router-dom"
import "./inbox.css"
import "./properties.css"
import "./add-property.css"
import "./profile.css"

import Backend from "./layout"
import icon from "../../images/login_bg.png"
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
        let image = e.target.files[0];
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e)=>{
            document.getElementById('img').setAttribute('src', reader.result);
        }
    }


    render(){
        return (
            <>
                <Backend>
                    <div className="inbox">
                        <div className="inbox-head dashboard-mt">
                            <div className="inbox-title">
                                <h4>Profile</h4>
                            </div>
                        </div>

                        <div className="profile">
                            <div className="profile-img">
                                <img id="img" src={this.state.avater?this.state.avater:icon} alt="" />
                                <form action="">
                                    <input type="file" onChange={this.uploadImage} name="" id="ig" />
                                    <label htmlFor="ig">
                                        <span className="icon-camera"></span>
                                    </label>
                                </form>
                            </div>
                            <div className="profile-details">
                                <h4>{this.state.user !== null?this.state.user.name:'Tunde Kamor'}</h4>
                                <p>{this.state.location}, Nigeria</p>
                                <ul className="rating">
                                    <li>
                                        <span className="icon-star rated"></span>
                                    </li>
                                    <li>
                                        <span className="icon-star rated"></span>
                                    </li>
                                    <li>
                                        <span className="icon-star rated"></span>
                                    </li>
                                    <li>
                                        <span className="icon-star"></span>
                                    </li>
                                    <li>
                                        <span className="icon-star"></span>
                                    </li>
                                </ul>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Phone:</td>
                                            <td>{this.state.phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Address:</td>
                                            <td>{this.state.address}</td>
                                        </tr>
                                        <tr>
                                            <td>Location:</td>
                                            <td>{this.state.location}</td>
                                        </tr>
                                        <tr>
                                            <td>Email:</td>
                                            <td>tundekamor@gmail.com</td>
                                        </tr>
                                        <tr>
                                            <td>Gender:</td>
                                            <td>{this.state.gender}</td>
                                        </tr>
                                        <tr>
                                            <td>Experience:</td>
                                            <td>{this.state.experience}</td>
                                        </tr>
                                    </tbody>
                                </table>
                                <Link to="/edit_profile">
                                    <div className="btn">
                                        <span className="icon-search"></span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </Backend>
            </>
        )
    }
}
export default Profile;