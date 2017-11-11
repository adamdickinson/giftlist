const initialState = []



export default (state=initialState, action) => {
  let claims, index
  switch(action.type) {

    case "TOGGLE_CLAIM_ITEM_IN_GIFTLIST":
      return state.map(giftlist => {
        if( giftlist._id != action.giftlist._id )
          return giftlist

        // Claim made - unclaim
        claims = { ...giftlist.claims }
        if( giftlist.claims && giftlist.claims[action.item] == action.by.id )
          delete claims[action.item]

        // Claim not made - claim
        else
          claims[action.item] = action.by.id

        return { ...giftlist, claims }
      })


    case "SET_GIFTLISTS":
      return [...action.giftlists]


    default:
      return state
  }
}
