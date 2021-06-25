import React from "react";
import "./inbox.css"
import "./properties.css"
import "./add-property.css"
import image from  "../../images/placeholder.jpg"
import {Snackbar, Slide } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import Backend from "./layout"
import AppHeader from "../../components/appHeader";
import Activity from '../../components/activity'
import {states} from "../../icons/options"
import {withRouter} from "react-router-dom"
import { connect } from "react-redux";
import { addProperty, propertyTypes } from "../../apis/server";
import { setPropertyTypes } from "../../state/actions";


const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }
let images =[]
let other_images =[]
class AddProperty extends React.Component{
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
            jaccuzi:false,
            kitchen:false,
            inside:'',
            around:'',
            guest:1,
            featured_image:null,
            type:'',
            other_images:[],
            success:false,
            message:'',
            transition:undefined,
            open:false,
            isLoading:false,
            status:false,
            rooms:[{room:'', price:'',bed:1,bathroom:0,bookedDates:[]}]
        }
    }

    componentDidMount(){
        const dom = document.querySelector('#properties');
        if(dom !== null)
        dom.setAttribute('class', 'is-active')
        
        propertyTypes()
        .then(types=>{
            this.props.setPropertyTypes(types)
        })
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
        this.setState({[name]:true})
    }
    maxStringLength = (event,leng = 80)=>{
        const value = event.target.value;
        if(value.length > leng){
            event.target.value = value.substr(0, leng);
        }
        const str = leng - value.length ;
        event.target.nextElementSibling.innerHTML = str < 0 ? 0 + " Characters Left" :str + " Characters Left";
      }
    getLocation = async(address)=>{

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

    onAdd=()=>{
        let add = this.state.rooms;
        add.push({room:'', price:'',bed:1, bathroom:0, bookedDates:[]});
        
        this.setState({rooms:add})
    }
    remove=(id)=>{
       this.state.rooms.splice(id,1)
        // console.log(rooms)
        // console.log(this.state.rooms)
        // // console.log(this.state.rooms[id])
        this.setState({rooms:this.state.rooms})
    }
    onAddRoom = (e, i)=>{
        const rooms = [...this.state.rooms]
        rooms[i].room = e.target.value;
        this.setState({rooms:rooms}) 
    }
    onAddBed = (e, i)=>{
        const rooms = [...this.state.rooms]
        rooms[i].bed = e.target.value;
        this.setState({rooms:rooms}) 
    }
    onAddBathRoom = (e, i)=>{
        const rooms = [...this.state.rooms]
        rooms[i].bathroom = e.target.value;
        this.setState({rooms:rooms}) 
    }
    onAddPrice = (e, i)=>{
        
        const rooms = [...this.state.rooms]
        let pric = Number(e.target.value)
        rooms[i].price = pric;

        this.setState({rooms:rooms}) 
    }
    onInput(e){
        e.target.value = e.target.value.replace(/[^0-9]/g, '')
    }
    onInputAmount(e){
        e.target.value = e.target.value.replace(/[^0-9.]/g, '').replace(/(\..*)\./g,'$1')
    }
    onSubmit=(event)=>{
        event.preventDefault();
        // if(!this.props.user.phone){
        //     this.setState({message:'Profile must be updated before you can publish a crib.', status:true})
        //     return
        // }
        if(this.state.title === '' || this.state.description === '' || this.state.state === ''
           || this.state.rooms[0].price === '' || this.state.rooms[0].room === '' || this.state.featured_image === null || this.state.guest<1 || other_images.length<1)
           {
            this.setState({message:'All fields must be filled'})
            return false
           }
           this.setState({isLoading:true, message:''})
    let amount = 0
    let bathroom = 0
    let bed = 0
    this.state.rooms.forEach(room=>{
        amount += room.price
        bathroom += room.bathroom
        bed += room.bed
    })
    const formData = new FormData();
    formData.append('hostId', this.props.user.id)
    formData.append('name', this.state.title)
    formData.append('description', this.state.description)
    formData.append('featuredImage', this.state.featured_image)
    console.log(other_images)
    Array.from(other_images).forEach(image => {
        formData.append("images", image);
    });
    formData.append('amount', amount)
    formData.append('bedroom', bed)
    formData.append('discount', this.state.discount)
    formData.append('smoke', this.state.smoking)
    formData.append('wifi', this.state.wifi)
    formData.append('parking', this.state.parking)
    formData.append('cable', this.state.cable)
    formData.append('bathroom', bathroom)
    formData.append('kitchen', this.state.kitchen)
    formData.append('address', this.state.address)
    formData.append('guest', this.state.guest)
    formData.append('type', 'duplex')
    formData.append('house', this.state.house)
    formData.append('city', this.state.city)
    formData.append('state', this.state.state)
    //formData.append('rooms[]',this.state.rooms)
    formData.append('rooms', JSON.stringify(this.state.rooms))
    formData.append('hostData', JSON.stringify({firstname:this.props.user.firstname,lastname:this.props.user.lastname, image:this.props.user.image,phone:this.props.user.phone,email:this.props.user.email}))
// const body = {

//     kitchen:this.state.kitchen,
//     inside:this.state.inside,
//     around:this.state.around,
//     address:this.state.address,
//     guest:this.state.guest,
//     type:'duplex',//this.state.type !== ''?this.state.type:this.props.amenities[0].name,
//     house:this.state.house,
//     city:this.state.city,
//     state:this.state.state,
//     rooms:this.state.rooms,
//     hostData:{firstname:this.props.user.firstname,lastname:this.props.user.lastname, image:this.props.user.image,phone:this.props.user.phone,email:this.props.user.email}
// }
addProperty(formData)
.then((res)=>{
    this.setState({isLoading:false})
    console.log(res)
})
.catch(e=>{console.log(e)})
// firebase.storeProperty(body)
// .then(()=>{
//     this.setState({
//         title:'',
//         description:'',
//         house:'',
//         address:'',
//         price:'',
//         bedroom:1,
//         discount:0,
//         bathroom:0,
//         parking:false,
//         wifi:false,
//         smoking:false,
//         cable:false,
//         jaccuzi:0,
//         kitchen:false,
//         inside:'',
//         around:'',
//         guest:1,
//         featured_image:null,
//         type:'house',
//         other_images:[],
//         city:'',
//         state:'',
//         success:true,
//         rooms:[{room:'', price:'', bed:1,bathroom:0,bookedDates:[]}],
//         message:'Submitted successfully',
//         isLoading:false
//     })

//         const elements = document.querySelectorAll('.viewing')
//         for(let i =0 ; i< elements.length ; i++){
            
//             elements[i].remove()

//         }
//         this.refs.form.reset();
//      })
//      .catch(err=>{
//          console.log(err)
//          this.setState({message:'Failed to submit', isLoading:false})
//      })

    }
    render(){
        return (
            <>
                <AppHeader/>
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
                        <form  onSubmit={event=>{this.onSubmit(event)}} method="post" encType="multipart/form-data">
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
                                                {
                                                    states.map((state, i)=>{
                                                        return (
                                                        <option key={i} value={state}>{state}</option>
                                                        )
                                                    })
                                                }
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
                                        <label htmlFor="guest">Guest</label>
                                        <div className="input">
                                            <input type="text" onInput={this.onInput.bind()} value={this.state.guest}  onChange={this.changeHandler}  name="guest" id="guest" placeholder="E.g 1" />
                                            <span><div className="angle"></div></span>
                                        </div>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="cat">Address</label>
                                        <div className="input">
                                            <input type="text" onChange={(e)=>{this.changeHandler(e);this.getLocation(e.target.value)}} value={this.state.address}   id="cat" name="address" placeholder="45, Benin/Agbor Road" />
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
                                    </div>
                                </div>
                            </div>

                            <div className="property-group">
                                <div style={{display:'flex', alignItems:'center'}}>
                                    <h3>Add room</h3>
                                    <button className="add-room" style={{marginLeft:10}} onClick={this.onAdd}></button>
                                </div>
                                
                                {
                                    this.state.rooms.length>0&&
                                    this.state.rooms.map((room,i)=>(
                                        <div key={i} className="property-group-inner">
                                        <div className="col">
                                            <label htmlFor="room">Room</label>
                                            <div className="input">
                                                <input defaultValue={room.room} onChange={(e)=>{this.onAddRoom(e, i)}} placeholder="Eg Room 1" name={`room${i}`}   />
                                                <span>
                                                    <div className="angle"></div>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="roomPrice">Room Price</label>
                                            <div className="input">
                                                <input type="text" onInput={this.onInputAmount.bind()} defaultValue={room.price} onChange={(e)=>{this.onAddPrice(e, i)}} placeholder="Eg 2000" name={`roomPrice${i}`}   />
                                                <span>
                                                    <div className="angle"></div>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="numberofbeds">Beds</label>
                                            <div className="input">
                                                <input type="text" onInput={this.onInput.bind()} onChange={(e)=>{this.onAddBed(e, i)}} placeholder="Eg 1" defaultValue={room.bed} name={`numberofbeds${i}`}   />
                                                <span>
                                                    <div className="angle"></div>
                                                </span>
                                            </div>
                                        </div>
                                        <div className="col">
                                            <label htmlFor="bathroom">Bathroom</label>
                                            <div className="input">
                                                <input type="text" onInput={this.onInput.bind()} defaultValue={room.bathroom} onChange={(e)=>{this.onAddBathRoom(e, i)}} placeholder="Eg 0" name={`bathroom${i}`}   />
                                                <span>
                                                    <div className="angle"></div>
                                                </span>
                                            </div>
                                        </div>

                                            <div className="col">
                                            {
                                            i>0&&
                                                <span aria-hidden={true} onClick={()=>this.remove(i)} className='prop-remove'>Remove</span>
                                            }
                                            </div>
                                      
                                    </div>
                                    ))
                                }
                            </div>


                            <div className="property-group">
                                <h3>Amenities</h3>
                                <div className="property-group-inner1">
                                    {/* <div className="col">
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
                                    </div> */}
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
                                        {
                                            this.props.propertyTypes.map((amenity,i)=>(
                                            <li key={i}>
                                                <label className="radio">
                                                    {
                                                        i===0?
                                                        <input type="radio" onChange={this.changeHandler} defaultChecked defaultValue={amenity.name}  name="type" id={amenity._id} />
                                                        :
                                                        <input type="radio" onChange={this.changeHandler}  defaultValue={amenity.name}  name="type" id={amenity._id} />
                                                    }
                                                    <span className="radio-mark"></span>
                                                </label>
                                                <label style={{textTransform:'capitalize'}} htmlFor={amenity._id}>{amenity.name}</label>
                                            </li>
                                            ))
                                        }

                                        {/* <li>
                                            <label className="radio">
                                                <input type="radio" onChange={this.changeHandler} defaultValue="duplex"  name="type" id="apartment" />
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="apartment">Duplex</label>
                                        </li>

                                        <li>
                                            <label className="radio">
                                                <input type="radio" onChange={this.changeHandler} defaultValue="flat" name="type" id="condos" />
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="condos">Flat</label>
                                        </li>
                                        <li>
                                            <label className="radio">
                                                <input type="radio" onChange={this.changeHandler} defaultValue="bungalow" name="type" id="bungalows" />
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="bungalows">Bungalow</label>
                                        </li>
                                        <li>
                                            <label className="radio">
                                                <input type="radio" onChange={this.changeHandler} defaultValue="hotel" name="type" id="hotel" />
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="hotel">Hotel</label>
                                        </li>
                                        <li>
                                            <label className="radio">
                                                <input type="radio" onChange={this.changeHandler} defaultValue="Warehouse" name="type" id="warehouse" />
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="warehouse">Warehouse</label>
                                        </li>
                                        <li>
                                            <label className="radio">
                                                <input type="radio" onChange={this.changeHandler} defaultValue="storage" name="type" id="storage" />
                                                <span className="radio-mark"></span>
                                            </label>
                                            <label htmlFor="storage">Storage</label>
                                        </li> */}
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
                                    {
                                        !this.state.status?
                                        <button onClick={this.handleClick(TransitionUp)}>Save and Preview</button>
                                        :
                                        <button style={{backgroundColor:'green'}} type="button" onClick={()=>this.props.history.push({pathname:'/app/edit-profile',state:{detail:{    name:this.state.title,
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
                                            state:this.state.state
                                            }}})} >Update Profile</button>
                                    }
                                </div>
                            </div>
                        </form>
                    </div>
                </Backend>
            </>
        )
    }
}
const mapStateToProps=state=>({
    user:state.user,
    states:state.states,
    propertyTypes:state.propertyTypes
})
const mapDispatchToProps=dispatch=>({
    setPropertyTypes:(payload) => dispatch(setPropertyTypes(payload))
})
export default connect(mapStateToProps,mapDispatchToProps)(withRouter(AddProperty));