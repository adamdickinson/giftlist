const initialState = {}



export default (state=initialState, action) => {
  switch(action.type) {

    case "CLEAR_USER":
      state = {...state}
      delete state.user
      return state


    case "LOGIN_WITH_FACEBOOK":
      return { ...state, status: "LOGGING_IN" }


    case "SET_USER":
      return { ...state, user: action.user, status: "LOGGED_IN" }


    case "READY":
      return { ...state, ready: true }
        

    default:
      return state
       
  }
}
