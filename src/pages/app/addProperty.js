import React from "react";
import "./inbox.css"
import "./properties.css"
import "./add-property.css"
import image from  "../../images/login_bg.png"

import Backend from "./layout"
import AppContext from "../../state/context";
import firebase from "../../components/firebase"


let images =[]
let other_images =[]
class AddProperty extends React.Component{
    static contextType = AppContext
    constructor(props){
        super(props)
        this.state ={
            states:[],
            cities:[],
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
            message:''
        }
    }

    componentDidMount(){
        document.querySelector('#properties').setAttribute('class', 'is-active')

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
        event.preventDefault();
        if(this.state.title === '' || this.state.description === '' || this.state.state === ''
           || this.state.price === '' || this.state.featured_image === null)
            return false
const body = {
    hostId:this.context.state.user.uid,
    name:this.state.title,
    description:this.state.description,
    images:[this.state.featured_image, ...other_images],
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
}
firebase.storeProperty(body)
.then(re=>{
})
        // for(let i =0; i<other_images.length; i++){
        //     formData.append('other_images[]', other_images[i])
        // }
    //     const token = isBrowser()?(localStorage.getItem('QRuser')?JSON.parse(localStorage.getItem('QRuser')).token:''):''
    //     const headers = {
    //      'Accept': 'application/json',
    //      'X-Requested-With':'XMLHttpRequest',
    //      'Authorization':'Bearer '+token
    //  }
    //     axios.post(`${api}/property`,formData, {headers:headers})
    //     .then((data)=>{
    //         this.setState({featured_image:null,other_images:[],success:true,message:data.data.message})
    //         other_images = [];
    //         images =[];
    //         navigate(`/preview?${data.data.id}`)
    //     })
    //     .catch((error)=>{
    //         this.setState({success:false})
    //     })
    //     if(this.state.success === true){
    //         const elements = document.querySelector('.images').childNodes
    //         for(let i =0 ; i< elements.length ; i++){
                
    //             elements[i].remove()

    //         }
    //         event.target.reset();
    //     }
    }
    render(){
        return (
            <>
                <Backend>
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
                            <div className="property-group">
                                <label htmlFor="title">Title</label>
                                <input type="text" onChange={this.changeHandler} onKeyUp={event=>{this.maxStringLength(event,25)}} name="title" id="title" placeholder="E.g: One Bedroom Flat" />
                                <p>25 Characters</p>
                            </div>
                            <div className="property-group">
                                <label htmlFor="desc">Description</label>
                                <textarea name="description" onKeyUp={event=>{this.maxStringLength(event,500)}} onBlur={event=>{this.maxStringLength(event,240)}} onChange={this.changeHandler} id="desc" cols="30" rows="10" />
                                <p>500 Characters</p>
                            </div>


                            <div className="property-group">
                                <h3>Property Informaion</h3>
                                <div className="property-group-inner">
                                    {/* <div className="col">
                                        <label htmlFor="state">State</label>
                                        <div className="input">
                                            <select name="state" onBlur={this.changeHandler}  id="state">
                                                <option value="">Select State</option>
                                                {states.length>0?states.map((value,i)=>{
                                                 return  (
                                                        <option key={i} value={value.name}>{value.name}</option>
                                                    )
                                                }):''}
                                            </select>
                                            <span>
                                                <div className="angle"></div>
                                            </span>
                                        </div>
                                    </div> */}
                                    {/* <div className="col">
                                        <label htmlFor="city">City</label>
                                        <div className="input">
                                            <select name="city" onBlur={this.changeHandler}  id="city">
                                                <option value="">Select City</option>
                                                {cities.length>0?cities.map((value,i)=>{
                                                 return  (
                                                        <option key={i} value={value.name}>{value.name}</option>
                                                    )
                                                }):''}
                                            </select>
                                            <span>
                                                <div className="angle"></div>
                                            </span>
                                        </div>
                                    </div> */}
                                    <div className="col">
                                        <label htmlFor="cat">Address</label>
                                        <div className="input">
                                            <input type="text" onChange={this.changeHandler}  id="cat" name="address" placeholder="45, Benin/Agbor Road" />
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
                                            <input type="text" onChange={this.changeHandler}  name="price" id="price" placeholder="E.g 100000" />
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
                                            <select name="bedroom" onBlur={this.changeHandler}  id="bedroom">
                                                <option value="1">1</option>
                                            </select>
                                            <span>
                                                <div className="angle"></div>
                                            </span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="bathroom">Bathroom</label>
                                        <div className="input">
                                            <select name="bathroom" onBlur={this.changeHandler}  id="bathroom">
                                                <option value="1">1</option>
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
                                                <input type="checkbox" onChange={this.changeHandler}  name="wifi" id="pool" />
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

                                <div className="property-group">
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
                                </div>
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
                                            <label htmlFor="apartment">Apartment</label>
                                        </li>

                                        <li>
                                            <label className="radio">
                                                <input type="radio" onChange={this.changeHandler} defaultValue="Detached" name="type" id="detached" />
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="detached">Detached</label>
                                        </li>
                                        <li>
                                            <label className="radio">
                                                <input type="radio" onChange={this.changeHandler} defaultValue="Bungalow" name="type" id="bungalow" />
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="bungalow">Bungalow</label>
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
                                    <button>Save and Preview</button>
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