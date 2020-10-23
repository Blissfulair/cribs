import React from 'react'
import './splash.css'
import {CircularProgress} from "@material-ui/core"

const Activity = ({loading, classes})=>{
    return(
        <>
            {
                loading&&
                <div className="loading">
                    <CircularProgress translate="yes" thickness={5} />
                </div>
            }
        </>
    )
}
export default Activity;