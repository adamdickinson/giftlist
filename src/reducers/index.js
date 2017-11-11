import { combineReducers } from "redux"
import { routerReducer } from "preact-router-redux"



const reducers = {
  app:       require("./app").default,
  giftlist:  require("./giftlist").default,
  giftlists: require("./giftlists").default,
  images:    require("./images").default,
  item:      require("./item").default,
  routing:   routerReducer,
}



export default combineReducers(reducers)
