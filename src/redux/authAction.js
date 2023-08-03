export const login = (jwtToken) => {
    return {
      type: 'LOGIN',
      payload: jwtToken
    };
  };
  
  export const logout = () => {
    return {
      type: 'LOGOUT'
    };
  };
  
