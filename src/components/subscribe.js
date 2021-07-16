import React from "react";
import "../scss/footer.scss"
import PropTypes from "prop-types"
const Subscribe = ({onChangeValue, onSubmit})=>{
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
            
            <input onChange={handleChange} required/>
            <label>Email address</label>
            <button>Subscribe</button>
        </form>
    )
}
export default Subscribe;
Subscribe.propTypes = {
    onChangeValue:PropTypes.func,
    onSubmit:PropTypes.func
}

Subscribe.defaultTypes={
    onChangeValue:null,
    onSubmit:null
}