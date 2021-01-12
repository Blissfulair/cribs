import React from "react";
import "../app/inbox.css"
import "../app/properties.css"
import "../app/add-property.css"
import {Snackbar, Slide } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import Backend from "./layout"
import firebase from "../../components/firebase"
import {withRouter} from "react-router-dom"
import AppContext from "../../state/context";
import Activity from "../../components/activity";


const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }

class Amenities extends React.Component{
    static contextType = AppContext
    constructor(props){
        super(props)
        this.state ={
            amenity:'',
            success:false,
            message:'',
            transition:undefined,
            open:false,
            isLoading:false,
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



    changeHandler =(e)=>{
        const name = e.target.name;
        console.log(name)
        this.setState({[name]:e.target.value})
    }




    onSubmit=(event)=>{
        event.preventDefault();
        if(this.state.amenity === ''){
            this.setState({message:'Amenity must not be empty.'})
            return
        }
           this.setState({isLoading:true, message:''})


firebase.addAmenities(this.state.amenity.toLowerCase())
.then(()=>{
    this.setState({
        amenity:'',
        success:true,
        message:'Amenity Added successfully',
        isLoading:false
    })
        this.refs.form.reset();
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
                                <h4>Add Property</h4>
                            </div>
                        </div>

                    </div>

                    {/* <!-- form --> */}
                    <div className="property-form dashboard-mt">
                        <form ref='form' onSubmit={event=>{this.onSubmit(event)}} method="post" encType="multipart/form-data">
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
                                <h3>Amenities</h3>
                                <div style={{gridTemplateColumns:'40% 40%', alignItems:'center'}} className="property-group-inner">
                                    <div className="col">
                                            <div className="input">
                                                <input onChange={this.changeHandler} placeholder="Eg Storage" name="amenity"   />
                                                <span>
                                                    <div className="angle"></div>
                                                </span>
                                            </div>
                                    </div>
                                    <button onClick={this.handleClick(TransitionUp)}>Save and Preview</button>

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
                                    <h3>Type List</h3>
                                    <ul className="prop-type">
                                        {
                                            this.context.state.amenities.length>0?
                                            this.context.state.amenities.map((amenity, i)=>(
                                                <li key={i}>
                                                    <label className="radio">
                                                        <input type="radio" onChange={this.changeHandler}  defaultValue={amenity.name}  name="type" id={amenity.id} />
                                                        <span className="radio-mark"></span>
                                                    </label>
                                                    <label style={{textTransform:'capitalize'}} htmlFor={amenity.id}>{amenity.name}</label>
                                                </li> 
                                            ))
                                            :
                                            null
                                        }
                                    </ul>
                                </div>



                            </div>
                        </form>
                    </div>
                </Backend>
            </>
        )
    }
}
export default withRouter(Amenities);