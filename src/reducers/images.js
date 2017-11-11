const initialState = {}



export default (state=initialState, action) => {
  switch(action.type) {

    case "SET_IMAGE_FOR":
      return { ...state, [action.keywords]: action.image }


    case "REQUEST_IMAGE_FOR":
      return { ...state, [action.keywords]: "about:blank" }


    default:
      return state
       
  }
}
