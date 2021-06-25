import trending from "../components/trending";

export const checkLoggedIn = async () => {
    const [response] = await Promise.all([
                                        fetch('/api/user/auth')
                                        ])

    const { user } = await response.json();
    if (user)
    return user;
    return null
  };

  export const registerUser = async (data) => {
    const response = await fetch('/api/user/register',{
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
    const response = await fetch('/api/user/login',{
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
    const response = await fetch('/api/user/logout',{method:"DELETE"});
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


  //property
  export const addProperty = async (data) => {
    const response = await fetch('/api/property/add_property',{
      method:'POST',
      body:data,
      // headers:{
      //   'Content-Type':'multipart/form-data'
      // }
    });
    const  user= await response.json();
    return user;
  };

  export const getProperties = async (id) => {
    const response = await fetch('/api/property/properties/'+id);
    const  properties= await response.json();
    return properties.properties;
  };

  export const propertyTypes = async () => {
    const response = await fetch('/api/property/types');

    const { types } = await response.json();
    return types
  };
  export const getTrendingAndBestCribs = async () => {
    const [trending_crib, best_crib] = await Promise.all([
      fetch('/api/property/trending_cribs'),
      fetch('/api/property/best_cribs')
    ]);
    const  [trending_cribs, best_cribs]= await Promise.all([
      trending_crib.json(),
      best_crib.json()
    ]);
    return {trending_cribs:trending_cribs.trending, best_cribs:best_cribs.best};
  };
  export const getCribById = async (id) => {
    const response = await fetch('/api/property/property/'+id);

    const { property } = await response.json();
    return property
  };
