import React from "react";
import "../signup.css"
import "../login.css"
import {Link} from "react-router-dom"
import {  withStyles,Snackbar, Slide,CircularProgress } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import AppContext from "../../state/context";


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

    static contextType = AppContext
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
            this.context.login(body)
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

    render(){
        return (
            <>
                <div className="label"></div>
                <div className="header-wrap">
                    <div className="signin">
                        <p>Admin Login</p>
                        <ul>
                            {/* <li >
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
                            </li> */}
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
                                <button onClick={this.handleClick(TransitionUp)} className="btn-signup">
                                    {
                                        this.state.loading?
                                       <> <CircularProgress/>  Logging in...</>
                                        :
                                        'Login'
                                        
                                    }
                                    
                                </button>
                                <div className="social-signup">
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}
export default withStyles(styles)(Login);