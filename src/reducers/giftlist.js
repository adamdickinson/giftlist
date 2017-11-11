const initialState = { list: [] }



export default (state=initialState, action) => {
  switch(action.type) {

    case "ADD_ITEM_TO_GIFTLIST":
      return { ...state, list: [...state.list, action.item] }


    case "REMOVE_ITEM_FROM_GIFTLIST":
      return { ...state, list: state.list.filter(item => item != action.item) }


    case "SET_GIFTLIST":
      return { ...action.giftlist }


    default:
      return state
  }
}
