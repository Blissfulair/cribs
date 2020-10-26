import React from "react";
import "./inbox.css"
import "./properties.css"
import "./add-property.css"
import image from  "../../images/login_bg.png"
import {Snackbar, Slide } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import Backend from "./layout"
import AppContext from "../../state/context";
import Activity from '../../components/activity'
import firebase from "../../components/firebase"

const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }
let images =[]
let other_images =[]
class AddProperty extends React.Component{
    static contextType = AppContext
    constructor(props){
        super(props)
        this.state ={
            state:'',
            city:'',
            title:'',
            description:'',
            house:'',
            address:'',
            price:'',
            bedroom:1,
            discount:0,
            bathroom:0,
            parking:false,
            wifi:false,
            smoking:false,
            cable:false,
            jaccuzi:0,
            kitchen:false,
            inside:'',
            around:'',
            guest:0,
            featured_image:null,
            type:'house',
            other_images:[],
            success:false,
            message:'',
            transition:undefined,
            open:false,
            isLoading:false
        }
    }

    componentDidMount(){
        const dom = document.querySelector('#properties');
        if(dom !== null)
        dom.setAttribute('class', 'is-active')

    }

    uploadImage = (e)=>{
        let image = e.target.files[0];
        this.setState({featured_image:image})
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e)=>{
            document.getElementById('img').setAttribute('src', reader.result);
        }
    }
    uploadImages = (e)=>{
        let reader = new FileReader();
        let pic = document.createElement('img');
        let del = document.createElement('div');
        let newEl = document.createElement('div');
        newEl.setAttribute('class', 'viewing')
        other_images.push(e.target.files[0]);
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (e)=>{
            images.push(reader.result)
            pic.setAttribute('src', reader.result);
            newEl.appendChild(pic);
            newEl.appendChild(del);
            document.getElementsByClassName('images')[0].appendChild(newEl);
            document.getElementsByClassName('images')[0].lastChild.lastChild.onclick = (e)=>{
                this.deleteImage(e);
            }
        }
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
    deleteImage(e){
        let img = e.target.previousElementSibling.currentSrc;
        let index = images.findIndex((e)=> e === img);
        if(index >= 0)
        {
            images.splice(index, 1);
            e.target.parentElement.remove();
        }
    }


    changeHandler =(e)=>{
        const name = e.target.name;
        this.setState({[name]:e.target.value})
        if(e.target.value === 'on')
        this.setState({[name]:1})
    }
    maxStringLength = (event,leng = 80)=>{
        const value = event.target.value;
        if(value.length > leng){
            event.target.value = value.substr(0, leng);
        }
        const str = leng - value.length ;
        event.target.nextElementSibling.innerHTML = str < 0 ? 0 + " Characters Left" :str + " Characters Left";
      }
    // onChangeState=e=>{
    //     e.preventDefault();
    //     let val = e.target.value
    //     axios.get(`${api}/cities/${val}`)
    //     .then(resp=>{
    //         let options = resp.data.cities.length > 0?resp.data.cities.map((value,i)=>{
    //             let option = document.createElement('option');
    //             option.setAttribute('value', value.name)
    //             option.innerHTML = value.name
    //             document.querySelector('#city').appendChild(option)
                
    //             return option
    //         }):''
           
    //         this.setState({
    //             cities:resp.data.cities
    //          })
    //     })
    //     .catch(error=>error)
    // }

    onSubmit=(event)=>{
        const form = event
        event.preventDefault();
        if(!this.context.state.userData.status){
            this.setState({message:'Profile must be updated before you can publish a crib.'})
            return
        }
        if(this.state.title === '' || this.state.description === '' || this.state.state === ''
           || this.state.price === '' || this.state.featured_image === null)
           {
            this.setState({message:'All fields must be filled'})
            return false
           }
           this.setState({isLoading:true})
const body = {
    hostId:this.context.state.user.uid,
    name:this.state.title,
    description:this.state.description,
    featuredImage:this.state.featured_image,
    images:[ ...other_images],
    amount:this.state.price,
    bedroom:this.state.bedroom,
    discount:this.state.discount,
    smoke:this.state.smoking,
    wifi:this.state.wifi,
    parking:this.state.parking,
    cable:this.state.cable,
    bathroom:this.state.bathroom,
    kitchen:this.state.kitchen,
    inside:this.state.inside,
    around:this.state.around,
    address:this.state.address,
    guest:this.state.guest,
    type:this.state.type,
    house:this.state.house,
    city:this.state.city,
    state:this.state.state,
    hostData:{firstname:this.context.state.userData.firstname,lastname:this.context.state.userData.lastname, photoURL:this.context.state.photoURL,phone:this.context.state.userData.phone,email:this.context.state.userData.email}
}
firebase.storeProperty(body)
.then(()=>{
    this.setState({
        title:'',
        description:'',
        house:'',
        address:'',
        price:'',
        bedroom:1,
        discount:0,
        bathroom:0,
        parking:false,
        wifi:false,
        smoking:false,
        cable:false,
        jaccuzi:0,
        kitchen:false,
        inside:'',
        around:'',
        guest:0,
        featured_image:null,
        type:'house',
        other_images:[],
        city:'',
        state:'',
        success:true,
        message:'Submitted successfully',
        isLoading:false
    })

        const elements = document.querySelectorAll('.viewing')
        for(let i =0 ; i< elements.length ; i++){
            
            elements[i].remove()

        }
        form.target.reset();
     })
     .catch(err=>{
         this.setState({message:'Failed to submit', isLoading:false})
     })

    }
    render(){
        return (
            <>
                <Backend>
                    <Activity loading={this.state.isLoading}/>
                    <div className="inbox">
                        <div className="inbox-head dashboard-mt">
                            <div className="inbox-title">
                                <h4>Add Property</h4>
                            </div>
                        </div>

                    </div>

                    {/* <!-- form --> */}
                    <div className="property-form dashboard-mt">
                        <form onSubmit={event=>{this.onSubmit(event)}} method="post" encType="multipart/form-data">
                        {
                                this.state.message&&
                                <Snackbar
                                open={this.state.open}
                                onClose={this.handleCloseSnackBar}
                                TransitionComponent={this.state.transition}
                                anchorOrigin={{vertical:'top',horizontal:'right'}}
                                autoHideDuration={5000}
                                key={this.state.transition ? this.state.transition.name : ''}
                                >
                                    <Alert variant="filled" severity={this.state.success?"success":"error"}>{this.state.message}</Alert>
                                </Snackbar>
                            }
                            <div className="property-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" onChange={this.changeHandler} value={this.state.title} onKeyUp={event=>{this.maxStringLength(event,25)}} name="title" id="title" placeholder="E.g: One Bedroom Flat" />
                                <p>25 Characters</p>
                            </div>
                            <div className="property-group">
                                <label htmlFor="desc">Description</label>
                                <textarea name="description" value={this.state.description}  onKeyUp={event=>{this.maxStringLength(event,500)}} onBlur={event=>{this.maxStringLength(event,240)}} onChange={this.changeHandler} id="desc" cols="30" rows="10" />
                                <p>500 Characters</p>
                            </div>


                            <div className="property-group">
                                <h3>Property Informaion</h3>
                                <div className="property-group-inner">
                                    <div className="col">
                                        <label htmlFor="state">State</label>
                                        <div className="input">
                                            <select name="state" onBlur={this.changeHandler}  id="state">
                                                <option value="">Select State</option>
                                                <option value="edo">Edo</option>
                                            </select>
                                            <span>
                                                <div className="angle"></div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="city">City</label>
                                        <div className="input">
                                            <input value={this.state.city} placeholder="Eg Benin" name="city" onChange={this.changeHandler}  id="city"/>
                                            <span>
                                                <div className="angle"></div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="cat">Address</label>
                                        <div className="input">
                                            <input type="text" onChange={this.changeHandler} value={this.state.address}   id="cat" name="address" placeholder="45, Benin/Agbor Road" />
                                            <span><div className="angle"></div></span>
                                        </div>
                                    </div>
                                </div>

                                <div className="property-group-inner">
                                    {/* <div className="col">
                                        <label htmlFor="type">Locality</label>
                                        <div className="input">
                                            <select name="locality" onBlur={this.changeHandler}  id="type">
                                                <option value="">Select Locality</option>
                                                <option value="Egba">Egba</option>
                                                <option value="Ogida">Ogida</option>
                                            </select>
                                            <span><div className="angle"></div></span>
                                        </div>
                                    </div> */}
                                    {/* <div className="col">
                                        <label htmlFor="furnished">Furnished</label>
                                        <div className="input">
                                            <select onBlur={this.changeHandler}  name="furnished" id="furnished">
                                                <option value="any">Any</option>
                                            </select>
                                            <span><div className="angle"></div></span>
                                        </div>
                                    </div> */}
                                    <div className="col">
                                        <label htmlFor="price">Price</label>
                                        <div className="input">
                                            <input type="text" value={this.state.price}  onChange={this.changeHandler}  name="price" id="price" placeholder="E.g 100000" />
                                            <span><div className="angle"></div></span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="property-group">
                                <h3>Amenities</h3>
                                <div className="property-group-inner1">
                                    <div className="col">
                                        <label htmlFor="bedroom">Bedroom</label>
                                        <div className="input">
                                            <select name="bedroom"  onBlur={this.changeHandler}  id="bedroom">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                            <span>
                                                <div className="angle"></div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="bathroom">Bathroom</label>
                                        <div className="input">
                                            <select   name="bathroom" onBlur={this.changeHandler}  id="bathroom">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                            <span><div className="angle"></div></span>
                                        </div>
                                    </div>
                                    {/* <div className="col">
                                        <label htmlFor="toilet">Toilet</label>
                                        
                                        <div className="input">
                                            <select name="toilet" onBlur={this.changeHandler}  id="toilet">
                                                <option value="1">1</option>
                                            </select>
                                            <span><div className="angle"></div></span>
                                        </div>
                                    </div> */}
                                    {/* <div className="col">
                                        <label htmlFor="packing">Parking</label>
                                        <div className="input">
                                            <select name="parking" onBlur={this.changeHandler}  id="packing">
                                                <option value="1">1</option>
                                            </select>
                                            <span><div className="angle"></div></span>
                                        </div>
                                    </div> */}
                                </div>

                                <div className="property-group-inner2">
                                    <div className="col">
                                        <label className="rememberme">
                                                <input  type="checkbox" onChange={this.changeHandler}  name="wifi" id="pool" />
                                                <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="pool">Wifi</label>
                                    </div>
                                    <div className="col">
                                        <label className="rememberme">
                                                <input type="checkbox" onChange={this.changeHandler}  name="parking" id="smoking" />
                                                <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="smoking">parking</label>
                                    </div>
                                    <div className="col">
                                        <label className="rememberme">
                                                <input type="checkbox" onChange={this.changeHandler}  name="smoke" id="jaccuzi" />
                                                <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="jaccuzi">Smoke Alarm</label>
                                    </div>
                                    <div className="col">
                                        <label className="rememberme">
                                            <input type="checkbox" onChange={this.changeHandler}  name="cable" id="water" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="water">Cable Tv</label>
                                    </div>
                                    <div className="col">
                                        <label className="rememberme">
                                            <input type="checkbox" onChange={this.changeHandler}  name="kitchen" id="kitchen" />
                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="kitchen">Kitchen</label>
                                    </div>
                                </div>

                                {/* <div className="property-group">
                                    <h3>Discounts</h3>
                                    <div className="property-group-inner">
                                        <div className="col">
                                            <label htmlFor="discount">Discount</label>
                                            <div className="discount">
                                                <input name="discount" placeholder="E.g:10 or 3.6" onChange={this.changeHandler} id="discount"/>
                                                <span>
                                                    <div className="angle"></div>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div> */}
                                <div className="property-group">
                                    <h3>Type</h3>
                                    <ul className="prop-type">
                                        <li>
                                            <label className="radio">
                                                <input type="radio" onChange={this.changeHandler} defaultChecked defaultValue="house"  name="type" id="house" />
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="house">House</label>
                                        </li>

                                        <li>
                                            <label className="radio">
                                                <input type="radio" onChange={this.changeHandler} defaultValue="Apartment"  name="type" id="apartment" />
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="cottages">Cottages</label>
                                        </li>

                                        <li>
                                            <label className="radio">
                                                <input type="radio" onChange={this.changeHandler} defaultValue="Detached" name="type" id="detached" />
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="condos">Condos</label>
                                        </li>
                                        <li>
                                            <label className="radio">
                                                <input type="radio" onChange={this.changeHandler} defaultValue="Bungalow" name="type" id="bungalow" />
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="bungalows">Bungalows</label>
                                        </li>
                                    </ul>
                                </div>


                                <div className="property-group">
                                    <h3>Pictures</h3>
                                    <div className="featured-image">
                                        <p>Featured Image</p>
                                        <label>
                                            <img id="img" src={this.state.featured_image === null? image: this.state.featured_image} alt="" />  
                                                <input type="file" onChange={this.uploadImage} name="featured" id="image" />
                                        </label>
                                        <label htmlFor="image">Upload Image</label>
                                    </div>
                                    
                                    <div className="other-images">
                                        <label>
                                            <input type="file" name="images" onChange={this.uploadImages} id="images" />
                                            Upload Viewing image
                                            <div className="add-image"></div>
                                        </label>

                                        <div className="images"></div>
                                    </div>
                                </div>

                                <div className="property-group">
                                    <button onClick={this.handleClick(TransitionUp)}>Save and Preview</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </Backend>
            </>
        )
    }
}
export default AddProperty;