const initialState = {
  isLoggedIn: false,
  jwtToken: null
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        isLoggedIn: true,
        jwtToken: action.payload
      };
    case 'LOGOUT':
      return {
        isLoggedIn: false,
        jwtToken: null
      };
    default:
      return state;
  }
};

export default authReducer;

  