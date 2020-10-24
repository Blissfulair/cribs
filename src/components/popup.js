import React from 'react'
import {
    Dialog,
    DialogContent,
    Slide,
    DialogTitle,
} from '@material-ui/core';
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
const PopUP = ({open, handleClose, summary})=>{
    return(
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={()=>handleClose()}
        aria-labelledby="detail-title"
        aria-describedby="details"
        >
        <DialogTitle id="detail-title">{"Summary"}</DialogTitle>
        <DialogContent>
            <table>
                <tbody>
                    <tr>
                        <td>
                            <p>Check In</p>
                            <p>Feb 28</p>
                        </td>
                        <td>
                            <p>Check Out</p>
                            <p>Mar 12</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan="2">
                            <p>Guests</p>
                            <p>2 Guests</p>
                        </td>
                    </tr>
                </tbody>
            </table>
        </DialogContent>
    </Dialog>
    )
}
export default PopUP