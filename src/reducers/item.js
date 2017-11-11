const initialState = ""



export default (state=initialState, action) => {
  switch(action.type) {

    case "RESET_ITEM":
      return initialState 


    case "UPDATE_ITEM":
      return action.item


    default:
      return state
       
  }
}
