import React from "react";
import "./inbox.css"
import "./properties.css"
import "./add-property.css"
import "./setting.css"
import {Snackbar, Slide,Grid } from "@material-ui/core";
import {Alert} from "@material-ui/lab"
import VisibilityIcon from '@material-ui/icons/VisibilityOutlined';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOffOutlined';

import Backend from "./layout"
import { IconButton } from "@material-ui/core";
import AppContext from "../../state/context";
const TransitionUp=(props)=>{
    return <Slide {...props} direction="down" />;
  }
class Setting extends React.Component{
    static contextType = AppContext
    constructor(props){
        super(props)
        this.state ={
            toggle:false,
            old:'',
            password:'',
            confirm_pass:'',
            old_secure:true,
            password_secure:true,
            confirm_secure:true,
            message:'',
            transition:undefined,
            open:false,
            success:false
        }
    }
    changeHandler =(n)=>{
        this.setState({[n.target.name]:n.target.value})
    }
    onSubmit = (e)=>{
        e.preventDefault()
        this.setState({message:'Password Successfully Changed',success:true})
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
    render(){
            const settings=(
                <>
                                    <div style={{paddingTop:46}} className="inbox">
                        <div className="inbox-head dashboard-mt">
                            <div className="inbox-title">
                                <h4>Account Setting</h4>
                            </div>
                        </div>
                        <div className="password-form">
                             <h4>Change Password</h4>
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
                            <form onSubmit={e=>{this.onSubmit(e)}}>
                                <div className="password-group">
                                    <label htmlFor="old">Old Password</label>
                                    <div>
                                        <input type={this.state.old_secure?"password":"text"} id="old" name="old" />
                                        <IconButton onClick={()=>this.setState({old_secure:!this.state.old_secure})}  className="eye">
                                            {
                                                !this.state.old_secure?
                                                <VisibilityOffIcon/>
                                                :
                                                <VisibilityIcon />
                                            }
                                            
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="password-group">
                                    <label htmlFor="new">New Password</label>
                                    <div>
                                        <input type={this.state.password_secure?"password":"text"} id="new" name="password" />
                                        <IconButton onClick={()=>this.setState({password_secure:!this.state.password_secure})} className="eye">
                                            {
                                                !this.state.password_secure?
                                                <VisibilityOffIcon/>
                                                :
                                                <VisibilityIcon />
                                            }
                                        </IconButton>
                                    </div>
                                </div>
                                <div className="password-group">
                                    <label htmlFor="confirm">Re-Type Password</label>
                                    <div>
                                    <input type={this.state.confirm_secure?"password":"text"} id="confirm" name="confirm_pass" />
                                    <IconButton onClick={()=>this.setState({confirm_secure:!this.state.confirm_secure})} className="eye">
                                        {
                                                !this.state.confirm_secure?
                                                <VisibilityOffIcon/>
                                                :
                                                <VisibilityIcon />
                                            }
                                    </IconButton>
                                    </div>
                                </div>
                                <div className="password-group">
                                    <button onClick={this.handleClick(TransitionUp)} className="btn">Save</button>
                                </div>
                            </form>
                        </div>
                        <div className="deactivate">
                            <h4>Deactivate Your Account</h4>
                            <p>
                                Deleting your account means your account will no longer be accessible, you will no longer receive cribs message. Aldo your Username wont be anywhere on cribs. Your profile will soon be deleted.
                                <button>Deactivate Account</button>
                            </p>
                        </div>
                    </div>
                </>
            )
        return (
            <>
                {
                    this.context.state.dashboard?
                    <Grid container justify="center">
                        <Grid item md={11}>
                            <Grid container>
                                {settings}
                            </Grid>
                        </Grid>
                    </Grid>
                    :
                    <Backend>
                        {settings}
                    </Backend>
                }
            </>
        )
    }
}
export default Setting;