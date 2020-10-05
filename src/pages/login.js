import React from "react";
import "./signup.css"
import "./login.css"
import {Link} from "react-router-dom"
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import { Button ,withStyles,Snackbar, Slide } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import firebase from "../components/firebase"
import Activity from "../components/activity"

const styles = ()=>({
    label:{
        textTransform:'capitalize',
        padding:0,
        lineHeight:0
    },
    check:{
        borderColor:'#DCDCDC'
    }
})
const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }
class Login extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            username:'',
            password:'',
            remember:false,
            err:'',
            token:'',
            type:false,
            loading:false,
            transition:undefined,
            open:false
        }
    }


    changeHandler = (e)=>{
        const name = e.target.name;
        this.setState({[name]:e.target.value})
        }
    handleClick = (Transition) => () => {
        this.setState({transition:Transition, open:true})
        };
    handleCloseSnackBar = (event,reason) => {
        if (reason === 'clickaway') {
            return;
          }
        this.setState({open:false})
        };
    
    onSubmit =(event)=>{
        event.preventDefault()
        if(this.state.username === '')
            this.setState({err:'Email is required'})
        else if(this.state.password === '')
            this.setState({err:"Password is required"})
        else{
            if(this.state.remember === 'on')
                this.setState({remember:true})
            this.setState({err:'',loading:true})
            const body = {
                email: this.state.username,
                password:this.state.password,
                remember:this.state.remember
            }
            firebase.login(body)
            .then(()=>{
                this.setState({loading:false})
            })
            .catch((err)=>[
                this.setState({
                    loading:false, 
                    err:err.code==='auth/network-request-failed'?'Please check your network connection and try again.':
                    err.code
                })
            ])
            
        }

    }

    moveLabel = (e)=>{
        e.target.previousElementSibling.style.top = '20%'
        e.target.previousElementSibling.style.fontSize = '12px'
    }

    moveLabelBk = (e)=>{
        if(e.target.value === '')
        {
            e.target.previousElementSibling.style.top = '50%'
            e.target.previousElementSibling.style.fontSize = '16px'
        }
    }

    toggleLogin = ()=>{
        this.setState({type: !this.state.type})
    }

    render(){
        return (
            <>
                <Activity loading={this.state.loading} />
                <div className="label"></div>
                <div className="header-wrap">
                    <div className="signin">
                        <p>Sign in to get started</p>
                        <ul>
                            <li >
                                <Button classes={{root:this.props.classes.label}} onClick={this.toggleLogin}>
                                    <span style={{color:!this.state.type?'#00ADCB':'#DCDCDC'}}>Renting</span>
                                </Button>
                            </li>
                            <li className="line"></li>
                            <li>
                                <Button classes={{root:this.props.classes.label}}  onClick={this.toggleLogin}>
                                    <span style={{color:this.state.type?'#00ADCB':'#DCDCDC'}}>
                                    Hosting
                                    </span>
                                </Button>
                            </li>
                        </ul>
                        <div className="form">
                            {
                                this.state.err&&
                                <Snackbar
                                open={this.state.open}
                                onClose={this.handleCloseSnackBar}
                                TransitionComponent={this.state.transition}
                                anchorOrigin={{vertical:'top',horizontal:'right'}}
                                autoHideDuration={5000}
                                key={this.state.transition ? this.state.transition.name : ''}
                                >
                                    <Alert variant="filled" severity="error">{this.state.err}</Alert>
                                </Snackbar>
                            }
                        {/* <p className="error">{this.state.err}</p> */}
                            <form onSubmit={event=>{
                                this.onSubmit(event)
                            }} method="post">
                                <label htmlFor="username">Email</label>
                                <div className="form-groups">
                                    <div className="input">
                                        <input type="text" name="username" onChange={this.changeHandler} placeholder="name@email.com" id="username" />
                                    </div>
                                    <span className="icon-checkmark"></span>
                                </div>
                                <label htmlFor="password">Password</label>
                                <div className="form-groups">
                                   
                                    <div className="input">
                                        <input name="password" type="password" placeholder="Enter a strong password" onChange={this.changeHandler}  id="password" />
                                    </div>
                                    <span className="icon-checkmark"></span>
                                </div>
                                <div className="form-check">
                                    <FormControlLabel
                                            control={<Checkbox id="remember" onChange={()=>this.setState({remember: !this.state.remember})} classes={{root:this.props.classes.check}} name="remember"/>}
                                            label="keep me logged me"
                                        />
                                    <Link to="/forgot">Forgot Password?</Link>
                                </div>
                                <button onClick={this.handleClick(TransitionUp)} className="btn-signup">Login</button>
                                <div className="social-signup">
                                    <a href="https://www.facebook.com" className="col">
                                        <FacebookIcon/>
                                    </a>
                                    <a href="https://www.plus.google.com" className="col">
                                        <div>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="34.682" height="34.682" viewBox="0 0 34.682 34.682"><defs><style></style></defs><path className="a" d="M7.686,149.861l-1.207,4.507-4.412.093a17.371,17.371,0,0,1-.128-16.193h0l3.928.72,1.721,3.9a10.349,10.349,0,0,0,.1,6.968Z" transform="translate(0 -128.902)"/><path className="b" d="M278.285,208.176a17.334,17.334,0,0,1-6.182,16.762h0l-4.948-.252-.7-4.371a10.335,10.335,0,0,0,4.447-5.277h-9.273v-6.86h16.657Z" transform="translate(-243.906 -194.075)"/><path className="c" d="M56.638,319.313h0a17.346,17.346,0,0,1-26.13-5.305l5.62-4.6a10.313,10.313,0,0,0,14.862,5.28Z" transform="translate(-28.442 -288.45)"/><path className="d" d="M55.094,3.992l-5.618,4.6a10.312,10.312,0,0,0-15.2,5.4L28.625,9.366h0a17.344,17.344,0,0,1,26.47-5.374Z" transform="translate(-26.685)"/></svg>
                                        </div>
                                    </a>
                                    <a href="https://www.twitter.com" className="col">
                                        <TwitterIcon/>
                                    </a>
                                </div>
                                <p>Don't have an account? <Link to="/register">Signup here</Link></p>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default withStyles(styles)(Login);