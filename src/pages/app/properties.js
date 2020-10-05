import React from "react";
import "./inbox.css"
import "./properties.css"
import {Link} from "react-router-dom"
import Layout from "./layout"
class Properties extends React.Component{
    constructor(prop){
        super(prop)
        this.state ={
            property:[],
            properties :[],
            sort:'type',
            asc: 'asc',
            action:''
        }
    }
    componentDidMount(){
    }

    changeHandler =e=>{
        this.setState({[e.target.name]:e.target.value},()=>{this.onActions()})
    }
    sortBy = ()=>{
        // let sort = this.state.properties;
       const {sort,properties,asc} = this.state
       if(asc === 'ascending'){
            if(sort === 'type'){
                properties.sort((a,b)=>{
                    if(a.title.toLowerCase() > b.title.toLowerCase())
                    return 1
                    if(a.title.toLowerCase() < b.title.toLowerCase())
                    return -1
                    return 0;
                })
            }
            else if(sort === 'location'){
                properties.sort((a,b)=>{
                    if(a.address.toLowerCase() > b.address.toLowerCase())
                    return 1
                    if(a.address.toLowerCase() < b.address.toLowerCase())
                    return -1
                    return 0;
                })
                }
                else if(sort === 'price'){
                    properties.sort((a,b)=>{
                        if(a.price > b.price)
                        return 1
                        if(a.price < b.price)
                        return -1
                        return 0;
                    })
                    }
                else if(sort === 'date'){
                    properties.sort((a,b)=>{
                        if(a.created_at > b.created_at)
                        return 1
                        if(a.created_at < b.created_at)
                        return -1
                        return 0;
                    })
                    }
       }
       else if(asc === 'decending'){
        if(sort === 'type'){
            properties.sort((a,b)=>{
                if(a.title.toLowerCase() > b.title.toLowerCase())
                return -1
                if(a.title.toLowerCase() < b.title.toLowerCase())
                return 1
                return 0;
            })
        }
        else if(sort === 'location'){
            properties.sort((a,b)=>{
                if(a.address.toLowerCase() > b.address.toLowerCase())
                return -1
                if(a.address.toLowerCase() < b.address.toLowerCase())
                return 1
                return 0;
            })
            }
            else if(sort === 'price'){
                properties.sort((a,b)=>{
                    if(a.price > b.price)
                    return -1
                    if(a.price < b.price)
                    return 1
                    return 0;
                })
                }
            else if(sort === 'date'){
                properties.sort((a,b)=>{
                    if(a.created_at > b.created_at)
                    return -1
                    if(a.created_at < b.created_at)
                    return 1
                    return 0;
                })
                } 
       }
    
    this.setState({properties:properties})
    }
    onAction = (e)=>{
        if(e.target.value === 'sort'){
            this.sortBy();
        }
    }
    onActions = ()=>{
        if(this.state.action === 'sort')
            this.sortBy();
    }
    onDelete = (id)=>{
    }
    openModal = (e)=>{
        e.preventDefault()
        const modal = e.target.children[0].style.display = 'flex';
        console.log(modal)
    }
    mark = n=>{
        //let properties = this.state.property.push(n.target.dataset[n.target.name]);
        //console.log(properties)
        // this.setState({[n.target.name]: this.state.property.push(n.target.dataset[n.target.name])})
    }
    render(){
        const {properties} = this.state;
        const PropertiesDom = (
            <>
            {properties?properties.map((property,index)=>{
                let tr;
                if(property.status === 0){
                  tr =  (
                        <tr key={index} className="new">
                          <td>
                              <label htmlFor={`row`+index} className="radio">
                                  <input type="checkbox" onChange={this.mark } name="property" data-property={property.id} id={`row`+index} />
                                  <span className="radio-mark"></span>
                              </label>
                          </td>
                          <td>
                              {property.title}
                          </td>
                          <td>
                              {property.address}
                          </td>
                          <td>
                              {property.price}
                          </td>
                          <td>
                              {property.createdAt}
                          </td>
                          <td>
                                  <span className="icon-search"></span>
                                  <span className="icon-delete"></span>
                          </td>
                      </tr>
                      )
                }
                else{
                    tr =  (
                        <tr key={index}>
                          <td>
                              <label htmlFor={`row`+index} className="radio">
                                  <input onChange={this.mark} type="checkbox" name="property" data-property={property.id} id={`row`+index} />
                                  <span className="radio-mark"></span>
                              </label>
                          </td>
                          <td>
                              <Link to={`/edit_property?id=${property.id}`}>{property.title}</Link>
                          </td>
                          <td>
                              <Link to={`/edit_property?id=${property.id}`}>{property.address}</Link>
                          </td>
                          <td>
                              <Link to={`/edit_property?id=${property.id}`}>{property.price}</Link>
                          </td>
                          <td>
                              <Link to={`/edit_property?id=${property.id}`}>{property.createdAt}</Link>
                          </td>
                          <td>
                              <Link to={`/edit_property?id=${property.id}`}>
                                  <span className="icon-search"></span>
                              </Link>
                              <Link onClick={this.openModal} to={`/edit_property?id=${property.id}`}>
                                  <span className="icon-delete"></span>
                              </Link>
                          </td>
                      </tr>
                      )
                }
                return tr;
              
            }):''}
            </>
        )
        return (
                <Layout>
                    <div className="inbox">
                        <div className="inbox-head dashboard-mt">
                            <div className="inbox-title">
                                <h4>Uploaded</h4>
                            </div>
                        </div>
                        <div className="table-head">
                            <div className="property-filter">
                                <div className="action">
                                    <select onChange={(e)=>{this.onAction(e); this.changeHandler(e)}} onBlur={this.onAction} name="action">
                                        <option value="">Action</option>
                                        <option value="sort">Sort</option>
                                        <option value="activate">Activate</option>
                                        <option value="deactivate">Deactivate</option>
                                        
                                    </select>
                                    <span></span>
                                </div>
                                <div className="sort">
                                    <select onChange={(e)=>{this.changeHandler(e)}} onBlur={this.changeHandler} name="sort" id="">
                                        <option value="">Sort by</option>
                                        <option value="type">Type</option>
                                        <option value="location">Location</option>
                                        <option value="price">Price</option>
                                        <option value="date">Date</option>
                                    </select>
                                </div>
                                <div className="sort">
                                    <select onBlur={this.changeHandler} onChange={this.changeHandler} name="asc" id="">
                                        <option value="">Select</option>
                                        <option value="ascending">Ascending</option>
                                        <option value="decending">Decending</option>
                                    </select>
                                </div>
                                <div className="add-property">
                                    <Link id="add" to="/add_property">Add Property <span className="add-icon"></span></Link>
                                </div>
                            </div>
                        </div>
                        <div className="table-head">
                            <ul className="table-title">
                                <li>
                                    <label htmlFor="all" className="radio">
                                        <input type="checkbox" name="" id="all" />
                                        <span className="radio-mark"></span>
                                    </label>
                                </li>
                                <li>
                                    Type
                                </li>
                                <li>Location</li>
                                <li>
                                    Price
                                </li>
                                <li>Date Added</li>
                            </ul>
                        </div>
                        <div className="inbox-body property-bod">
                            <table>
                                <tbody>
                                   {PropertiesDom}
                                </tbody>
                            </table>
                        </div>
                    </div> 
                </Layout>
        )
    }
}
export default Properties;