import React from "react";
import "../scss/footer.scss"
const Subscribe = ()=>{
    return(
        <form className="subscribe">
            
            <input required/>
            <label>Email address</label>
            <button>Subscribe</button>
        </form>
    )
}
export default Subscribe;