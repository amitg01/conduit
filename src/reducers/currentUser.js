let initState = {
  user: {}
};

function userReducer(state = initState, action) {
  switch (action.type) {
    case "USER_LOGIN": {
      return { ...state, user: action.payload };
    }
    case "USER_REFRESH": {
      return { ...state, user: action.payload };
    }
    case "USER_LOGOUT": {
      localStorage.setItem("token", "");
      return { ...state, user: null };
    }
  }
}

export default userReducer;
