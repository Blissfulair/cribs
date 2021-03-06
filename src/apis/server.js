
export const checkLoggedIn = async () => {
    const [response] = await Promise.all([
                                        fetch(process.env.REACT_APP_BACKEND_URL+'/api/user/auth')
                                        ])

    const { user } = await response.json();
    if(user === undefined)
    return null
    if (user)
    return user;
    return null
  };

  export const registerUser = async (data) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/user/register',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  user= await response.json();
    return user;
  };

  export const loginUser = async (data) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/user/login',{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  user= await response.json();
    return user;
  };
  //logout
  export const signOut = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/user/logout',{method:"DELETE"});
    const  user  = await response.json();

    if (user)
    return null
  };
  export const verifyEmail = async (token) => {
    const response = await fetch(`/user/verify?token=${token}`);
    const  user = await response.json();

    if (user)
    return user;
  };
  export const makeHost = async (id) => {
    const response = await fetch(`/api/user/make_host/${id}`);
    const  user = await response.json();

    if (user)
    return user;
  };
  export const changeRole = async (id, data) => {
    const response = await fetch(`/api/user/change_role/${id}`,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  user = await response.json();

    if (user)
    return user;
  };


  //property
  export const addProperty = async (data) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/property/add_property',{
      method:'POST',
      body:data,
      // headers:{
      //   'Content-Type':'multipart/form-data'
      // }
    });
    const  user= await response.json();
    return user;
  };

  export const editProperty = async (data,id) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/property/edit_property/'+id,{
      method:'PATCH',
      body:data,
      // headers:{
      //   'Content-Type':'multipart/form-data'
      // }
    });
    const  user= await response.json();
    return user;
  };

  export const getProperties = async (id) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/property/properties/'+id);
    const  properties= await response.json();
    return properties.properties;
  };

  export const propertyTypes = async () => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/property/types');

    const { types } = await response.json();
    return types
  };
  export const getTrendingAndBestCribs = async () => {
    const [trending_crib, best_crib] = await Promise.all([
      fetch(process.env.REACT_APP_BACKEND_URL+'/api/property/trending_cribs'),
      fetch(process.env.REACT_APP_BACKEND_URL+'/api/property/best_cribs')
    ]);
    const  [trending_cribs, best_cribs]= await Promise.all([
      trending_crib.json(),
      best_crib.json()
    ]);
    return {trending_cribs:trending_cribs.trending, best_cribs:best_cribs.best};
  };
  export const getCribById = async (id) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/property/property/'+id);

    const { property } = await response.json();
    return property
  };


  export const reserveCrib = async (data, id) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/property/book/'+id,{
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  {transaction}= await response.json();
    return transaction;
  };



  export const updateHost = async (data, id) => {
    const response = await fetch(`/api/user/host_profile/${id}`,{
      method:'PATCH',
      body:JSON.stringify(data),
      headers:{
        'Content-Type':'application/json'
      }
    });
    const  user = await response.json();
    console.log(user)
    if (user)
    return user;
  };

  export const deleteProperty = async (id) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/property/delete_property/'+id,{method:"DELETE"});
    return await response.json();
  };

  export const searchProperties = async (data) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/property/search_property', {
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    });

    const { properties } = await response.json();
    return properties
  };

  export const getHistoriesByUserId = async (id) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/user/history/'+id);

    const { histories } = await response.json();
    return histories
  };

  export const deleteHistory = async (data) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/user/delete_history', {
      method:'DELETE',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const { message } = await response.json();
    return message
  }

  export const getFavourite = async (data) => {
    const response = await fetch(process.env.REACT_APP_BACKEND_URL+'/api/user/favourites', {
      method:'POST',
      body:JSON.stringify(data),
      headers:{
        "Content-Type":"application/json"
      }
    })
    const { favourites } = await response.json();
    return favourites
  }