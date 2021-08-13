import React from "react";
import "../scss/footer.scss"
import PropTypes from "prop-types"
const Subscribe = ({onChangeValue, onSubmit, value})=>{
    const handleChange=(e)=>{
            if(onChangeValue)
                onChangeValue(e.target.value)
    }
    const handleSubmit=(e)=>{
        if(onSubmit)
            onSubmit(e)
    }
    return(
        <form onSubmit={handleSubmit} className="subscribe">
            
            <input value={value} onChange={handleChange} placeholder="Email address" required/>
            <label className="sub-label">Email address</label>
            <button>Subscribe</button>
        </form>
    )
}
export default Subscribe;
Subscribe.propTypes = {
    onChangeValue:PropTypes.func,
    onSubmit:PropTypes.func,
    value:PropTypes.string
}

Subscribe.defaultTypes={
    onChangeValue:null,
    onSubmit:null,
    value:""
}