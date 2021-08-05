import React from "react"
import "./index.scss"
const Table = ({children, className, innerRef})=>{

    return (
        <table ref={innerRef} className={className} id="crib-table">
            {children}
        </table>
    )
}
export default Table

export const TableRow=({children, style, className})=>{
    return(
        <tr style={style} className={className} id="crib-table-row">
            {children}
        </tr>
    )
}
export const TableHead=({children})=>{
    return(
        <thead>
            {children}
        </thead>
    )
}
export const TableBody=({children})=>{
    return(
        <tbody>
            {children}
        </tbody>
    )
}


export const TableCell=({children, ...rest})=>{
    return(
        <td {...rest} className="crib-table-cell">
            {children}
        </td>
    )
}

export const TablePagination=({children})=>{
    return(
        <div className="crib-table-pagination">
            
        </div>
    )
}
