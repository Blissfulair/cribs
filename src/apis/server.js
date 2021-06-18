
export const checkLoggedIn = async () => {
    const response = await fetch('/api/user/auth');
    const { user } = await response.json();

    if (user)
    return user;
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

  export const verifyEmail = async (token) => {
    const response = await fetch(`/user/verify?token=${token}`);
    const  user = await response.json();

    if (user)
    return user;
  };