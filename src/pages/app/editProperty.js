import React from "react";
import "./inbox.css"
import "./properties.css"
import "./add-property.css"
import image from  "../../images/placeholder.jpg"
import {Snackbar, Slide, NativeSelect } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import Backend from "./layout"
import AppContext from "../../state/context";
import Activity from '../../components/activity'
import firebase from "../../components/firebase"
import {withRouter} from "react-router-dom"
import {states} from "../../icons/options"
import {CircularProgress} from "@material-ui/core"

const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }

class EditProperty extends React.Component{
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
            parking:0,
            wifi:0,
            smoking:0,
            cable:0,
            jaccuzi:0,
            kitchen:0,
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
            isLoading:true,
            images:[],
            hostId:'',
            id:'',
            sideLoading:false
        }
    }

    componentDidMount(){
        const dom = document.querySelector('#properties')
        if(dom !== null)
        dom.setAttribute('class', 'is-active')
        const id = this.props.location.pathname.split('edit-property')[1]
        firebase.getHostPropertyById(id)
        .then(data=>{
            data.onSnapshot(res=>{
                const property = res.data()
                console.log(res.data())
                this.setState({
                    state:property.state,
                    city:property.city,
                    title:property.name,
                    description:property.description,
                    house:property.house,
                    address:property.address,
                    price:property.amount,
                    bedroom:property.bedroom,
                    bathroom:property.bathroom,
                    parking:property.parking,
                    wifi:property.wifi,
                    smoking:property.smoke,
                    cable:property.cable,
                    kitchen:property.kitchen,
                    inside:property.inside,
                    around:property.around,
                    guest:property.guest,
                    featured_image:property.featuredImage,
                    type:property.type,
                    other_images:property.images,
                    isLoading:false,
                    id:id,
                    hostId:property.hostId,
                })
            })
     
        })

    }


    uploadImage = (e)=>{

        let image = e.target.files[0];
        this.setState({featured_image:image})
        const data = {
            hostId:this.state.hostId,
            id:this.state.id,
            featuredImage:image
        }
        let reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onload = (e)=>{
            document.getElementById('img').setAttribute('src', reader.result);

            firebase.uploadImagesOnProp(data);
        }
    }
    uploadImages = (e)=>{
        this.setState({sideLoading:true})
        const data = {
            id:this.state.id,
            hostId:this.state.hostId,
            images:this.state.other_images,
            image:e.target.files[0]
        }
        firebase.uploadImagesOnPropSideView(data)
        .then(()=>{
            this.setState({sideLoading:false})
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
    deleteImage=(e)=>{

        let img = e.target.previousElementSibling.currentSrc;
        const data = {
            id:this.state.id,
            images:this.state.other_images,
            url:img
        }
        firebase.deleteUploadedImage(data)
    }


    changeHandler =(e)=>{
        const name = e.target.name;
        this.setState({[name]:e.target.value})

    }
    changeType =(e)=>{
        const name = e.target.name;
        if(e.target.checked)
        this.setState({[name]:1})
        else
        this.setState({[name]:0})
    }
    maxStringLength = (event,leng = 80)=>{
        const value = event.target.value;
        if(value.length > leng){
            event.target.value = value.substr(0, leng);
        }
        const str = leng - value.length ;
        event.target.nextElementSibling.innerHTML = str < 0 ? 0 + " Characters Left" :str + " Characters Left";
      }


    onSubmit=(event)=>{
        event.preventDefault();
        const id = this.props.location.pathname.split('edit-property')[1].replace('/','')
        if(this.state.title === '' || this.state.description === '' || this.state.state === ''
           || this.state.price === '' || this.state.featured_image === null)
           {
            this.setState({message:'All fields must be filled'})
            return false
           }
    this.setState({message:'', success:false, isLoading:true})
const body = {
    name:this.state.title,
    description:this.state.description,
    amount:this.state.price,
    bedroom:this.state.bedroom,
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
}
firebase.updateProperty(id,body)
.then(()=>{
    this.setState({
       
        success:true,
        message:'Submitted successfully',
        isLoading:false
    })
     })
     .catch(err=>{
         console.log(err)
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
                                <h4>Edit Property</h4>
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
                                <input type="text" onChange={this.changeHandler} defaultValue={this.state.title} onKeyUp={event=>{this.maxStringLength(event,25)}} name="title" id="title" placeholder="E.g: One Bedroom Flat" />
                                <p>25 Characters</p>
                            </div>
                            <div className="property-group">
                                <label htmlFor="desc">Description</label>
                                <textarea name="description" defaultValue={this.state.description}  onKeyUp={event=>{this.maxStringLength(event,500)}} onBlur={event=>{this.maxStringLength(event,240)}} onChange={this.changeHandler} id="desc" cols="30" rows="10" />
                                <p>500 Characters</p>
                            </div>


                            <div className="property-group">
                                <h3>Property Informaion</h3>
                                <div className="property-group-inner">
                                    <div className="col">
                                        <label htmlFor="state">State</label>
                                        <div className="input">
                                            <NativeSelect 
                                            value={this.state.state}
                                            className="input-edit-property"
                                            onChange={this.changeHandler}
                                            inputProps={{
                                                name: 'state',
                                                id:'state'
                                            }}
                                            >
                                                <option value="">Select State</option>
                                                {
                                                    states.map((state, i)=>{
                                                        return (
                                                        <option key={i} value={state}>{state}</option>
                                                        )
                                                    })
                                                }
                                            </NativeSelect>
                                            <span>
                                                <div className="angle"></div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="city">City</label>
                                        <div className="input">
                                            <input defaultValue={this.state.city} placeholder="Eg Benin" name="city" onChange={this.changeHandler}  id="city"/>
                                            <span>
                                                <div className="angle"></div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="cat">Address</label>
                                        <div className="input">
                                            <input type="text" onChange={this.changeHandler} defaultValue={this.state.address}   id="cat" name="address" placeholder="45, Benin/Agbor Road" />
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
                                    <div className="col">
                                        <label htmlFor="guest">Guest</label>
                                        <div className="input">
                                            <input type="text" defaultValue={this.state.guest}  onChange={this.changeHandler}  name="guest" id="guest" placeholder="E.g 1" />
                                            <span><div className="angle"></div></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="price">Price</label>
                                        <div className="input">
                                            <input type="text" defaultValue={this.state.price}  onChange={this.changeHandler}  name="price" id="price" placeholder="E.g 100000" />
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
                                            <NativeSelect
                                                value={this.state.bedroom}
                                                className="input-edit-property"
                                                onChange={this.changeHandler}
                                                inputProps={{
                                                    name: 'bedroom',
                                                    id:'bedroom'
                                                }}
                                                >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </NativeSelect>
                                            <span>
                                                <div className="angle"></div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="bathroom">Bathroom</label>
                                        <div className="input">
                                            <NativeSelect
                                                value={this.state.bathroom}
                                                className="input-edit-property"
                                                onChange={this.changeHandler}
                                                inputProps={{
                                                    name: 'bathroom',
                                                    id:'bathroom'
                                                }}
                                                >
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </NativeSelect>
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
                                                <input  type="checkbox" checked={this.state.wifi}  onChange={this.changeType}  name="wifi" id="pool" />
                                                   
                                                <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="pool">Wifi</label>
                                    </div>
                                    <div className="col">
                                        <label className="rememberme">
                                                <input type="checkbox" checked={this.state.parking}  onChange={this.changeType}  name="parking" id="smoking" />

                                                <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="smoking">parking</label>
                                    </div>
                                    <div className="col">
                                        <label className="rememberme">
                                                <input type="checkbox"  checked={this.state.smoking}   onChange={this.changeType}  name="smoking" id="jaccuzi" />

                                                <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="jaccuzi">Smoke Alarm</label>
                                    </div>
                                    <div className="col">
                                        <label className="rememberme">
                                            <input type="checkbox" checked={this.state.cable}  onChange={this.changeType}  name="cable" id="water" />

                                            <span className="checkmark"></span>
                                        </label>
                                        <label htmlFor="water">Cable Tv</label>
                                    </div>
                                    <div className="col">
                                        <label className="rememberme">
                                            <input type="checkbox" checked={this.state.kitchen}  onChange={this.changeType}  name="kitchen" id="kitchen" />

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
                                                {
                                                    this.state.type === 'house'?
                                                    <input type="radio" onChange={this.changeHandler} defaultChecked defaultValue="house"  name="type" id="house" />
                                                    :
                                                    <input type="radio" onChange={this.changeHandler}  defaultValue="house"  name="type" id="house" />
                                                }
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="house">House</label>
                                        </li>

                                        <li>
                                            <label className="radio">
                                                {
                                                    this.state.type === 'duplex'?
                                                    <input type="radio" onChange={this.changeHandler} defaultValue="duplex" defaultChecked  name="type" id="apartment" />
                                                    :
                                                    <input type="radio" onChange={this.changeHandler} defaultValue="duplex"  name="type" id="apartment" />
                                                }
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="apartment">Duplex</label>
                                        </li>

                                        <li>
                                            <label className="radio">
                                                {
                                                    this.state.type === 'flat'?
                                                    <input type="radio" onChange={this.changeHandler} defaultValue="flat" defaultChecked name="type" id="condos" />
                                                    :
                                                    <input type="radio" onChange={this.changeHandler} defaultValue="flat" name="type" id="condos" />
                                                }
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="condos">Flat</label>
                                        </li>
                                        <li>
                                            <label className="radio">
                                                {
                                                    this.state.type === 'bungalow'?
                                                    <input type="radio" onChange={this.changeHandler} defaultChecked defaultValue="bungalow" name="type" id="bungalows" />
                                                    :
                                                    <input type="radio" onChange={this.changeHandler} defaultValue="bungalow" name="type" id="bungalows" />
                                                }
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="bungalows">Bungalow</label>
                                        </li>
                                        <li>
                                            <label className="radio">
                                                {
                                                    this.state.type === 'hotel'?
                                                    <input type="radio" onChange={this.changeHandler} defaultChecked defaultValue="hotel" name="type" id="hotel" />
                                                    :
                                                    <input type="radio" onChange={this.changeHandler} defaultValue="hotel" name="type" id="hotel" />
                                                }
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="hotel">Hotel</label>
                                        </li>
                                        <li>
                                            <label className="radio">
                                                {
                                                    this.state.type === 'warehouse'?
                                                    <input type="radio" onChange={this.changeHandler} defaultChecked defaultValue="warehouse" name="type" id="warehouse" />
                                                    :
                                                    <input type="radio" onChange={this.changeHandler} defaultValue="warehouse" name="type" id="warehouse" />
                                                }
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="warehouse">Warehouse</label>
                                        </li>
                                        <li>
                                            <label className="radio">
                                                {
                                                    this.state.type === 'storage'?
                                                    <input type="radio" onChange={this.changeHandler} defaultChecked defaultValue="storage" name="type" id="storage" />
                                                    :
                                                    <input type="radio" onChange={this.changeHandler} defaultValue="storage" name="type" id="storage" />
                                                }
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="storage">Storage</label>
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

                                        <div className="images">
                                            {
                                                this.state.other_images.map((image,i)=>(
                                                    <div key={i} className="viewing">
                                                        <img src={image} alt={`side${i}`} />
                                                        <div onClick={this.deleteImage} aria-hidden="true" ></div>
                                                    </div>
                                                )) 
                                            }
                                            {
                                                this.state.sideLoading&&
                                                <div className="loading">
                                                    <CircularProgress/>
                                                </div>
                                            }
                                        </div>
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
export default withRouter(EditProperty);